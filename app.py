import json
import os
import re
import base64    
import uuid
import shutil

from flask import Flask
from flask import abort, redirect, url_for
from flask import Flask, jsonify, request

import project as publish

def secure_filename(unsafe_filename):
    keepcharacters = (' ','.','_','/','-')
    underscore_characters = (' ','/')
    partial_safe_filename = "".join(c for c in unsafe_filename if c.isalnum() or c in keepcharacters).rstrip()

    for character in underscore_characters:
        partial_safe_filename = partial_safe_filename.replace(character, '_')

    safe_filename = partial_safe_filename
    return safe_filename


app = Flask(__name__, static_folder="website", static_url_path='/website')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Disable Caching


def createDir(path):
    isExist = os.path.exists(path)
    if not isExist:
       os.makedirs(path) 


@app.route("/")
def hello():
    return redirect("/website/index.html")

##################
# Library
##################

@app.route("/list_templates")
def list_templates():

    assets = {}
    # Open and parse the projet JSON file
    f = open(f'website/assets/website/templates.json')  
    data = json.load(f)
    
    return jsonify([0, "List successful", data])

@app.route("/open/template/<template_id>", methods=['READ'])
def open_library_template(template_id):
    with open(f'website/assets/website/templates.json') as f:
        data = json.load(f)

    return jsonify([0, "Template Opened Sucessfully", data[template_id]])


##################
# Project
##################

@app.route("/project/new")
def new_project():
    myuuid = str(uuid.uuid4())

    shutil.copytree("website/assets/skel/project", f"website/assets/projects/{myuuid}", dirs_exist_ok=False)

    # print('Your UUID is: ' + str(myuuid))
    data = [0, myuuid]
    return jsonify(data)

@app.route("/project/list")
def list_projects():

    project_list = {}

    # Loop over projects directory, get their name and append to list with their IDs
    for project_id in next(os.walk('website/assets/projects'))[1]:

        # Open and parse the projet JSON file
        with open(f'website/assets/projects/{project_id}/project.json') as f:
            data = json.load(f)
            project_list[project_id] = data["Name"]

    return jsonify(project_list)

@app.route("/project/<project_id>/rename", methods=['UPDATE'])
def rename_projects(project_id):

    # Open and parse the projet JSON file
    with open(f'website/assets/projects/{project_id}/project.json') as f:
        data = json.load(f)
    
    data["Name"] = request.json["Name"]

    data_str = json.dumps(data)

    with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
        f.write(data_str)

    return jsonify([0, 'Template renames successfully'])

@app.route("/project/<project_id>/open")
def open_project(project_id):
    f = open(f'website/assets/projects/{project_id}/project.json')  
    project = json.load(f)

    return jsonify(project)


@app.route("/project/<project_id>/publish")
def publish_project(project_id):
    f = open(f'website/assets/projects/{project_id}/project.json')  
    project = json.load(f)

    publish.process(project, project_id)
    return jsonify([0])

@app.route("/project/<project_id>/list_assets")
def list_assets_project(project_id):

    assets = {}
    assets["images"] = [file for file in os.listdir( f'website/assets/projects/{project_id}/images') if not file.startswith('.')]
    assets["documents"] = [file for file in os.listdir( f'website/assets/projects/{project_id}/documents') if not file.startswith('.')]
    assets['articles'] = {}
    assets['templates'] = {}

    # Open and parse the projet JSON file
    with open(f'website/assets/projects/{project_id}/project.json') as f:
        data = json.load(f)

    for page in data["Articles"]:
        assets['articles'][page] = data["Articles"][page]["Name"]

    for template in data["Templates"]:
        assets['templates'][template] = data["Templates"][template]["Name"]

    return jsonify(assets)
    
@app.route("/project/<project_id>/import_template/<template_id>")
def import_template_project(project_id, template_id):

    with open(f'website/assets/website/templates.json') as f:
        template_data = json.load(f)

    with open(f'website/assets/projects/{project_id}/project.json') as f:
        project_data = json.load(f)

    if not template_id in project_data["Templates"]:
        project_data["Templates"][template_id] = template_data[template_id]

    with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
        f.write(json.dumps(project_data))

    return jsonify([0, "Template imported successfully"])


###############
# Template
###############

@app.route("/project/<project_id>/new/template", methods=['CREATE'])
def new_template(project_id):
    if request.method == 'CREATE':
        f = open(f'website/assets/projects/{project_id}/project.json')  
        data = json.load(f)

        myuuid = str(uuid.uuid4())

        data['Templates'][myuuid] = {
            "Name": "Untitled Template",
            "View": {}
        }

        data_str = json.dumps(data)

        with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
            f.write(data_str)

        data = [0, "Template Created Successfully", myuuid]
        return jsonify(data)

    data = [1, "No data"]
    return jsonify(data)


