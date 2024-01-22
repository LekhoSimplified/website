template_id = null

function New_template() {
  if (! project_id) {
    alert("Please Open a Prpject")
    return
  }
  fetch(`/project/${project_id}/new/template`, {
        method: 'CREATE',
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

        template_id = data[2]

        Render_template(template_id)
        add_asset.open = false

        list_assets()
      })
}

function Save_template() {
      fetch(`/project/${project_id}/save/template/${template_id}`, {
        method: 'UPDATE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"Name": template_name.value, "Default": template_set_default.checked, "View": DOMEditor.Save()}),
        cache: 'no-store'
      })
      .then(response => response.json())
      .then(data => {

        if (!data || data[0] !== 0) {
          alert("Unable to upload.")
          console.log(data[1])
          return
        }

        list_assets()
        Reset_dirty_bit()
      })
  }


function Open_template(tid) {
  if (! project_id) {
    alert("Please Open a Project")
    return
  }

  template_id = tid
  Render_template(template_id)

}

function Render_template(template_id) {
  editor_container.innerHTML = `<div class="pa1 pl2 bg-near-white bb">
      <input
        id="template_name"
        type="text"
        class="w5"
        value="">

      <label>
        <input
        id="template_set_default"
        type="checkbox"
        /> Set Default Template </label>

      <button class="" onclick="Save_template('')">Save</button>

      <!-- <label>
        Design for:
        <select id="template_screen_size">
          <option value=''>All (Mobile first)</option>
          <option value='-ns'>Not Small</option>
          <option value='-m'>Medium</option>
          <option value='-l'>Large</option>
        </select>
      </label> -->


      <button class="fr bw0 mr2 pointer" onclick="Unload_article()">
        <svg width="12" height="12" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.3196 40.0403C44.2253 40.9461 44.2253 42.4146 43.3196 43.3204C42.4138 44.2262 40.9453 44.2262 40.0396 43.3204L21.9997 25.2802L3.95952 43.3207C3.05376 44.2264 1.58525 44.2264 0.679494 43.3207C-0.226258 42.4149 -0.226258 40.9464 0.679495 40.0406L18.7197 22.0001L0.679313 3.95941C-0.226437 3.05364 -0.226439 1.5851 0.679314 0.679328C1.58507 -0.226442 3.05358 -0.226443 3.95934 0.679328L21.9997 18.72L40.0398 0.679604C40.9455 -0.226163 42.414 -0.226165 43.3198 0.679605C44.2255 1.58537 44.2255 3.05392 43.3198 3.95969L25.2797 22.0001L43.3196 40.0403Z" fill="currentColor"></path></svg>  
      </button>
    </div>
    <iframe id="template_iframe" src="project.html" class="w-100 flex-auto overflow-auto" frameborder="0" onload="Load_template('${project_id}', '${template_id}')"></iframe>
    <div id="breadcrumb" class="pa1 pl2 bg-near-white bt">Body > </div>`


}

function Load_template(project_id, template_id) {
    DOMEditor.Init()
    DOMEditor.Reset_readonly()

    fetch(`/project/${project_id}/open/template/${template_id}`, {
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

        template_name.value = data[2]["Name"]
        if (data[2]['Default'] == true)
          template_set_default.checked = true;
      })
}

function Delete_template(event, project_id, template_name, template_id) {
  if (event.stopPropagation) { 
    event.stopPropagation(); 
  } 
  else if(window.event) { 
    window.event.cancelBubble=true; 
  }
  if (confirm(`Are you sure you want to permanently delete template: '${template_name}'`)) {

    fetch(`/project/${project_id}/delete/template/${template_id}`, {
        method: 'DELETE',
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

        list_assets()
      })
    }
}
