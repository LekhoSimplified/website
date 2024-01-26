class HTMLEditor {
	constructor(iframe) {
		this.iframe = iframe
		this.selected_element = null
		this.read_only = false
		this.insert_mode = 'child'

		self = this
		iframe.contentWindow.document.body.addEventListener('click', function(e) {
			if (e.target.tagName == "A")
				e.preventDefault()

			self.Select(e.target)
		})

		iframe.contentWindow.document.body.addEventListener("paste", (e) => {
			e.preventDefault();
			const text = e.clipboardData.getData('text/plain');
			iframe.contentWindow.document.execCommand("insertHTML", false, text);
		});

		this.Select_body()
	}

  	Insert_Node (element) {
		if (this.insert_mode === 'child')
			this.selected_element.appendChild(element);
		else if (this.insert_mode === 'insertBefore')
			this.selected_element.parentNode.insertBefore(element, this.selected_element);
		else if (this.insert_mode === 'insertAfter')
			this.selected_element.parentNode.insertBefore(element, this.selected_element.nextSibling);
	}

	Add_class (c) {
		if (this.read_only) return
		
		this.selected_element.classList.add(c)
		property_class_list.value = this.selected_element.className.replace( /(?:^|\s)selected_element(?!\S)/g , '' )

		Set_dirty_bit()
	}

	Remove_classes (cs) {
		if (this.read_only) return
		
		for (var c of cs) {
			if (this.selected_element.classList.contains(c)) {
				this.selected_element.classList.remove(c)
			}
		}

		this.selected_element.classList.add('selected_element')
		property_class_list.value = this.selected_element.className.replace( /(?:^|\s)selected_element(?!\S)/g , '' )

		Set_dirty_bit()
	}

	Append_child (tag) {
		if (this.read_only) return
		
		element = document.createElement(tag)
		this.Insert_Node(element)
		Set_dirty_bit()
	}

	Append_child_with_properties (tag_info) {
		if (this.read_only) return
		
		element = document.createElement(tag_info["tag"])

		if ("attributes" in tag_info) {
	    	for (const [attr, value] of Object.entries(tag_info["attributes"])) {
	  			element.setAttribute(attr, value)
	    	}
		}

		if ("text" in tag_info)
			element.innerText = tag_info["text"]

		this.Insert_Node(element)
		Set_dirty_bit()
	}

	Set_text (value) {
		if (this.read_only) return
		
		this.selected_element.innerText = value;
		Set_dirty_bit()
	}

	Remove_selected () {
		if (this.read_only) return
		
		if (this.selected_element !== this.iframe.contentWindow.document.body) {
			this.selected_element.remove()
			this.selected_element = this.iframe.contentWindow.document.body
			this.Select_body()
		}
		Set_dirty_bit()
	}

	Set_attribute (attr, value) {
		if (this.read_only) return

		this.selected_element.setAttribute(attr, value)
		Set_dirty_bit()
	}

	Select_body () {
		this.Select(this.iframe.contentWindow.document.body)
	}

	Select (element) {
		if (this.selected_element == element) {
			this.selected_element = this.iframe.contentWindow.document.body
		}
		else {
			this.selected_element = element;
		}

		property_class_list.value = this.selected_element.className.replace( /(?:^|\s)selected_element(?!\S)/g , '' )

		// Remove selected class
		let selected_element_list = this.iframe.contentWindow.document.body.querySelectorAll('.selected_element')

		if (this.iframe.contentWindow.document.body.classList.contains('selected_element')) {
			this.iframe.contentWindow.document.body.classList.remove('selected_element')
		}

		for (const selected of selected_element_list) {
			selected.classList.remove('selected_element')
		}

		StyleEditor.setClasses(this.selected_element.classList)
		this.Set_Breadcrumbs(this.selected_element)

		//Add selected class
		this.selected_element.classList.add('selected_element')
	}

	Get_Parents (element) {
		if (element.tagName == 'BODY')
			return []

		var parents = [];
		while(element.parentNode && element.tagName != 'BODY') {
			parents.push(element);
			element = element.parentNode;
		}

		return parents.reverse();
	}

	Set_Breadcrumbs (element) {
		let parents = this.Get_Parents(element)

		self = this
		let body = m("a", {
							class: "link pointer",
							onclick: function() {
								self.Select_body()
							}
						},
						'Body'
					)

		let list = parents.map(function(b) {
							return m("a", {
									class: "link pointer",
									onclick: function() {
										self.Select(b)
									}
								},
								' > ' + b.dataset['element_name']
							)
						})
		m.mount(breadcrumb, {"view": function() {return [body].concat(list)}})
	},

	DOM2JSON (element) {
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
	    	if (!jsonNode.attributes['data-'+attr].trim()) {
				delete jsonNode.attributes['data-'+attr]
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
	      jsonNode.children.push(this.DOM2JSON(childNode));
	    }
	  }

	  return jsonNode;
	},

	Body_to_JSON () {
	  element = this.iframe.contentWindow.document.body

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
	      jsonNode.children.push(this.DOM2JSON(childNode));
	    }
	  }

	  return jsonNode;
	},

	Save () {
		let selected_element = this.selected_element
		this.Select_body()
		Reset_dirty_bit()
		let json = this.Body_to_JSON()
		this.Select(selected_element)

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
					element.appendChild(this.JSON2DOM(childJson));
				}
			}

		return element; // m(jsonNode.tag,jsonNode.attributes,jsonNode.children);
	},

	JSON_to_Body(jsonNode) {
		if (!jsonNode) return null;

		let element = this.iframe.contentWindow.document.body

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
					element.appendChild(this.JSON2DOM(childJson));
				}
			}
	},

	Load (jsonNode) {
		this.JSON_to_Body(jsonNode)
		this.Select_body()
	}

	Set_readonly () {
		this.read_only = true

		this.iframe.contentWindow.document.querySelectorAll("span[contenteditable]").forEach (el){
          el.removeAttribute("contenteditable");
          el.dataset.contenteditable = true
        }
	}

	Reset_readonly () {
		this.read_only = false

		this.iframe.contentWindow.document.querySelectorAll("span[data-contenteditable]").forEach(function(el){
          el.setAttribute("contenteditable", true);
          delete el.dataset.contenteditable
        })
	}

}