@app.route("/project/<project_id>/save/template/<template_id>", methods=['UPDATE'])
def save_template(project_id, template_id):
    if request.method == 'UPDATE':
        f = open(f'website/assets/projects/{project_id}/project.json')  
        data = json.load(f)

        if not template_id in data["Templates"]:
            data["Templates"][template_id] = {}

        data["Templates"][template_id]['Name'] = request.json["Name"]
        data["Templates"][template_id]['View'] = request.json["View"]

        if request.json["Default"] == True:
            data["Template"] = template_id

        data_str = json.dumps(data)

        with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
            f.write(data_str)

        response = [0, "Templpate Saved Successfully"]
        return jsonify(response)

    response = [1, "No data"]
    return jsonify(response)


@app.route("/project/<project_id>/delete/template/<template_id>", methods=['DELETE'])
def delete_template(project_id, template_id):
    if request.method == 'DELETE':
        f = open(f'website/assets/projects/{project_id}/project.json')  
        data = json.load(f)

        del data["Templates"][template_id]

        data_str = json.dumps(data)

        with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
            f.write(data_str)

        response = [0, "Templpate Deleted Successfully"]
        return jsonify(response)

    response = [1, "No data"]
    return jsonify(response)
    

@app.route("/project/<project_id>/list/templates")
def list_project_templates(project_id):

    template_list = {}

    # Loop over templates directory, get their name and append to list with their IDs
    for template_id in next(os.walk(f'website/assets/projects/{project_id}/templates'))[1]:

        # Open and parse the projet JSON file
        with open(f'website/assets/projects/{project_id}/templates/{template_id}/template.json') as f:
            data = json.load(f)
            template_list[project_id] = data["Name"]

    return jsonify(template_list)


@app.route("/project/<project_id>/list_assets/template/<template_id>")
def list_assets_template(project_id, template_id):

    assets = {}
    assets["images"] = [file for file in os.listdir( f'website/assets/projects/{project_id}/templates/{template_id}/images') if not file.startswith('.')]
    assets["documents"] = [file for file in os.listdir( f'website/assets/projects/{project_id}/templates/{template_id}/documents') if not file.startswith('.')]

    return jsonify(assets)

@app.route("/project/<project_id>/open/template/<template_id>", methods=['READ'])
def open_template(project_id, template_id):
    if request.method == 'READ':
        f = open(f'website/assets/projects/{project_id}/project.json')  
        data = json.load(f)

        if data["Template"] == template_id:
            data["Templates"][template_id]["Default"] = True

        return jsonify([0, "Template Opened Sucessfully", data["Templates"][template_id]])


######################
# Article
######################

@app.route("/project/<project_id>/new/article", methods=['CREATE'])
def new_article(project_id):
    if request.method == 'CREATE':
        f = open(f'website/assets/projects/{project_id}/project.json')  
        data = json.load(f)

        myuuid = str(uuid.uuid4())

        data['Articles'][myuuid] = {
            "Name": "Untitled Article",
            "Data": {}
        }

        data_str = json.dumps(data)

        with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
            f.write(data_str)

        data = [0, "Article Created Successfully"]
        return jsonify(data)

    data = [1, "No data"]
    return jsonify(data)

@app.route("/project/<project_id>/delete/article/<article_id>", methods=['DELETE'])
def delete_article(project_id, article_id):
    if request.method == 'DELETE':
        f = open(f'website/assets/projects/{project_id}/project.json')  
        data = json.load(f)

        del data['Articles'][article_id]
        data_str = json.dumps(data)

        with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
            f.write(data_str)

        data = [0, "Sucessfully deleted Article with id: " + article_id]
        return jsonify(data)


@app.route("/project/<project_id>/view/article/<article_id>", methods=['READ'])
def load_article(project_id, article_id):
    if request.method == 'READ':
        f = open(f'website/assets/projects/{project_id}/project.json')  
        data = json.load(f)

        if 'Home_Article' in data and data['Home_Article'] == article_id:
            data['Articles'][article_id]["Home"] = True

        return jsonify(data['Articles'][article_id])

@app.route("/project/<project_id>/save/article/<article_id>", methods=['UPDATE'])
def save_article(project_id, article_id):
    if request.method == 'UPDATE':
        with open(f'website/assets/projects/{project_id}/project.json') as f:
            data = json.load(f)

        if request.json["Home"] == True:
            data["Home_Article"] = article_id
            del request.json["Home"]

        elif request.json["Home"] == False and "Home_Article" in data:
            del data["Home_Article"]

        data['Articles'][article_id] = request.json

        data_str = json.dumps(data)

        with open(f'website/assets/projects/{project_id}/project.json', 'w') as f:
            f.write(data_str)

        response = [0, "Article Saved Successfully"]
        return jsonify(response)

    response = [1, "No data"]
    return jsonify(response)

##############
# Image
##############

