
let Elements = {
	oncreate: function(vnode) {
		vnode.dom.addEventListener('click', function(e) {
			if (e.target.classList.contains('add_element')) {
				let tag = e.target.getAttribute('data-element');

				let tag_info = {
					"tag": tag,
					"attributes": {
						'data-element_name': e.target.innerText,
					}
				}

				if (tag == 'a') {
					tag_info['attributes']['href'] = "#"
				}

				let contenteditable = e.target.dataset['contenteditable']
				if (contenteditable) {
					tag_info['attributes']['contenteditable'] = true
					tag_info['text'] = e.target.innerText
				}

				let data_class = e.target.dataset['class']
				if (data_class) {
					element.className = data_class
					tag_info['attributes']['class'] = data_class
				}

				DOMEditor.Append_child_with_properties(tag_info)

			}
			else if (e.target.classList.contains('remove_element')) {
				DOMEditor.Remove_selected()
			}
		})
	},
	view: function() {
		return m('DETAILS', {
				"class": "pa1"
			},[
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Elements'
			]),
			m('DIV', {
					"class": 'bl bw2 ml1'
				},[
				m('DIV', {
						"class": 'mt2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'span',
							"data-contenteditable": "true"
						},[
							"Text"
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'a',
							"data-contenteditable": "true"
						},[
							"Link"
					])
				]),
				m('DIV', {
						"class": 'mt2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'div',
						},[
							"Division"
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'p',
							"data-contenteditable": "true"
						},[
							"Paragraph"
					])
				]),
				// m('DIV', {
				// 		"class": 'mt2'
				// 	},[
				// 	m('BUTTON', {
				// 			"class": 'add_element mh1',
				// 			"data-element": 'p',
				// 			"data-contenteditable": 'true'
				// 		},[
				// 			'Paragraph'
				// 	]),
					// m('BUTTON', {
					// 		"class": 'add_element mh1',
					// 		"data-element": 'article',
					// 		"data-contenteditable": 'true'
					// 	},[
					// 		'Article'
					// ])
				// ]),
				// m('DIV', {
				// 		"class": 'mt2'
				// 	},[
				// 	m('BUTTON', {
				// 			"class": 'add_element mh1',
				// 			"data-element": 'div'
				// 		},[
				// 			'Division'
				// 	])
				// ]),
				m('DIV', {
						"class": 'mt2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'header'
						},[
							'Header'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'footer'
						},[
							'Footer'
					])
				]),
				m('DIV', {
						"class": 'mt2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'nav'
						},[
							'Navigation'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'aside'
						},[
							'Aside'
					])
				]),
				m('DIV', {
						"class": 'mt2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'section'
						},[
							'Section'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'main'
						},[
							'Main'
					])
				]),
				m('DIV', {
						"class": 'mt2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'details'
						},[
							'Details'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'summary',
						},[
							'Summary'
					])
				]),
				m('DIV', {
						"class": 'mt2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'figure'
						},[
							'Figure'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'img',
						},[
							'Image'
					])
				]),
				m('DIV', {
						"class": 'mt2 pl2'
					},[
					m('LABEL', [
						"Insert Mode: ",

						m('SELECT', {
							onchange: function() {
								DOMEditor.insert_mode = this.value
							},
						},[
							m('OPTION', {
									"value": 'child',
								}, "Child"),
							m('OPTION', {
									"value": 'insertBefore',
								}, "Insert before"),
							m('OPTION', {
									"value": 'insertAfter',
								}, "Insert after")
						])
					])
				]),
				// m('DIV', {
				// 		"class": 'mt3'
				// 	},[
				// 	m('BUTTON', {
				// 			"class": 'add_element mh1',
				// 			"data-element": 'div',
				// 			"data-class": 'template-block',
				// 		},[
				// 			'Template Block'
				// 	])
				// ]),
				m('DIV', {
						"class": 'mt3 pb3'
					},[
					m('BUTTON', {
							"class": 'remove_element mh1'
						},[
							'REMOVE'
					])
				])
			])
		])
	}
}

