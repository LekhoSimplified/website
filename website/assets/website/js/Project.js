function List_projects(selected=null)
{
	$.getJSON( "/project/list", function( data ) {

    	var items = [`<option value=''>--</option>`];
    	$.each( data, function( project_id, project_name ) {
    		sel = ""
    		if (selected && project_id === selected){
    			sel = "selected"
    		}
		    items.push( `<option value='${project_id}' ${sel}>${project_name}</option>` );
		  });

    	project_list.innerHTML = items.join( "" )
	})
}

$( project_list ).on({
    // "ready": function (e) {
    //     $(this).attr("readonly",true);
    // },
    "focus": function (e) {
        $(this).data( { choice: $(this).val() } );
    },
    "change": function (e) {
    	let c = Close_project()
        if ( ! c ){
            $(this).val( $(this).data('choice') );
            return false;
        } else {
            Open_project($(this).val())
        }
    }
});

function Open_project(project) {

	project_id = null
	if (typeof project == 'object')  // Dropdown changed
		project_id = project.value
	else
		project_id = project

	if (project_id.length > 0)
		$.getJSON( `/project/${project_id}/open`, function( data ) {
			localStorage['project'] = JSON.stringify(data)
			project_name.value = data["Name"]
			project_name.disabled = false

			list_assets()

			asset_details.classList.remove("dn")
			project_details.classList.remove("dn")
		})
	else
		Close_project()
}

function Close_project() {
	let close = false

	if (Is_dirty()) {
		if (confirm("There may be unsaved changes, are you sure you want to close this project?"))
				close = true
	}
	else
		close = true

	if (close) {
		localStorage['project'] = ''
		project_id = null

		//Hide Assets list
		asset_details.classList.add("dn")

		//Hide Project Options
		project_details.classList.add("dn")

		editor_container.innerHTML = ``

		project_name.value = ''
		project_name.disabled = true
		Reset_dirty_bit()
	}

	return close
}

function New_project() {

	$.getJSON( "/project/new")
	.done(function(data) {
		let new_id = data[1]

		List_projects(new_id)
		Open_project(new_id)
	 })
	.fail(function() {
		alert("Failed to create a new project.")
	})
}

function Publish_project() {

	$.getJSON( `/project/${project_id}/publish`)
	.fail(function() {
		alert("Failed publish project.")
	})
}


function Export_templates() {

	$.getJSON( `/project/${project_id}/export_templates`)
	.fail(function() {
		alert("Failed export templates.")
	})
}


function Rename_project(new_name) {
	fetch(`/project/${project_id}/rename`, {
        method: 'UPDATE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"Name": new_name}) ,
        cache: 'no-store'
      })
      .then(response => response.json())
      .then(data => {
        if (!data || data[0] !== 0) {
          alert("Unable to upload.")
          console.log(data[1])
        }

        List_projects(project_id)
      })
}
