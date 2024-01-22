import os
import shutil

import template
import page


def secure_filename(unsafe_filename):
    keepcharacters = (' ','.','_','/','-')
    underscore_characters = (' ','/')
    partial_safe_filename = "".join(c for c in unsafe_filename if c.isalnum() or c in keepcharacters).rstrip()

    for character in underscore_characters:
        partial_safe_filename = partial_safe_filename.replace(character, '_')

    safe_filename = partial_safe_filename
    return safe_filename

def createDir(path):
    isExist = os.path.exists(path)
    if not isExist:
       os.makedirs(path) 


def process(project, project_id):
    project_name = project["Name"]
    project_folder = secure_filename(project_name)

    createDir(f"out/{project_folder}/assets")

    shutil.copytree(f"website/assets/projects/{project_id}", f"out/{project_folder}/assets/", dirs_exist_ok=True)

    template_id = project["Template"]
    name = project['Templates'][template_id]['Name']
    view = project['Templates'][template_id]['View']

    body, main_level = template.To_html(project, name, view)

    # template.Write(project_name, project_folder, mithril)

    if 'Articles' in project:
        for article_id in project['Articles']:
            # print("Article id", article_id)
            name = project['Articles'][article_id]['Name']
            data = project['Articles'][article_id]['Data']
            # print("Article name, data", name, data)

            filename = secure_filename(name)

            article = page.To_html(name, data)

            if "Home_Article" in project and project["Home_Article"] == article_id:
                filename = "index"

            page.Write(project_name, project_folder, name, filename, body, article, main_level)

    # routes.process(project, project_id)
    # index.process(project, project_id)
    