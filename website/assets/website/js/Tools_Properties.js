
let Properties = {
	oncreate: function(vnode) {
		vnode.dom.querySelectorAll('input').forEach(function(el) {

		 	el.addEventListener('blur', function(e) {
		 		// let prefix = el.dataset['prefix']
		 		let value = el.value
		 		let name = el.getAttribute('name')

		 		if (name == 'text') {
		 			DOMEditor.Set_text(value)
		 			return
		 		}

		 		// else if (prefix)
		 		// 	value = prefix + value

		 		DOMEditor.Set_attribute(name, value)
			})

		})
	},
	view: function() {
		return m('DETAILS', {
				"class": 'pa1'
			},[
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Properties'
			]),

			m('DIV', {
					"class": 'pl1 bl bw2 ml1'
				},[
				m('DIV', {
					},[
					m('DIV', {
							"class": 'dib w-40'
						},[
							'ID:'
					]),
					m('INPUT', {
							"class": 'w-50',
							"name": "id"
						}
					)
				]),

				m('DIV', {
					},[
					m('DIV', {
							"class": 'dib w-40'
						},[
							'HRef:'
					]),
					m('INPUT', {
							"class": 'w-50',
							"name": "href"
						}
					)
				]),

				m('DIV', {
					},[
					m('DIV', {
							"class": 'dib w-40'
						},[
							'Src:'
					]),
					m('INPUT', {
							"class": 'w-50',
							// "list": "images_list",
							// "data-prefix": `assets/${Projects.project_id}/images/`,
							"name": "src"
						}
					)
				]),

				m('DIV', {
					},[
					m('DIV', {
							"class": 'dib w-40'
						},[
							'Styles:'
					]),
					m('INPUT', {
							"id": "property_class_list",
							"class": 'w-50',
							// "list": "images_list",
							// "data-prefix": `assets/${Projects.project_id}/images/`,
							"name": "class"
						}
					)
				]),

				// m('DIV', {
				// 	},[
				// 	m('DIV', {
				// 			"class": 'dib w-40'
				// 		},[
				// 			'Text:'
				// 	]),
				// 	m('INPUT', {
				// 			"class": 'w-50',
				// 			"name": "text"
				// 		}
				// 	)
				// ])
			])
						
		])
	}
}

