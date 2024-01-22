project_id = null
// article_id = null




function main() {
	var Toolbar = {
		view: function(vnode) {

			return [	
					m(Elements),
					m(StyleEditor),
					m(Properties)
			]
		}
	}

	m.mount(tools, Toolbar)

	List_library_template()
	List_projects()
}

main()