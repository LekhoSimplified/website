import re

main_level = 0


def secure_filename(unsafe_filename):
    keepcharacters = (' ','.','_','/','-')
    underscore_characters = (' ','/')
    partial_safe_filename = "".join(c for c in unsafe_filename if c.isalnum() or c in keepcharacters).rstrip()

    for character in underscore_characters:
        partial_safe_filename = partial_safe_filename.replace(character, '_')

    safe_filename = partial_safe_filename
    return safe_filename


def Json2Dom(project, jsonNode, level=0):
    if not jsonNode:
        return None

    attributes = []
    children = []

    for attr in jsonNode["attributes"]:
        if attr in ['contenteditable', 'data-element_name']:
            continue

        if attr == 'class':
            if 'selected_element' in jsonNode['attributes'][attr]:
                c = jsonNode['attributes']['class'].replace('selected_element', '')
                c = c.replace('  ', ' ')
                c = c.strip()

                jsonNode['attributes']['class'] = c

        if attr == 'href':
            # print(jsonNode['attributes']['href'])
            if "article:" in jsonNode['attributes']['href']:
                article_id = jsonNode['attributes']['href'].split(":")[1]
                # print(project)

                if "Home_Article" in project and project["Home_Article"] == article_id:
                    article_filename = "index"
                else:
                    article_filename = secure_filename(project["Articles"][article_id]["Name"])

                jsonNode['attributes']['href'] = article_filename + ".html"
                # print(jsonNode['attributes']['href'])

            else:
                jsonNode['attributes']['href'] = re.sub(r"/website/assets/projects/[\d\-\w]+/(js|css|images|documents)/(.*)", r"assets/\g<1>/\g<2>", jsonNode['attributes'][attr])

        elif attr == "src":
            jsonNode['attributes']['src'] = re.sub(r"/website/assets/projects/[\d\-\w]+/(js|css|images|documents)/(.*)", r"assets/\g<1>/\g<2>", jsonNode['attributes'][attr])

        attr_value = jsonNode['attributes'][attr]
        print(attr, attr_value)
        if len(attr_value) > 0:
            attributes.append(f"{attr}='{attr_value}'")

    attributes = " ".join(attributes)
   
    if (len(attributes) > 0):
        attributes = " " + attributes

    # Recursively process child nodes
    if len(jsonNode["children"]) > 0:
        for childJson in jsonNode["children"]:
            if isinstance(childJson, str):
                childJson = childJson.strip()
                if len(childJson) > 0:
                    children.append(childJson);
            
            else:
                children.append(Json2Dom(project, childJson, level+1));

    if jsonNode["tag"] == "MAIN":
        children.append("vnode.children")
        main_level = level

    separator = "\n" + "\t"*(level+1)
    separator_endtag = "\n" + "\t"*(level)
    children = separator.join(children)




    tag = jsonNode['tag'].lower()
    if tag not in ["br", "img"]:
        return f"<{tag}{attributes}>{separator}{children}{separator_endtag}</{tag}>"
    else:
        return f"<{tag}{attributes}>"


def To_html(project, name, jsonNode):
    if not jsonNode:
        return None

    attributes = []
    children = [];

    for attr in jsonNode["attributes"]:
        if attr == 'contenteditable':
            continue

        if attr == 'class':
            if 'selected_element' in jsonNode['attributes'][attr]:
                c = jsonNode['attributes']['class'].replace('selected_element', '')
                c = c.replace('  ', ' ')
                c = c.strip()

                jsonNode['attributes']['class'] = c

            if 'show-empty' in jsonNode['attributes'][attr]:
                c = jsonNode['attributes']['class'].replace('show-empty', '')
                c = c.replace('  ', ' ')
                c = c.strip()

                jsonNode['attributes']['class'] = c

        if attr in ['data-element_name']:
            pass


        attr_value = re.sub(r"assets/[\d\-\w]+/(js|css|images|documents)/(.*)", r"assets/\g<1>/\g<2>", jsonNode['attributes'][attr])

        jsonNode['attributes'][attr] = attr_value
        
        if len(attr_value) > 0:
            attributes.append(f"{attr}='{attr_value}'")

    attributes = " ".join(attributes)


    # Recursively process child nodes
    if len(jsonNode) > 0:
        for childJson in jsonNode["children"]:
            if isinstance(childJson, str):
                childJson = childJson.strip()
                if len(childJson) > 0:
                    children.append(childJson);
            else:
                children.append(Json2Dom(project, childJson, 1));


    children = "\n\t".join(children) 

    # print(children.split('vnode.children'))

    if (len(attributes) > 0):
        attributes = " " + attributes

    body = f"""<body{attributes}>
    {children}
</body>"""

    return body.split('vnode.children'), main_level


def Write(project_name, project_folder, body):

    with open(f"out/{project_folder}/index.html", "w") as f:

        f.write(f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{project_name}</title>

    <link rel="stylesheet" href="assets/css/tachyons.min.css"/>
    <link rel="stylesheet" href="assets/css/colours.css"/>
    <link rel="stylesheet" href="assets/css/styles.css"/>
</head>
{body}
</html>"""
     )

