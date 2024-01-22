import re
from pyeditorjs import EditorJsParser

def Dom2Mithril(Node):
    if not Node:
        return None

    attributes = []
    children = []

    for attr in Node["attributes"]:
        if attr == 'contenteditable':
            continue

        if attr == 'class':
            if 'ls_selected' in jsonNode['attributes'][attr]:
                jsonNode['attributes']['class'] = jsonNode['attributes']['class'].replace('ls_selected', '')
                jsonNode['attributes']['class'] = jsonNode['attributes']['class'].replace('  ', ' ')


        jsonNode['attributes'][attr] = re.sub(r"assets/[\d\-\w]+/(.*)", r"assets/\g<1>", jsonNode['attributes'][attr])
         # = jsonNode['attributes'][attr].replace('assets/\d')

        attributes.append(f"'{attr}': '{jsonNode['attributes'][attr]}'")

    attributes = "{"+",".join(attributes)+"}"

    # Recursively process child nodes
    if len(jsonNode["children"]) > 0:
        for childJson in jsonNode["children"]:
            if isinstance(childJson, str):
                children.append("`"+childJson.replace(r'"', r'\"')+"`");
            
            else:
                children.append(Json2Dom(childJson));


    children = "["+",".join(children)+"]"

    return f"m('{jsonNode['tag']}',{attributes},{children})"


def To_html(name, editor_js_data):

    parser = EditorJsParser(editor_js_data) # initialize the parser

    return parser.html(sanitize=True)

    # return parser.mithril(sanitize=True)

    # html = parser.html(sanitize=True) # `sanitize=True` requires `bleach` to be installed

    # # print("Page: ", jsonNode)
    # return jsonNode

    # if not jsonNode:
    #     return None

    # children = [];

    # # Recursively process child nodes
    # if len(jsonNode) > 0:
    #     for childJson in jsonNode:
    #         if isinstance(childJson, str):
    #             children.append(childJson);
    #         else:
    #             children.append(Json2Dom(childJson));

    # children = "["+",".join(children)+"]"

    # return f"var {name}={{view:function(){{return {children}}}}}"""

def Write(project_name, project_folder, name, filename, body, article, main_level):

    separator = "\t"* main_level

    article = article.split("\n")
    article = separator.join(article)
    
    html = "\n".join([body[0], article, body[1]])


    with open(f"out/{project_folder}/{filename}.html", "w") as f:

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
{html}
</html>""")


# def WritePage(project_name, Page_name, Template_name, default):

#     if default:
#         page_filename = "index"
#     else:
#         page_filename = Page_name.replace(" ", "_")

#     page_component_name = Page_name.replace(" ", "_")

#     template_component_name = Template_name.replace(" ", "_")
#     project_folder_name = project_name.replace(" ", "_")

#     with open(f"build/{project_folder_name}/{page_filename}.html", "w") as f:
#         f.write(f"""
# <!DOCTYPE html>
# <html lang="en">
#   <meta charset="UTF-8">
#   <title>{Page_name} | {project_name}</title>
#   <meta name="viewport" content="width=device-width, initial-scale=1">
#   <link rel="stylesheet" href="assets/css/tachyons.min.css">
#   <link rel="stylesheet" href="assets/css/colours.css"/>

#   <body>
#       <script src="assets/js/mithril.js"></script>
#       <script src="assets/components/{page_component_name}.js"></script>
#       <script src="assets/components/{template_component_name}.js"></script>
#       <script>
#         m.render(document.body, m(Template))
#       </script>
#   </body>
# </html>

#             """)

