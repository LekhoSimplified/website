var DOMEditor = {
	selected_element: null,
	read_only: false,
	insert_mode: 'child',

	Init: function() {
		template_iframe.contentWindow.document.body.addEventListener('click', function(e) {
			if (e.target.tagName == "A")
				e.preventDefault()

			DOMEditor.Select(e.target)
		})

		template_iframe.contentWindow.document.body.addEventListener("paste", (e) => {
			eg.preventDefault();
			const text = e.clipboardData.getData('text/plain');
			template_iframe.contentWindow.document.execCommand("insertHTML", false, text);
		});

		DOMEditor.Select_body()
	},

	Insert_Node: function(element) {
		if (DOMEditor.insert_mode === 'child')
			DOMEditor.selected_element.appendChild(element);
		else if (DOMEditor.insert_mode === 'insertBefore')
			DOMEditor.selected_element.parentNode.insertBefore(element, DOMEditor.selected_element);
		else if (DOMEditor.insert_mode === 'insertAfter')
			DOMEditor.selected_element.parentNode.insertBefore(element, DOMEditor.selected_element.nextSibling);
	},

	Add_class: function(c) {
		if (DOMEditor.read_only) return
		
		DOMEditor.selected_element.classList.add(c)
		property_class_list.value = DOMEditor.selected_element.className.replace( /(?:^|\s)selected_element(?!\S)/g , '' )

		Set_dirty_bit()
	},

	Remove_classes: function(cs) {
		if (DOMEditor.read_only) return
		
		for (var c of cs) {
			if (DOMEditor.selected_element.classList.contains(c)) {
				DOMEditor.selected_element.classList.remove(c)
			}
		}

		DOMEditor.selected_element.classList.add('selected_element')
		property_class_list.value = DOMEditor.selected_element.className.replace( /(?:^|\s)selected_element(?!\S)/g , '' )

		Set_dirty_bit()
	},

	Append_child: function(tag) {
		if (DOMEditor.read_only) return
		
		element = document.createElement(tag)
		DOMEditor.Insert_Node(element)
		Set_dirty_bit()
	},

	Append_child_with_properties: function(tag_info) {
		if (DOMEditor.read_only) return
		
		element = document.createElement(tag_info["tag"])

		if ("attributes" in tag_info) {
	    	for (const [attr, value] of Object.entries(tag_info["attributes"])) {
	  			element.setAttribute(attr, value)
	    	}
		}

		if ("text" in tag_info)
			element.innerText = tag_info["text"]

		DOMEditor.Insert_Node(element)
		Set_dirty_bit()
	},

	Set_text: function(value) {
		if (DOMEditor.read_only) return
		
		DOMEditor.selected_element.innerText = value;
		Set_dirty_bit()
	},

	Remove_selected: function() {
		if (DOMEditor.read_only) return
		
		if (DOMEditor.selected_element !== template_iframe.contentWindow.document.body) {
			DOMEditor.selected_element.remove()
			DOMEditor.selected_element = template_iframe.contentWindow.document.body
			DOMEditor.Select_body()
		}
		Set_dirty_bit()
	},

	Set_attribute: function(attr, value) {
		if (DOMEditor.read_only) return

		DOMEditor.selected_element.setAttribute(attr, value)
		Set_dirty_bit()
	},

	Select_body: function() {
		DOMEditor.Select(template_iframe.contentWindow.document.body)
	},

	Select(element) {
		if (DOMEditor.selected_element == element) {
			DOMEditor.selected_element = template_iframe.contentWindow.document.body
		}
		else {
			DOMEditor.selected_element = element;
		}

		property_class_list.value = DOMEditor.selected_element.className.replace( /(?:^|\s)selected_element(?!\S)/g , '' )

		// Remove selected class
		let selected_element_list = template_iframe.contentWindow.document.body.querySelectorAll('.selected_element')

		if (template_iframe.contentWindow.document.body.classList.contains('selected_element')) {
			template_iframe.contentWindow.document.body.classList.remove('selected_element')
		}

		for (const selected of selected_element_list) {
			selected.classList.remove('selected_element')
		}

		StyleEditor.setClasses(DOMEditor.selected_element.classList)
		DOMEditor.Set_Breadcrumbs(DOMEditor.selected_element)

		//Add selected class
		DOMEditor.selected_element.classList.add('selected_element')
	},

	Get_Parents: function(element) {
		if (element.tagName == 'BODY')
			return []

		var parents = [];
		while(element.parentNode && element.tagName != 'BODY') {
			parents.push(element);
			element = element.parentNode;
		}

		return parents.reverse();
	},

	Set_Breadcrumbs: function(element) {
		let parents = DOMEditor.Get_Parents(element)

		let body = m("a", {
							class: "link pointer",
							onclick: function() {
								DOMEditor.Select_body()
							}
						},
						'Body'
					)

		let list = parents.map(function(b) {
							return m("a", {
									class: "link pointer",
									onclick: function() {
										DOMEditor.Select(b)
									}
								},
								' > ' + b.dataset['element_name']
							)
						})
		m.mount(breadcrumb, {"view": function() {return [body].concat(list)}})
	},

	DOM2JSON: function(element) {
	  if (!element) return null;

	  const jsonNode = {
	    tag: element.tagName,
	    attributes: {},
	    children: [],
	  };

	  for (const attr of ['id', 'class', 'src', 'datetime', 'href', 'type', 'value', 'onclick', 'contenteditable', 'style']) {
	    if (element.hasAttribute(attr)) {
	      jsonNode.attributes[attr] = element.getAttribute(attr)
			if (!jsonNode.attributes[attr].trim()) {
				delete jsonNode.attributes[attr]
			}
	    }
	  }

	  for (const data_attr in element.dataset) {
	    jsonNode.attributes['data-'+data_attr] = element.dataset[data_attr]
	    	if (!jsonNode.attributes['data-'+data_attr].trim()) {
				delete jsonNode.attributes['data-'+data_attr]
			}
	  }

	  // Recursively process child nodes
	  for (const childNode of element.childNodes) {
	    if (childNode.nodeType === Node.TEXT_NODE) {
	    	if (childNode.nodeValue.trim()) {
	      		jsonNode.children.push(childNode.nodeValue);
	    	}
	    }
	    else if (childNode.nodeType === Node.ELEMENT_NODE) {
	      jsonNode.children.push(DOMEditor.DOM2JSON(childNode));
	    }
	  }

	  return jsonNode;
	},

	Body_to_JSON: function() {
	  element = template_iframe.contentWindow.document.body

	  const jsonNode = {
	    attributes: {},
	    children: [],
	  };

	  for (const attr of ['id', 'class', 'src', 'datetime', 'href', 'type', 'value', 'onclick', 'contenteditable', 'style']) {
	    if (element.hasAttribute(attr)) {
	      jsonNode.attributes[attr] = element.getAttribute(attr)
	    }
	  }

	  for (const data_attr in element.dataset) {
	    jsonNode.attributes['data-'+data_attr] = element.dataset[data_attr]
	  }

	  // Recursively process child nodes
	  for (const childNode of element.childNodes) {
	    if (childNode.nodeType === Node.TEXT_NODE) {
	      jsonNode.children.push(childNode.nodeValue);
	    }
	    else if (childNode.nodeType === Node.ELEMENT_NODE) {
	      jsonNode.children.push(DOMEditor.DOM2JSON(childNode));
	    }
	  }

	  return jsonNode;
	},

	Save: function() {
		let selected_element = DOMEditor.selected_element
		DOMEditor.Select_body()
		Reset_dirty_bit()
		let json = DOMEditor.Body_to_JSON()
		DOMEditor.Select(selected_element)

		return json
	},

	JSON2DOM(jsonNode) {
		if (!jsonNode) return null;

		let element = document.createElement(jsonNode.tag)

		for (const attr in jsonNode.attributes) {
			element.setAttribute(attr, jsonNode.attributes[attr])
		}

		// Recursively process child nodes
		if (jsonNode.children.length > 0)
			for (const childJson of jsonNode.children) {
				if (typeof(childJson) == 'string') {
					element.appendChild(document.createTextNode(childJson));
				}
				else {
					element.appendChild(DOMEditor.JSON2DOM(childJson));
				}
			}

		return element; // m(jsonNode.tag,jsonNode.attributes,jsonNode.children);
	},

	JSON_to_Body(jsonNode) {
		if (!jsonNode) return null;

		let element = template_iframe.contentWindow.document.body

		for (const attr in jsonNode.attributes) {
			element.setAttribute(attr, jsonNode.attributes[attr])
		}

		// Recursively process child nodes
		if ("children" in jsonNode && jsonNode.children.length > 0)
			for (const childJson of jsonNode.children) {
				if (typeof(childJson) == 'string') {
					element.appendChild(document.createTextNode(childJson));
				}
				else {
					element.appendChild(DOMEditor.JSON2DOM(childJson));
				}
			}
	},

	Load: function(jsonNode) {
		DOMEditor.JSON_to_Body(jsonNode)
		DOMEditor.Select_body()
	},

	Set_readonly: function() {
		DOMEditor.read_only = true

		template_iframe.contentWindow.document.querySelectorAll("span[contenteditable]").forEach(function(el){
          el.removeAttribute("contenteditable");
          el.dataset.contenteditable = true
        })
	},

	Reset_readonly: function() {
		DOMEditor.read_only = false

		template_iframe.contentWindow.document.querySelectorAll("span[data-contenteditable]").forEach(function(el){
          el.setAttribute("contenteditable", true);
          delete el.dataset.contenteditable
        })
	}

}

// export default DOMEditor