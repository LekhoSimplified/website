function Load_document(file_name) {
  editor_container.innerHTML = `<div class="pa1 pl2 bg-near-white">
      <input type="text" title="Press Tab to rename" class="w5" onblur="Rename_document(this)" data-old_filename='${file_name}' value="${file_name}">
      <button class="fr bw0 mr2 pointer" onclick="Unload_document()">
        <svg width="12" height="12" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.3196 40.0403C44.2253 40.9461 44.2253 42.4146 43.3196 43.3204C42.4138 44.2262 40.9453 44.2262 40.0396 43.3204L21.9997 25.2802L3.95952 43.3207C3.05376 44.2264 1.58525 44.2264 0.679494 43.3207C-0.226258 42.4149 -0.226258 40.9464 0.679495 40.0406L18.7197 22.0001L0.679313 3.95941C-0.226437 3.05364 -0.226439 1.5851 0.679314 0.679328C1.58507 -0.226442 3.05358 -0.226443 3.95934 0.679328L21.9997 18.72L40.0398 0.679604C40.9455 -0.226163 42.414 -0.226165 43.3198 0.679605C44.2255 1.58537 44.2255 3.05392 43.3198 3.95969L25.2797 22.0001L43.3196 40.0403Z" fill="currentColor"></path></svg>  
      </button>
    </div>
    <iframe src="/website/assets/projects/${project_id}/documents/${file_name}" class="w-100 h-100">
    </iframe>
    `
}

function Unload_document() {
  editor_container.innerHTML = ``
}

function Upload_document_file(file) {
  if (!project_id) {
    alert("Please open a project before uploading")
    return;
  }

  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    fetch(`/project/${project_id}/upload/document`, {
      method: 'CREATE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'fullName': file.name,
        'mimeType': file.type,
        'imageBase64': reader.result
      }),
      cache: 'no-store'
    }).then(response => response.json())
      .then(data => {
        if (!data || data[0] !== 0) {
          alert("Unable to upload.")
          console.log(data[1])
        }

        list_assets()
        add_asset.open=false
      })
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

function Rename_document(that) {
  old_filename = that.dataset['old_filename']
  new_filename = that.value

  fetch(`/project/${project_id}/rename/document/${old_filename}/${new_filename}`, {
      method: 'UPDATE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"project_id": project_id, "old_filename": old_filename, "new_filename": new_filename}),
      cache: 'no-store'
    })
    .then(response => response.json())
    .then(data => {
      if (!data || data[0] !== 0) {
        alert("Unable to rename.")
        console.log(data[1])
      }
      else {
        that.dataset['old_filename'] = data[2]
        that.value = data[2]
      }

      list_assets()
    })
}



function Delete_document(event, image_full_name) {
  event.preventDefault()
  if (event.stopPropagation) { 
      event.stopPropagation(); 
  } 
  else if(window.event) { 
      window.event.cancelBubble=true; 
  }
  if (confirm(`Are you sure you want to permanently delete document: '${image_full_name}'`)) {
    fetch(`/project/${project_id}/delete/document`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"project_id": project_id, "fullName": image_full_name}),
        cache: 'no-store'
      })
      .then(response => response.json())
      .then(data => {
        if (!data || data[0] !== 0) {
          alert("Unable to delete.")
          console.log(data[1])
        }

        list_assets()
      })
  }
}

