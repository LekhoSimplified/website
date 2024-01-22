function List_library_template() {

  fetch(`/list_templates`)
      .then(response => response.json())
      .then(data => {
        if (!data || data[0] !== 0) {
          alert("Unable to list templates.")
          console.log(data[1])
          return
        }

        template_html = ``

        Object.keys(data[2]).forEach(function(template_id, template) {
          template_html += `<figure class='shadow-1 pa2 tc'>
            <figcaption>${data[2][template_id]["Name"]}</figcaption>
            <a href="#" onclick="Render_library_template('${template_id}')">
              <img class="ba" src='${data[2][template_id]["Thumbnail"]}'/>
            </a>
            <button onclick="Import_library_template('${template_id}')">Import</button>
          </figure>`

        });

        template_list.innerHTML = template_html;
      })
}

function Render_library_template(template_id) {
  editor_container.innerHTML = `
  <div class="pa1 pl2 bg-near-white bb">
    <span id="template_view_name"></span>

    <button class="fr bw0 mr2 pointer" onclick="Unload_library_template()">
      <svg width="12" height="12" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.3196 40.0403C44.2253 40.9461 44.2253 42.4146 43.3196 43.3204C42.4138 44.2262 40.9453 44.2262 40.0396 43.3204L21.9997 25.2802L3.95952 43.3207C3.05376 44.2264 1.58525 44.2264 0.679494 43.3207C-0.226258 42.4149 -0.226258 40.9464 0.679495 40.0406L18.7197 22.0001L0.679313 3.95941C-0.226437 3.05364 -0.226439 1.5851 0.679314 0.679328C1.58507 -0.226442 3.05358 -0.226443 3.95934 0.679328L21.9997 18.72L40.0398 0.679604C40.9455 -0.226163 42.414 -0.226165 43.3198 0.679605C44.2255 1.58537 44.2255 3.05392 43.3198 3.95969L25.2797 22.0001L43.3196 40.0403Z" fill="currentColor"></path></svg>  
    </button>
  </div>
  <iframe
    id="template_iframe"
    src="project.html"
    class="w-100 flex-auto overflow-auto" frameborder="0"
    onload="Load_library_template('${template_id}')">
  </iframe>
  <div id="breadcrumb" class="pa1 pl2 bg-near-white bt">Body > </div>`
}

function Load_library_template(template_id) {
    DOMEditor.Init()

    fetch(`/open/template/${template_id}`, {
        method: 'READ',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
      .then(response => response.json())
      .then(data => {
        if (!data || data[0] !== 0) {
          alert("Unable to upload.")
          console.log(data[1])
          return
        }

        DOMEditor.Load(data[2]["View"])
        DOMEditor.Set_readonly()
        template_view_name.innerText = data[2]["Name"]
      })
}

function Unload_library_template() {
  editor_container.innerHTML = ''; 
}

function Import_library_template(template_id) {
    if (project_id == null) {
      alert("Please open a project to import this template.")
      return
    }

    fetch(`/project/${project_id}/import_template/${template_id}`, {
      method: 'GET',
      cache: 'no-store'
    }).then(function() {
      list_assets()
    })
}