@app.route("/project/<project_id>/upload/image", methods=['CREATE'])
def upload_image(project_id):
    if request.method == 'CREATE':
        filename = secure_filename(request.json['fullName']).replace("/", "_")
        mimetype = request.json['mimeType']
        content = base64.b64decode(request.json['imageBase64'].split(",")[1])

        if 'image/' in mimetype:
            with open(f'website/assets/projects/{project_id}/images/{filename}', "wb") as binary_file:
                binary_file.write(content)

            data = [0, "Image Sucessfully Uploaded"]
            return jsonify(data)

        data = [1, "Not an image"]
        return jsonify(data)

    data = [2, "No data"]
    return jsonify(data)

@app.route("/project/<project_id>/delete/image", methods=['DELETE'])
def delete_image(project_id):
    if request.method == 'DELETE':
        filename = secure_filename(request.json['fullName'])
        project_id = secure_filename(request.json['project_id'])
        os.remove(f"website/assets/projects/{project_id}/images/{filename}")

        data = [0, "Deleted image successfully"]
        return jsonify(data)

    data = [2, "No data"]
    return jsonify(data)


#################
# Documents
#################

@app.route("/project/<project_id>/upload/document", methods=['CREATE'])
def upload_document(project_id):
    if request.method == 'CREATE':
        filename = secure_filename(request.json['fullName']).replace("/", "_")
        mimetype = request.json['mimeType']
        content = base64.b64decode(request.json['imageBase64'].split(",")[1])

        with open(f'website/assets/projects/{project_id}/documents/{filename}', "wb") as binary_file:
            binary_file.write(content)

        data = [0, "Image Sucessfully Uploaded"]
        return jsonify(data)

    data = [2, "No data"]
    return jsonify(data)

@app.route("/project/<project_id>/delete/document", methods=['DELETE'])
def delete_document(project_id):
    if request.method == 'DELETE':
        filename = secure_filename(request.json['fullName'])
        project_id = secure_filename(request.json['project_id'])
        os.remove(f"website/assets/projects/{project_id}/documents/{filename}")

        data = [0, "Deleted document successfully"]
        return jsonify(data)

    data = [2, "No data"]
    return jsonify(data)

@app.route("/project/<project_id>/rename/document/<old_filename>/<new_filename>", methods=['UPDATE'])
def rename_document(project_id, old_filename, new_filename):
    if request.method == 'UPDATE':
        project_id = secure_filename(project_id)
        old_filename = secure_filename(old_filename)
        new_filename = secure_filename(new_filename)

        os.rename(f"website/assets/projects/{project_id}/documents/{old_filename}",
                  f"website/assets/projects/{project_id}/documents/{new_filename}")


        data = [0, "Renamed document successfully", new_filename]
        return jsonify(data)

    data = [2, "No data"]
    return jsonify(data)

"""
@app.route("/init_project")
def init_project():
    project = request.args.get('project')

    if project:
        createDir(f'website/assets/{project}')
        createDir(f'website/assets/{project}/css')
        createDir(f'website/assets/{project}/js')
        createDir(f'website/assets/{project}/images')
        createDir(f'website/assets/{project}/videos')
        createDir(f'website/assets/{project}/documents')

        data = [0, "Success"]
        return jsonify(data)
    else:
        data = [1, "Project number not supplied"]
        return jsonify(data)

@app.route("/list_assets")
def list_assets():
    project = request.args.get('project')

    assets = {
        "css": [],
        "js": [],
        "images": [],
        "videos": [],
        "documents": []
    }

    # assets["css"] = os.listdir( f'website/assets/{project}/css')
    # assets["js"] = os.listdir( f'website/assets/{project}/js')
    assets["images"] = os.listdir( f'website/assets/{project}/images')
    # assets["videos"] = os.listdir( f'website/assets/{project}/videos')
    assets["documents"] = os.listdir( f'website/assets/{project}/documents')

    return jsonify(assets)

@app.route('/upload_asset', methods=['PUT'])
def upload_asset():
    if request.method == 'PUT':
        # check if the post request has the file part
        project_id = request.json['project_id']
        filename = secure_filename(request.json['name'])
        mimetype = request.json['type']
        content = base64.b64decode(request.json['content'].split(",")[1])

        if 'image/' in mimetype:
            with open(f'website/assets/{project_id}/images/{filename}', "wb") as binary_file:
                binary_file.write(content)

        # elif 'video/' in mimetype:
        #     with open(f'website/assets/{project_id}/videos/{filename}', "wb") as binary_file:
        #         binary_file.write(content)

        else:
            with open(f'website/assets/{project_id}/documents/{filename}', "wb") as binary_file:
                binary_file.write(content)

        data = [0, "Sucessfully Uploaded"]
        return jsonify(data)


@app.route("/export", methods=['POST'])
def export():

    createDir('build')

    project_id = request.json.get('project_id')
    p = json.loads(request.json.get('project'))

    project.process(p, project_id)

    data = [0, "Success"]
    return jsonify(data)
"""



if __name__ == "__main__":
    app.run()