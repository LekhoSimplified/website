
function Insert_image_src(event, image_name) {
  event.preventDefault()
  if (event.stopPropagation) { 
    event.stopPropagation(); 
  } 
  else if(window.event) { 
    window.event.cancelBubble=true; 
  }

  if (DOMEditor.selected_element.tagName == "IMG") {
    DOMEditor.selected_element.setAttribute("src", `/website/assets/projects/${project_id}/images/${image_name}`)
  }
  else {
    alert("Please select an Image in template.")
  }
}

function Load_image(image_url) {

  const { TABS, TOOLS } = FilerobotImageEditor;

  const config = {
    source: `/website/assets/projects/${project_id}/images/${image_url}`,
    onSave: function (editedImageObject, designState) {
      fetch(`/project/${project_id}/upload/image`, {
        method: 'CREATE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedImageObject),
        cache: 'no-store'
      })
      .then(response => response.json())
      .then(data => {
        if (!data || data[0] !== 0) {
          alert("Unable to upload.")
          console.log(data[1])
        }

        list_assets()
      })
    },

    annotationsCommon: {
      fill: '#aabbcc',
    },
    Text: { text: 'Watermark Text ...' },
    Rotate: { angle: 90, componentType: 'slider' },
    translations: {
      profile: 'Profile',
      coverPhoto: 'Cover photo',
      facebook: 'Facebook',
      socialMedia: 'Social Media',
      fbProfileSize: '180x180px',
      fbCoverPhotoSize: '820x312px',
    },
    Crop: {
      presetsItems: [
      {
        titleKey: 'classicTv',
        descriptionKey: '4:3',
        ratio: 4 / 3,
        // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
      },
      {
        titleKey: 'cinemascope',
        descriptionKey: '21:9',
        ratio: 21 / 9,
        // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
      },
      ],
      // presetsFolders: [
      //   {
      //     titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
      //     // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
      //     groups: [
      //       {
      //         titleKey: 'facebook',
      //         items: [
      //           {
      //             titleKey: 'profile',
      //             width: 180,
      //             height: 180,
      //             descriptionKey: 'fbProfileSize',
      //           },
      //           {
      //             titleKey: 'coverPhoto',
      //             width: 820,
      //             height: 312,
      //             descriptionKey: 'fbCoverPhotoSize',
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    },
    tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK], // or ['Adjust', 'Annotate', 'Watermark']
    defaultTabId: TABS.ADJUS, // or 'Annotate'
    defaultToolId: TOOLS.TEXT, // or 'Text'
  };



  // Assuming we have a div with id="editor_container"
  filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector('#editor_container'),
  config,
  );

  filerobotImageEditor.render({
    onClose: (closingReason) => {
      console.log('Closing reason', closingReason);
      filerobotImageEditor.terminate();
    },
  });
}

function Delete_image(event, image_full_name) {
  if (event.stopPropagation) { 
    event.stopPropagation(); 
  } 
  else if(window.event) { 
    window.event.cancelBubble=true; 
  }
  if (confirm(`Are you sure you want to permanently delete image: '${image_full_name}'`)) {
    fetch(`/project/${project_id}/delete/image`, {
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

function Upload_image_file(file) {
  if (!project_id) {
    alert("Please open a project before uploading")
    return;
  }

  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    fetch(`/project/${project_id}/upload/image`, {
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

