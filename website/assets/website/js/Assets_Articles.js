editor = null

function New_article() {
	fetch(`/project/${project_id}/new/article`, {
	  method: 'CREATE',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  cache: 'no-store'
	}).then(response => response.json())
	  .then(data => {
		if (!data || data[0] !== 0) {
		  alert("Unable to create article.")
		  console.log(data[1])
		}

		list_assets()
		add_asset.open = false
	  })
}

function Delete_article(event, article_name, article_id) {
	event.preventDefault()
	if (event.stopPropagation) { 
	  event.stopPropagation(); 
	} 
	else if(window.event) { 
	  window.event.cancelBubble=true; 
	}

    if (confirm(`Are you sure you want to permanently delete article: '${article_name}'`)) {

		fetch(`/project/${project_id}/delete/article/${article_id}`, {
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  cache: 'no-store'
		}).then(response => response.json())
		  .then(data => {
			if (!data || data[0] !== 0) {
			  alert("Unable to create article.")
			  console.log(data[1])
			}

			list_assets()
			add_asset.open = false
		  })
	}
}


function Load_article(article_id) {

	fetch(`/project/${project_id}/view/article/${article_id}`, {
	  method: 'READ',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  cache: 'no-store'
	}).then(response => response.json())
	  .then(data => {
		if (!data) {
		  alert("Unable to create article.")
		  console.log(data)
		  return
		}

		Render_article(article_id, data)
	  })
}

function Insert_article_link(event, article_name, article_id) {
  event.preventDefault()
  if (event.stopPropagation) { 
    event.stopPropagation(); 
  } 
  else if(window.event) { 
    window.event.cancelBubble=true; 
  }

  if (DOMEditor.selected_element.tagName == "A") {
    DOMEditor.selected_element.setAttribute("href", `article:${article_id}`)
  }
  else {
    alert("Please select a Link in template.")
  }
}

function Render_article(article_id, data) {
  editor_container.innerHTML = `<div class="pa1 pl2 bg-near-white bb">
      <input
        id="article_name"
      	type="text"
      	class="w5"
      	data-article-id='${data["Name"]}'
      	value="${data["Name"]}">

      <label>
        <input
        id="article_set_home"
        type="checkbox"
        ${data['Home'] == true ? "checked" : ""}
        /> Set Home Page </label>

      <button class="ml2" onclick="Save_article('${article_id}')">Save</button>

      <button class="fr bw0 mr2 pointer" onclick="Unload_article()">
        <svg width="12" height="12" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.3196 40.0403C44.2253 40.9461 44.2253 42.4146 43.3196 43.3204C42.4138 44.2262 40.9453 44.2262 40.0396 43.3204L21.9997 25.2802L3.95952 43.3207C3.05376 44.2264 1.58525 44.2264 0.679494 43.3207C-0.226258 42.4149 -0.226258 40.9464 0.679495 40.0406L18.7197 22.0001L0.679313 3.95941C-0.226437 3.05364 -0.226439 1.5851 0.679314 0.679328C1.58507 -0.226442 3.05358 -0.226443 3.95934 0.679328L21.9997 18.72L40.0398 0.679604C40.9455 -0.226163 42.414 -0.226165 43.3198 0.679605C44.2255 1.58537 44.2255 3.05392 43.3198 3.95969L25.2797 22.0001L43.3196 40.0403Z" fill="currentColor"></path></svg>  
      </button>
    </div>
    <div id="article-container" class="overflow-auto"></div>`

    editor = new EditorJS({
      /**
       * Enable/Disable the read only mode
       */
      readOnly: false,
	  autofocus: true,
      /**
       * Wrapper of Editor
       */
      holder: 'article-container',

      /**
       * Common Inline Toolbar settings
       * - if true (or not specified), the order from 'tool' property will be used
       * - if an array of tool names, this order will be used
       */
      // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
      // inlineToolbar: true,

      /**
       * Tools list
       */
      tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
          class: Header,
          inlineToolbar: ['marker', 'link'],
          config: {
            placeholder: 'Header'
          },
          shortcut: 'CMD+SHIFT+H'
        },

        /**
         * Or pass class directly without any configuration
         */
        image: SimpleImage,

        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L'
        },

        // checklist: {
        //   class: Checklist,
        //   inlineToolbar: true,
        // },

        // quote: {
        //   class: Quote,
        //   inlineToolbar: true,
        //   config: {
        //     quotePlaceholder: 'Enter a quote',
        //     captionPlaceholder: 'Quote\'s author',
        //   },
        //   shortcut: 'CMD+SHIFT+O'
        // },

        // warning: Warning,

        marker: {
          class:  Marker,
          shortcut: 'CMD+SHIFT+M'
        },

        // code: {
        //   class:  CodeTool,
        //   shortcut: 'CMD+SHIFT+C'
        // },

        // delimiter: Delimiter,

        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
        },

        // linkTool: LinkTool,

        // embed: Embed,

        // table: {
        //   class: Table,
        //   inlineToolbar: true,
        //   shortcut: 'CMD+ALT+T'
        // },

      },

      /**
       * This Tool will be used as default
       */
      // defaultBlock: 'paragraph',

      /**
       * Initial Editor data
       */
      data: data["Data"],
      onReady: function(){
        // saveButton.click();
      },
      onChange: function(api, event) {
        Set_dirty_bit()
        // console.log('something changed', event);
      }
    });
}

function Save_article(article_id) {
	editor.save()
    .then((savedData) => {
    	fetch(`/project/${project_id}/save/article/${article_id}`, {
	      method: 'UPDATE',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        'Name': article_name.value,
	        'Data': savedData,
          'Home': article_set_home.checked
	      }),
	      cache: 'no-store'
	    })
	    .then(response => response.json())
	     .then(data => {
	        if (!data || data[0] !== 0) {
	          alert("Unable to save.")
	          console.log(data[1])
            return
	        }

          Reset_dirty_bit()
          list_assets()

	      })
	    })
	    .catch((error) => {
	      alertr('Saving error');
	      console.error(error)
	    });
}

function Unload_article() {
  if (Is_dirty) {
    if (confirm("Changes made may not be saved, are you sure you want to close this article?")) {
      editor_container.innerHTML = ''; 
    }
  }
}