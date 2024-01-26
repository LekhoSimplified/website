
// Flex order, margin, padding -> Default

let StyleEditor = {
	dom: null,

	oncreate: function(vnode) {
		StyleEditor.dom = vnode.dom

		let checkboxes = vnode.dom.querySelectorAll('input.toggle')
		for (let i = 0; i < checkboxes.length; ++i) {
			checkboxes[i].addEventListener('click', function(e) {
				if (e.target.checked) {
					DOMEditor.Add_class(e.target.value)	
				}
				else {
					DOMEditor.Remove_classes([e.target.value])
				}
			})
		}

		// let inputs = vnode.dom.querySelectorAll('input.style')
		// for (let i = 0; i < inputs.length; ++i) {
		// 	inputs[i].addEventListener('blur', function(e) {
		// 		DOMEditor.setStyle(e.target.name, )
		// 		if (e.target.checked) {
		// 			DOMEditor.addClass(e.target.value)	
		// 		}
		// 		else {
		// 			DOMEditor.removeClasses([e.target.value])
		// 		}
		// 	})
		// }

		let selectors = vnode.dom.querySelectorAll('select')
		for (let i = 0; i < selectors.length; ++i) {
			selectors[i].addEventListener('change', function(e) {
				let all_classes = []
				for (let j = 0; j<e.target.options.length; j++) {	
					all_classes.push(e.target.options[j].value)
				}
				DOMEditor.Remove_classes(all_classes)
				DOMEditor.Add_class(e.target.value)
			})
		}
	},

	setClasses: function(styles) {

		let inputs = StyleEditor.dom.querySelectorAll(`input[type=checkbox]`)
		for (let i=0; i<inputs.length; i++) {
			inputs[i].checked=false
		}

		let selects = StyleEditor.dom.querySelectorAll(`select`)
		for (let i=0; i<inputs.length; i++) {
			selects[i].value = ''
		}

		for (let i=0; i<styles.length; i++) {
			let elem = StyleEditor.dom.querySelector(`input[value=${styles[i]}]`)
			if (elem)
				elem.checked = true
			else {
				let elem = StyleEditor.dom.querySelector(`option[value=${styles[i]}]`)
				if (elem)
					elem.parentNode.value = styles[i];
			}
		}
	},

	view: function() {
		return m('DETAILS', {
			},[
			m('SUMMARY', {
					"class": 'pointer pa1'
				},[
					'Style Editor'
			]),
			m('DIV', {
					"class": 'pl1 bl bw2 ml1'
				},[	
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer pa1'
						},[
							'Typography'
					]),
					m('DIV', {
							"class": 'pl1 bl bw2 ml1'
						},[
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Font Family:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'system-sans-serif'
									},[
										'System sans serif'
								]),
								m('OPTION', {
										"value": 'system-serif'
									},[
										'System serif'
								]),
								m('OPTION', {
										"value": 'sans-serif'
									},[
										'Sans serif'
								]),
								m('OPTION', {
										"value": 'serif'
									},[
										'Serif'
								]),
								m('OPTION', {
										"value": 'code'
									},[
										'Code'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Font Style: '
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'i'
									},[
										'Italic'
								]),
								m('OPTION', {
										"value": 'fs-normal'
									},[
										'Normal'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Font Size: '
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'f-headline'
									},[
										'Headline'
								]),
								m('OPTION', {
										"value": 'f-subheadline'
									},[
										'Sub Headline'
								]),
								m('OPTION', {
										"value": 'f1'
									},[
										'Scale 1'
								]),
								m('OPTION', {
										"value": 'f2'
									},[
										'Scale 2'
								]),
								m('OPTION', {
										"value": 'f3'
									},[
										'Scale 3'
								]),
								m('OPTION', {
										"value": 'f4'
									},[
										'Scale 4'
								]),
								m('OPTION', {
										"value": 'f5'
									},[
										'Scale 5'
								]),
								m('OPTION', {
										"value": 'f6'
									},[
										'Scale 6'
								]),
								m('OPTION', {
										"value": 'f7'
									},[
										'Scale 7'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Font Weight: '
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'normal'
									},[
										'Normal'
								]),
								m('OPTION', {
										"value": 'b'
									},[
										'Bold'
								]),
								m('OPTION', {
										"value": 'fw1'
									},[
										'Scale 1'
								]),
								m('OPTION', {
										"value": 'fw2'
									},[
										'Scale 2'
								]),
								m('OPTION', {
										"value": 'fw3'
									},[
										'Scale 3'
								]),
								m('OPTION', {
										"value": 'fw4'
									},[
										'Scale 4'
								]),
								m('OPTION', {
										"value": 'fw5'
									},[
										'Scale 5'
								]),
								m('OPTION', {
										"value": 'fw6'
									},[
										'Scale 6'
								]),
								m('OPTION', {
										"value": 'fw7'
									},[
										'Scale 7'
								]),
								m('OPTION', {
										"value": 'fw8'
									},[
										'Scale 8'
								]),
								m('OPTION', {
										"value": 'fw9'
									},[
										'Scale 9'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Alignment: '
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'tl'
									},[
										'Left'
								]),
								m('OPTION', {
										"value": 'tr'
									},[
										'Right'
								]),
								m('OPTION', {
										"value": 'tc'
									},[
										'Centre'
								]),
								m('OPTION', {
										"value": 'tj'
									},[
										'Justified'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'H-Spacing:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'tracked'
									},[
										'Normal'
								]),
								m('OPTION', {
										"value": 'Tracked-tight'
									},[
										'Tight'
								]),
								m('OPTION', {
										"value": 'tracked-mega'
									},[
										'Mega'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'V-Spacing:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'lh-solid'
									},[
										'Solid'
								]),
								m('OPTION', {
										"value": 'lh-title'
									},[
										'Title'
								]),
								m('OPTION', {
										"value": 'lh-copy'
									},[
										'Copy'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Max Width:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'measure'
									},[
										'Normal (~66 Chars)'
								]),
								m('OPTION', {
										"value": 'measure-wide'
									},[
										'Wide (~80 Chars)'
								]),
								m('OPTION', {
										"value": 'measure-narrow'
									},[
										'Narrow (~45 Chars)'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Decoration:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'strike'
									},[
										'Strike'
								]),
								m('OPTION', {
										"value": 'underline'
									},[
										'Underline'
								]),
								m('OPTION', {
										"value": 'no-underline'
									},[
										'No-underline'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Transform:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'small-caps'
									},[
										'Small-caps'
								]),
								m('OPTION', {
										"value": 'ttc'
									},[
										'Capitalize'
								]),
								m('OPTION', {
										"value": 'ttu'
									},[
										'Uppercase'
								]),
								m('OPTION', {
										"value": 'ttl'
									},[
										'Lowercase'
								]),
								m('OPTION', {
										"value": 'tn'
									},[
										'None'
								])
							])
						])
					])
				]),
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer pa1'
						},[
							'Layout'
					]),
					m('DIV', {
							"class": 'pl1 bl bw2 ml1'
						},[
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Display:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'dn'
									},[
										'None'
								]),
								m('OPTION', {
										"value": 'di'
									},[
										'Inline'
								]),
								m('OPTION', {
										"value": 'db'
									},[
										'Block'
								]),
								m('OPTION', {
										"value": 'dib'
									},[
										'Inline-Block'
								]),
								// m('OPTION', {
								// 		"value": 'dt'
								// 	},[
								// 		'Table'
								// ]),
								// m('OPTION', {
								// 		"value": 'dit'
								// 	},[
								// 		'Inline-table'
								// ]),
								// m('OPTION', {
								// 		"value": 'dtc'
								// 	},[
								// 		'Table cell'
								// ]),
								// m('OPTION', {
								// 		"value": 'dt-row'
								// 	},[
								// 		'Table row'
								// ]),
								// m('OPTION', {
								// 		"value": 'dt-row-group'
								// 	},[
								// 		'Table Row Group'
								// ]),
								// m('OPTION', {
								// 		"value": 'dt-column'
								// 	},[
								// 		'Table Column'
								// ]),
								// m('OPTION', {
								// 		"value": 'dt-column-group'
								// 	},[
								// 		'Table Column Group'
								// ])
							])
						]),	
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Height:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'h1'
									},[
										'Scale 1'
								]),
								m('OPTION', {
										"value": 'h2'
									},[
										'Scale 2'
								]),
								m('OPTION', {
										"value": 'h3'
									},[
										'Scale 3'
								]),
								m('OPTION', {
										"value": 'h4'
									},[
										'Scale 4'
								]),
								m('OPTION', {
										"value": 'h5'
									},[
										'Scale 5'
								]),
								m('OPTION', {
										"value": 'h-25'
									},[
										'25%'
								]),
								m('OPTION', {
										"value": 'h-50'
									},[
										'50%'
								]),
								m('OPTION', {
										"value": 'h-75'
									},[
										'75%'
								]),
								m('OPTION', {
										"value": 'h-100'
									},[
										'100%'
								]),
								m('OPTION', {
										"value": 'vh-25'
									},[
										'25% VH'
								]),
								m('OPTION', {
										"value": 'vh-50'
									},[
										'50% VH'
								]),
								m('OPTION', {
										"value": 'vh-75'
									},[
										'75% VH'
								]),
								m('OPTION', {
										"value": 'vh-100'
									},[
										'100% VH'
								]),
								m('OPTION', {
										"value": 'h-auto'
									},[
										'Auto'
								]),
								m('OPTION', {
										"value": 'h-inherit'
									},[
										'Inherit'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Min-Height:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'min-h-100'
									},[
										'100%'
								]),
								m('OPTION', {
										"value": 'min-vh-100'
									},[
										'100% VH'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Width:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'w1'
									},[
										'Scale 1'
								]),
								m('OPTION', {
										"value": 'w2'
									},[
										'Scale 2'
								]),
								m('OPTION', {
										"value": 'w3'
									},[
										'Scale 3'
								]),
								m('OPTION', {
										"value": 'w4'
									},[
										'Scale 4'
								]),
								m('OPTION', {
										"value": 'w5'
									},[
										'Scale 5'
								]),
								m('OPTION', {
										"value": 'w-10'
									},[
										'10%'
								]),
								m('OPTION', {
										"value": 'w-20'
									},[
										'20%'
								]),
								m('OPTION', {
										"value": 'w-25'
									},[
										'25%'
								]),
								m('OPTION', {
										"value": 'w-30'
									},[
										'30%'
								]),
								m('OPTION', {
										"value": 'w-33'
									},[
										'33%'
								]),
								m('OPTION', {
										"value": 'w-34'
									},[
										'34%'
								]),
								m('OPTION', {
										"value": 'w-40'
									},[
										'40%'
								]),
								m('OPTION', {
										"value": 'w-50'
									},[
										'50%'
								]),
								m('OPTION', {
										"value": 'w-60'
									},[
										'60%'
								]),
								m('OPTION', {
										"value": 'w-70'
									},[
										'70%'
								]),
								m('OPTION', {
										"value": 'w-75'
									},[
										'75%'
								]),
								m('OPTION', {
										"value": 'w-80'
									},[
										'80%'
								]),
								m('OPTION', {
										"value": 'w-90'
									},[
										'90%'
								]),
								m('OPTION', {
										"value": 'w-100'
									},[
										'100%'
								]),
								m('OPTION', {
										"value": 'w-third'
									},[
										'1/3'
								]),
								m('OPTION', {
										"value": 'w-two-thirds'
									},[
										'2/3'
								]),
								m('OPTION', {
										"value": 'w-auto'
									},[
										'Auto'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Max-width:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'mw-none'
									},[
										'None'
								]),
								m('OPTION', {
										"value": 'mw-100'
									},[
										'100%'
								]),
								m('OPTION', {
										"value": 'mw1'
									},[
										'Scale 1'
								]),
								m('OPTION', {
										"value": 'mw2'
									},[
										'Scale 2'
								]),
								m('OPTION', {
										"value": 'mw3'
									},[
										'Scale 3'
								]),
								m('OPTION', {
										"value": 'mw4'
									},[
										'Scale 4'
								]),
								m('OPTION', {
										"value": 'mw5'
									},[
										'Scale 5'
								]),
								m('OPTION', {
										"value": 'mw6'
									},[
										'Scale 6'
								]),
								m('OPTION', {
										"value": 'mw7'
									},[
										'Scale 7'
								]),
								m('OPTION', {
										"value": 'mw8'
									},[
										'Scale 8'
								]),
								m('OPTION', {
										"value": 'mw9'
									},[
										'Scale 9'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Rotate:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'rotate-45'
									},[
										'45°'
								]),
								m('OPTION', {
										"value": 'rotate-90'
									},[
										'90°'
								]),
								m('OPTION', {
										"value": 'rotate-135'
									},[
										'135°'
								]),
								m('OPTION', {
										"value": 'rotate-180'
									},[
										'180°'
								]),
								m('OPTION', {
										"value": 'rotate-225'
									},[
										'225°'
								]),
								m('OPTION', {
										"value": 'rotate-270'
									},[
										'270°'
								]),
								m('OPTION', {
										"value": 'rotate-315'
									},[
										'315°'
								])
							])
						]),	
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'V-Align:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'v-basee'
									},[
										'Base'
								]),
								m('OPTION', {
										"value": 'v-min'
									},[
										'Mid'
								]),
								m('OPTION', {
										"value": 'v-top'
									},[
										'Top'
								]),
								m('OPTION', {
										"value": 'v-btm'
									},[
										'Bottom'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Z-index:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'z-0'
									},[
										'Z-0'
								]),
								m('OPTION', {
										"value": 'z-1'
									},[
										'Z-1'
								]),
								m('OPTION', {
										"value": 'z-2'
									},[
										'Z-2'
								]),
								m('OPTION', {
										"value": 'z-3'
									},[
										'Z-3'
								]),
								m('OPTION', {
										"value": 'z-4'
									},[
										'Z-4'
								]),
								m('OPTION', {
										"value": 'z-5'
									},[
										'Z-5'
								]),
								m('OPTION', {
										"value": 'z-999'
									},[
										'Z-999'
								]),
								m('OPTION', {
										"value": 'z-9999'
									},[
										'Z-9999'
								]),
								m('OPTION', {
										"value": 'z-max'
									},[
										'Z-max'
								]),
								m('OPTION', {
										"value": 'z-inherit'
									},[
										'Z-inherit'
								]),
								m('OPTION', {
										"value": 'z-initial'
									},[
										'Z-initial'
								]),
								m('OPTION', {
										"value": 'z-Default'
									},[
										'Z-Default'
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Flex'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'flex'
										},[

									]),
										' Enable'
								]),
								m('DIV', {
									},[
									m('DETAILS', {
										},[
										m('SUMMARY', {
												"class": 'pointer pa1'
											},[
												'Type'
										]),
										m('DIV', {
												"class": 'pl1 bl bw2 ml1'
											},[
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-inline'
													},[

												]),
													' Inline Flex'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-none'
													},[

												]),
													' No Flex'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-column'
													},[

												]),
													' Flex-column'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-column-reverse'
													},[

												]),
													' Flex-column-reverse'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-row'
													},[

												]),
													' Flex-row'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-row-reverse'
													},[

												]),
													' Flex-row-reverse'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-wrap'
													},[

												]),
													' Flex-wrap'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-nowrap'
													},[

												]),
													' Flex-nowrap'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-wrap-reverse'
													},[

												]),
													' Flex-wrap-reverse'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'flex-auto'
													},[

												]),
													' Flex-auto'
											])
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Items:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'items-start'
											},[
												'Start'
										]),
										m('OPTION', {
												"value": 'items-end'
											},[
												'End'
										]),
										m('OPTION', {
												"value": 'items-center'
											},[
												'Center'
										]),
										m('OPTION', {
												"value": 'items-baseline'
											},[
												'Baseline'
										]),
										m('OPTION', {
												"value": 'Items-stretch'
											},[
												'Stretch'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Self:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'self-start'
											},[
												'Start'
										]),
										m('OPTION', {
												"value": 'self-end'
											},[
												'End'
										]),
										m('OPTION', {
												"value": 'self-center'
											},[
												'Center'
										]),
										m('OPTION', {
												"value": 'self-baseline'
											},[
												'Baseline'
										]),
										m('OPTION', {
												"value": 'self-stretch'
											},[
												'Stretch'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Justify:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'justify-start'
											},[
												'Start'
										]),
										m('OPTION', {
												"value": 'justify-end'
											},[
												'End'
										]),
										m('OPTION', {
												"value": 'justify-center'
											},[
												'Center'
										]),
										m('OPTION', {
												"value": 'justify-between'
											},[
												'Between'
										]),
										m('OPTION', {
												"value": 'justify-around'
											},[
												'Around'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Content:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'content-start'
											},[
												'Start'
										]),
										m('OPTION', {
												"value": 'content-end'
											},[
												'End'
										]),
										m('OPTION', {
												"value": 'content-center'
											},[
												'Center'
										]),
										m('OPTION', {
												"value": 'content-between'
											},[
												'Between'
										]),
										m('OPTION', {
												"value": 'content-around'
											},[
												'Around'
										]),
										m('OPTION', {
												"value": 'content-stretch'
											},[
												'Stretch'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Order:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),m('OPTION', {
												"value": 'order-0'
											},[
												'Order 0'
										]),
										m('OPTION', {
												"value": 'order-1'
											},[
												'Order 1'
										]),
										m('OPTION', {
												"value": 'order-2'
											},[
												'Order 2'
										]),
										m('OPTION', {
												"value": 'order-3'
											},[
												'Order 3'
										]),
										m('OPTION', {
												"value": 'order-4'
											},[
												'Order 4'
										]),
										m('OPTION', {
												"value": 'order-5'
											},[
												'Order 5'
										]),
										m('OPTION', {
												"value": 'order-6'
											},[
												'Order 6'
										]),
										m('OPTION', {
												"value": 'order-7'
											},[
												'Order 7'
										]),
										m('OPTION', {
												"value": 'order-8'
											},[
												'Order 8'
										]),
										m('OPTION', {
												"value": 'order-last'
											},[
												'Order last'
										])
									])
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Padding'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'pt0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'pt1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'pt2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'pt3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'pt4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'pt5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'pt6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'pt7'
												},[
													'7'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex w-100 items-center'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'pl0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'pl1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'pl2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'pl3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'pl4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'pl5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'pl6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'pl7'
												},[
													'7'
											])
										])
									]),
									m('DIV', {
											"class": 'w-80 ma2 pa3 ba tc'
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'pa0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'pa1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'pa2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'pa3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'pa4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'pa5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'pa6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'pa7'
												},[
													'7'
											])
										])
									]),
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'pr0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'pr1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'pr2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'pr3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'pr4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'pr5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'pr6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'pr7'
												},[
													'7'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'pb0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'pb1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'pb2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'pb3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'pb4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'pb5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'pb6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'pb7'
												},[
													'7'
											])
										])
									])
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Margin'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('HEADER', {
										"class": 'b'
									},[
										'+ve'
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),m('OPTION', {
													"value": 'mt0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'mt1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'mt2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'mt3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'mt4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'mt5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'mt6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'mt7'
												},[
													'7'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex w-100 items-center'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'ml0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'ml1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'ml2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'ml3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'ml4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'ml5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'ml6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'ml7'
												},[
													'7'
											])
										])
									]),
									m('DIV', {
											"class": 'w-80 h3 ma2 pa3 ba tc'
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'ma0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'ma1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'ma2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'ma3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'ma4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'ma5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'ma6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'ma7'
												},[
													'7'
											])
										])
									]),
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'mr0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'mr1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'mr2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'mr3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'mr4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'mr5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'mr6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'mr7'
												},[
													'7'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'mb0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'mb1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'mb2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'mb3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'mb4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'mb5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'mb6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'mb7'
												},[
													'7'
											])
										])
									])
								])
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1 mt2'
								},[
								m('HEADER', {
										"class": 'b'
									},[
										'-ve'
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'nt0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'nt1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'nt2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'nt3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'nt4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'nt5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'nt6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'nt7'
												},[
													'7'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex w-100 items-center'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'nl0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'nl1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'nl2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'nl3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'nl4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'nl5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'nl6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'nl7'
												},[
													'7'
											])
										])
									]),
									m('DIV', {
											"class": 'w-80 h3 ma2 pa3 ba tc'
										},[

									]),
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'nr0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'nr1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'nr2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'nr3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'nr4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'nr5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'nr6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'nr7'
												},[
													'7'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'nb0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'nb1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'nb2'
												},[
													'2'
											]),
											m('OPTION', {
													"value": 'nb3'
												},[
													'3'
											]),
											m('OPTION', {
													"value": 'nb4'
												},[
													'4'
											]),
											m('OPTION', {
													"value": 'nb5'
												},[
													'5'
											]),
											m('OPTION', {
													"value": 'nb6'
												},[
													'6'
											]),
											m('OPTION', {
													"value": 'nb7'
												},[
													'7'
											])
										])
									])
								])
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1 mt2'
								},[
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'ml-auto'
										},[

									]),
										' Auto Left'
								]),
								m('BR', {
									},[

								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'mr-auto'
										},[

									]),
										' Auto Right'
								]),
								m('BR', {
									},[

								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'center'
										},[

									]),
										' Center'
								]),
								m('BR', {
									},[

								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Overflow'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Both Axis:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'overflow-visible'
											},[
												'Visible'
										]),
										m('OPTION', {
												"value": 'overflow-hidden'
											},[
												'Hidden'
										]),
										m('OPTION', {
												"value": 'overflow-scroll'
											},[
												'Scroll'
										]),
										m('OPTION', {
												"value": 'overflow-auto'
											},[
												'Auto'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'X-axis:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'overflow-x-visible'
											},[
												'Visible'
										]),
										m('OPTION', {
												"value": 'overflow-x-hidden'
											},[
												'Hidden'
										]),
										m('OPTION', {
												"value": 'overflow-x-scroll'
											},[
												'Scroll'
										]),
										m('OPTION', {
												"value": 'overflow-x-auto'
											},[
												'Auto'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Y-axis:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'overflow-y-visible'
											},[
												'Visible'
										]),
										m('OPTION', {
												"value": 'overflow-y-hidden'
											},[
												'Hidden'
										]),
										m('OPTION', {
												"value": 'overflow-y-scroll'
											},[
												'Scroll'
										]),
										m('OPTION', {
												"value": 'overflow-y-auto'
											},[
												'Auto'
										])
									])
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Position'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('DIV', {
										"class": 'dib w-40'
									},[
										'Type:'
								]),
								m('SELECT', {
										"class": 'w-50'
									},[
									m('OPTION', {
											"value": ''
										},[
											'Unset'
									]),
									m('OPTION', {
											"value": 'static'
										},[
											'Static'
									]),
									m('OPTION', {
											"value": 'relative'
										},[
											'Relative'
									]),
									m('OPTION', {
											"value": 'absolute'
										},[
											'Absolute'
									]),
									m('OPTION', {
											"value": 'fixed'
										},[
											'Fixed'
									])
								])
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1 mt2'
								},[
								m('HEADER', {
										"class": 'b'
									},[
										'+ve'
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'top-0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'top-1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'top-2'
												},[
													'2'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex w-100 items-center'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'left-0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'left-1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'left-2'
												},[
													'2'
											])
										])
									]),
									m('DIV', {
											"class": 'w-80 h3 ma2 pa3 ba tc'
										},[

									]),
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'right-0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'right-1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'right-2'
												},[
													'2'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'bottom-0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'bottom-1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'bottom-2'
												},[
													'2'
											])
										])
									])
								])
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1 mt2'
								},[
								m('HEADER', {
										"class": 'b'
									},[
										'-ve'
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'top--0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'top--1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'top--2'
												},[
													'2'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex w-100 items-center'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),m('OPTION', {
													"value": 'left--0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'left--1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'left--2'
												},[
													'2'
											])
										])
									]),
									m('DIV', {
											"class": 'w-80 h3 ma2 pa3 ba tc'
										},[

									]),
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'right--0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'right--1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'right--2'
												},[
													'2'
											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('SELECT', {
											},[
											m('OPTION', {
													"value": ''
												},[
													'-'
											]),
											m('OPTION', {
													"value": 'bottom--0'
												},[
													'0'
											]),
											m('OPTION', {
													"value": 'bottom--1'
												},[
													'1'
											]),
											m('OPTION', {
													"value": 'bottom--2'
												},[
													'2'
											])
										])
									])
								])
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1 mt2'
								},[
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'absolute--fill'
										},[

									]),
										' Absolute Fill'
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Float'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Type:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'fl'
											},[
												'Left'
										]),
										m('OPTION', {
												"value": 'ff'
											},[
												'Right'
										]),
										m('OPTION', {
												"value": 'fn'
											},[
												'None'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Clear:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'cf'
											},[
												'Float'
										]),
										m('OPTION', {
												"value": 'cl'
											},[
												'Left'
										]),
										m('OPTION', {
												"value": 'cr'
											},[
												'Right'
										]),
										m('OPTION', {
												"value": 'cb'
											},[
												'Both'
										]),
										m('OPTION', {
												"value": 'cn'
											},[
												'None'
										])
									])
								])
							])
						])
					])
				]),
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer pa1'
						},[
							'Skin'
					]),
					m('DIV', {
							"class": 'pl1 bl bw2 ml1'
						},[
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Shadow:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'shadow-1'
									},[
										'Style 1'
								]),
								m('OPTION', {
										"value": 'shadow-2'
									},[
										'Style 2'
								]),
								m('OPTION', {
										"value": 'shadow-3'
									},[
										'Style 3'
								]),
								m('OPTION', {
										"value": 'shadow-4'
									},[
										'Style 4'
								]),
								m('OPTION', {
										"value": 'shadow-5'
									},[
										'Style 5'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Opacity:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'o-100'
									},[
										'100%'
								]),
								m('OPTION', {
										"value": 'o-90'
									},[
										'90%'
								]),
								m('OPTION', {
										"value": 'o-80'
									},[
										'80%'
								]),
								m('OPTION', {
										"value": 'o-70'
									},[
										'70%'
								]),
								m('OPTION', {
										"value": 'o-60'
									},[
										'60%'
								]),
								m('OPTION', {
										"value": 'o-50'
									},[
										'50%'
								]),
								m('OPTION', {
										"value": 'o-40'
									},[
										'40%'
								]),
								m('OPTION', {
										"value": 'o-30'
									},[
										'30%'
								]),
								m('OPTION', {
										"value": 'o-20'
									},[
										'20%'
								]),
								m('OPTION', {
										"value": 'o-20'
									},[
										'10%'
								]),
								m('OPTION', {
										"value": 'o-05'
									},[
										'5%'
								]),
								m('OPTION', {
										"value": 'o-025'
									},[
										'2.5%'
								]),
								m('OPTION', {
										"value": 'o-0'
									},[
										'0%'
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Colour'
							]),
							m(Colours)
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Border'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Outline:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'outline'
											},[
												'Solid'
										]),
										m('OPTION', {
												"value": 'outline-transparent'
											},[
												'Transparent'
										]),
										m('OPTION', {
												"value": 'outline-0'
											},[
												'None'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Radius:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'br0'
											},[
												'Scale 0'
										]),
										m('OPTION', {
												"value": 'br1'
											},[
												'Scale 1'
										]),
										m('OPTION', {
												"value": 'br2'
											},[
												'Scale 2'
										]),
										m('OPTION', {
												"value": 'br3'
											},[
												'Scale 3'
										]),
										m('OPTION', {
												"value": 'br4'
											},[
												'Scale 4'
										])
									])
								])
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1 mt2'
								},[
								m('HEADER', {
										"class": 'b'
									},[
										'Side'
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'bt'
												},[

											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex w-100 items-center'
									},[
									m('DIV', {
										},[
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'bl'
												},[

											])
										])
									]),
									m('DIV', {
											"class": 'w-80 h3 ma2 pa3 ba tc'
										},[
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'ba'
												},[

											])
										])
									]),
									m('DIV', {
										},[
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'br'
												},[

											])
										])
									])
								]),
								m('DIV', {
										"class": 'flex justify-around'
									},[
									m('DIV', {
										},[
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'bb'
												},[

											])
										])
									])
								])
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1 mt2'
								},[
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Tab:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'br-pill'
											},[
												'Pill'
										]),
										m('OPTION', {
												"value": 'br-bottom'
											},[
												'Bottom'
										]),
										m('OPTION', {
												"value": 'br-top'
											},[
												'Top'
										]),
										m('OPTION', {
												"value": 'br-right'
											},[
												'Right'
										]),
										m('OPTION', {
												"value": 'br-left'
											},[
												'Left'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Style:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'b—dotted'
											},[
												'Dotted'
										]),
										m('OPTION', {
												"value": 'b—dashed'
											},[
												'Dashed'
										]),
										m('OPTION', {
												"value": 'b—solid'
											},[
												'Solid'
										]),
										m('OPTION', {
												"value": 'b—double'
											},[
												'Double'
										]),
										m('OPTION', {
												"value": 'b—none'
											},[
												'None'
										])
									])
								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Width:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'bw-0'
											},[
												'Scale 0'
										]),
										m('OPTION', {
												"value": 'bw-1'
											},[
												'Scale 1'
										]),
										m('OPTION', {
												"value": 'bw-2'
											},[
												'Scale 2'
										]),
										m('OPTION', {
												"value": 'bw-3'
											},[
												'Scale 3'
										]),
										m('OPTION', {
												"value": 'bw-4'
											},[
												'Scale 4'
										]),
										m('OPTION', {
												"value": 'bw-5'
											},[
												'Scale 5'
										])
									])
								]),
								m('DETAILS', {
									},[
									m('SUMMARY', {
											"class": 'pointer pa1'
										},[
											'Zero Width'
									]),
									m('DIV', {
											"class": 'pl1 bl bw2 ml1'
										},[
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'br-0'
												},[

											]),
												' Right'
										]),
										m('BR', {
											},[

										]),
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'bl-0'
												},[

											]),
												' Left'
										]),
										m('BR', {
											},[

										]),
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'bt-0'
												},[

											]),
												' Top'
										]),
										m('BR', {
											},[

										]),
										m('LABEL', {
											},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'bb-0'
												},[

											]),
												' Bottom'
										]),
										m('BR', {
											},[

										])
									])
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Form'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'input-reset'
										},[

									]),
										' Input Reset'
								]),
								m('BR', {
									},[

								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'button-reset'
										},[

									]),
										' Button Reset'
								]),
								m('BR', {
									},[

								])
							])
						]),	
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Table'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'collapse'
										},[

									]),
										' Border Collapse'
								]),
								m('BR', {
									},[

								]),
								m('DIV', {
									},[
									m('DIV', {
											"class": 'dib w-40'
										},[
											'Stripe:'
									]),
									m('SELECT', {
											"class": 'w-50'
										},[
										m('OPTION', {
												"value": ''
											},[
												'Unset'
										]),
										m('OPTION', {
												"value": 'striped—light-silver'
											},[
												'Light silver'
										]),
										m('OPTION', {
												"value": 'striped—moon-grey'
											},[
												'Moon grey'
										]),
										m('OPTION', {
												"value": 'striped—light-grey'
											},[
												'Light grey'
										]),
										m('OPTION', {
												"value": 'striped—near-white'
											},[
												'Near white'
										]),
										m('OPTION', {
												"value": 'Striped-light'
											},[
												'Light'
										]),
										m('OPTION', {
												"value": 'Striped-dark'
											},[
												'Dark'
										])
									])
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Background'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
									m('DETAILS', {
										},[
										m('SUMMARY', {
												"class": 'pointer pa1'
											},[
												'Colour'
										]),
										m(Colours, {prefix: "bg-"})
									]),
									m('DETAILS', {
										},[
										m('SUMMARY', {
												"class": 'pointer pa1'
											},[
												'Image'
										]),
										m('DIV', {
												"class": 'pl1 bl bw2 ml1'
											},[
											m('DIV', {
												},[
												m('DIV', {
														"class": 'dib w-40'
													},[
														'Src:'
												]),
												m('INPUT', {
														"class": 'w-50 style',
														"type": 'text',
														"name": 'background-image',
														"list": "images_list",
														onblur: function() {
															DOMEditor.setStyle("background-image", `url(assets/${Projects.project_id}/images/${this.value})`)
														}
													},[

												])
											]),
											m('DIV', {
												},[
												m('DIV', {
														"class": 'dib w-40'
													},[
														'Type:'
												]),
												m('SELECT', {
														"class": 'w-50'
													},[
													m('OPTION', {
															"value": ''
														},[
															'Unset'
													]),
													m('OPTION', {
															"value": 'contain'
														},[
															'Contain'
													]),
													m('OPTION', {
															"value": 'cover'
														},[
															'Cover'
													])
												])
											]),
											m('DIV', {
												},[
												m('DIV', {
														"class": 'dib w-40'
													},[
														'Position:'
												]),
												m('SELECT', {
														"class": 'w-50'
													},[
													m('OPTION', {
															"value": ''
														},[
															'Unset'
													]),
													m('OPTION', {
															"value": 'bg-center'
														},[
															'center'
													]),
													m('OPTION', {
															"value": 'bg-top'
														},[
															'top'
													]),
													m('OPTION', {
															"value": 'bg-right'
														},[
															'right'
													]),
													m('OPTION', {
															"value": 'bg-bottom'
														},[
															'bottom'
													]),
													m('OPTION', {
															"value": 'bg-left'
														},[
															'left'
													])
												])
											])										])
									]),

									m('DETAILS', {
										},[
										m('SUMMARY', {
												"class": 'pointer pa1'
											},[
												'Aspect Ratio'
										]),
										m('DIV', {
												"class": 'pl1 bl bw2 ml1'
											},[
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'aspect-ratio'
													},[

												]),
													' Enable'
											]),
											m('BR', {
												},[

											]),
											m('LABEL', {
												},[
												m('INPUT', {
														"class": 'toggle',
														"type": 'checkbox',
														"value": 'object-full-screen'
													},[

												]),
													' Full Screen'
											]),
											m('BR', {
												},[

											]),
											m('DIV', {
												},[
												m('DIV', {
														"class": 'dib w-40'
													},[
														'Ratio:'
												]),
												m('SELECT', {
														"class": 'w-50'
													},[
													m('OPTION', {
															"value": ''
														},[
															'Unset'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-16x9'
														},[
															'16x9'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-9x16'
														},[
															'9x16'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-4x3'
														},[
															'4x3'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-3x4'
														},[
															'3x4'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-6x4'
														},[
															'6x4'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-4x6'
														},[
															'4x6'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-8x5'
														},[
															'8x5'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-5x8'
														},[
															'5x8'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-7x5'
														},[
															'7x5'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-5x7'
														},[
															'5x7'
													]),
													m('OPTION', {
															"value": 'aspect-ratio-1x1'
														},[
															'1x1'
													])
												])
											])
										])
									]),
									m('LABEL', {
										},[
										m('INPUT', {
												"class": 'toggle',
												"type": 'checkbox',
												"value": 'bg-animate'
											},[

										]),
											' Animate'
									])
								])
							]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Hovers'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
									m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
									m('LABEL', {
										},[
										m('INPUT', {
												"class": 'toggle',
												"type": 'checkbox',
												"value": 'dim'
											},[

										]),
										' Glow'
									])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'dim'
												},[

											]),
											' Dim'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'hide-child'
												},[

											]),
											' Hide Child'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'child'
												},[

											]),
											' Child'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'underline-hover'
												},[

											]),
											' Underline'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'grow'
												},[

											]),
											' Grow'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'grow-large'
												},[

											]),
											' Grow large'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'pointer pa1'
												},[

											]),
											' Pointer'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'shadow-hover'
												},[

											]),
											' Shadow'
										])
								]),
								m('DIV', {
										"class": 'pl1 bl bw2 ml1'
									},[
										m('LABEL', {
										},[
											m('INPUT', {
													"class": 'toggle',
													"type": 'checkbox',
													"value": 'bg-animate'
												},[

											]),
											' Bg Animate'
										])
								])
							])
						])
					])
				]),
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer pa1'
						},[
							'Misc'
					]),
					m('DIV', {
							"class": 'pl1 bl bw2 ml1'
						},[
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'link'
								},[

							]),
								' Link'
						]),
						m('BR', {
							},[

						]),
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'list'
								},[

							]),
								' List'
						]),
						m('BR', {
							},[

						]),
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'indent'
								},[

							]),
								' Indent'
						]),
						m('BR', {
							},[

						]),
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'truncate'
								},[

							]),
								' Truncate'
						]),
						m('BR', {
							},[

						]),
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'pointer-hover'
								},[

							]),
								' Pointer-hover'
						]),
						m('BR', {
							},[

						]),
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'shadow-hover'
								},[

							]),
								' Shadow-hover'
						]),
						m('BR', {
							},[

						]),
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'clip'
								},[

							]),
								' Clip'
						]),
						m('BR', {
							},[

						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'White space:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'ws-normal'
									},[
										'Normal'
								]),
								m('OPTION', {
										"value": 'nowrap'
									},[
										'Nowrap'
								]),
								m('OPTION', {
										"value": 'pre'
									},[
										'Preformatted'
								])
							])
						]),
						m('DETAILS', {
							},[
							m('SUMMARY', {
									"class": 'pointer pa1'
								},[
									'Nested'
							]),
							m('DIV', {
									"class": 'pl1 bl bw2 ml1'
								},[
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'nested-copy-line-height'
										},[

									]),
										' Nested-copy-line-height',
									m('BR', {
										},[

									])
								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'nested-list-reset'
										},[

									]),
										' Nested-list-reset',
									m('BR', {
										},[

									])
								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'nested-copy-indent'
										},[

									]),
										' Nested-copy-indent',
									m('BR', {
										},[

									])
								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'nested-copy-separator'
										},[

									]),
										' Nested-copy-separator',
									m('BR', {
										},[

									])
								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'nested-img'
										},[

									]),
										' Nested-img',
									m('BR', {
										},[

									])
								]),
								m('LABEL', {
									},[
									m('INPUT', {
											"class": 'toggle',
											"type": 'checkbox',
											"value": 'nested-links'
										},[

									]),
										' Nested-links',
									m('BR', {
										},[

									])
								])
							])
						])
					])
				]),
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer pa1'
						},[
							'Debug'
					]),
					m('DIV', {
							"class": 'pl1 bl bw2 ml1'
						},[
						m('LABEL', {
							},[
							m('INPUT', {
									"class": 'toggle',
									"type": 'checkbox',
									"value": 'show-empty',
									"checked": true
								},[

							]),
								' Show empty'
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Outline:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'debug'
									},[
										'Gold'
								]),
								m('OPTION', {
										"value": 'debug-white'
									},[
										'White'
								]),
								m('OPTION', {
										"value": 'debug-black'
									},[
										'Black'
								])
							])
						]),
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Grid:'
							]),
							m('SELECT', {
									"class": 'w-50'
								},[
								m('OPTION', {
										"value": ''
									},[
										'Unset'
								]),
								m('OPTION', {
										"value": 'debug-grid'
									},[
										'8px'
								]),
								m('OPTION', {
										"value": 'debug-grid-16'
									},[
										'16px'
								]),
								m('OPTION', {
										"value": 'debug-grid-8-solid'
									},[
										'8px solid'
								]),
								m('OPTION', {
										"value": 'debug-grid-16-solid'
									},[
										'16px solid'
								])
							])
						])
					])
				])
			])
		])
	}
}

