
var Colours = {
  oncreate: function(vnode) {

    let list = []
    let switches = vnode.dom.querySelectorAll('div[title]')
    switches.forEach(function(s) {
      list.push(s.getAttribute('title'))
    })

    vnode.dom.addEventListener('click', function(e) {
        DOMEditor.Remove_classes(list)

        if (e.target.getAttribute('title'))
          DOMEditor.Add_class(e.target.getAttribute('title'))
    })
  },
  view: function(vnode) {
    let prefix = vnode.attrs.prefix ? vnode.attrs.prefix : ''

    return m("div", [
      m("div", {class: "mv2"}, [
        // m("button", {class: "mh1", title: ""}, "Transparent"),
        m("button", {class: "mh1", title:""}, "Unset"),
      ]),
      m("div", {class: "dib h1 bg-white"},
        [
          m("div", {"class":"bg-black-100 h1 w1 dib", title: `${prefix}black-100%`}),
          m("div", {"class":"bg-black-90 h1 w1 dib", title: `${prefix}black-90%`}),
          m("div", {"class":"bg-black-80 h1 w1 dib", title: `${prefix}black-80%`}),
          m("div", {"class":"bg-black-70 h1 w1 dib", title: `${prefix}black-70%`}),
          m("div", {"class":"bg-black-60 h1 w1 dib", title: `${prefix}black-60%`}),
          m("div", {"class":"bg-black-50 h1 w1 dib", title: `${prefix}black-50%`}),
          m("div", {"class":"bg-black-40 h1 w1 dib", title: `${prefix}black-40%`}),
          m("div", {"class":"bg-black-30 h1 w1 dib", title: `${prefix}black-30%`}),
          m("div", {"class":"bg-black-20 h1 w1 dib", title: `${prefix}black-20%`}),
          m("div", {"class":"bg-black-10 h1 w1 dib", title: `${prefix}black-10%`}),
          m("div", {"class":"bg-black-05 h1 w1 dib", title: `${prefix}black-0.5%`}),
          m("div", {"class":"bg-black-025 h1 w1 dib", title: `${prefix}black-0.25%`}),
        ]
      ),
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-red-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-red-1 h1 w1 dib", title: `${prefix}red-1`}),
          m("div", {"class":"bg-red-2 h1 w1 dib", title: `${prefix}red-2`}),
          m("div", {"class":"bg-red-3 h1 w1 dib", title: `${prefix}red-3`}),
          m("div", {"class":"bg-red-4 h1 w1 dib", title: `${prefix}red-4`}),
          m("div", {"class":"bg-red-5 h1 w1 dib", title: `${prefix}red-5`}),
          m("div", {"class":"bg-red-6 h1 w1 dib", title: `${prefix}red-6`}),
          m("div", {"class":"bg-red-7 h1 w1 dib", title: `${prefix}red-7`}),
          m("div", {"class":"bg-red-8 h1 w1 dib", title: `${prefix}red-8`}),
          m("div", {"class":"bg-red-9 h1 w1 dib", title: `${prefix}red-9`}),
          m("div", {"class":"bg-red-10 h1 w1 dib", title: `${prefix}red-10`}),
          m("div", {"class":"bg-red-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-orange-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-orange-1 h1 w1 dib", title: `${prefix}orange-1`}),
          m("div", {"class":"bg-orange-2 h1 w1 dib", title: `${prefix}orange-2`}),
          m("div", {"class":"bg-orange-3 h1 w1 dib", title: `${prefix}orange-3`}),
          m("div", {"class":"bg-orange-4 h1 w1 dib", title: `${prefix}orange-4`}),
          m("div", {"class":"bg-orange-5 h1 w1 dib", title: `${prefix}orange-5`}),
          m("div", {"class":"bg-orange-6 h1 w1 dib", title: `${prefix}orange-6`}),
          m("div", {"class":"bg-orange-7 h1 w1 dib", title: `${prefix}orange-7`}),
          m("div", {"class":"bg-orange-8 h1 w1 dib", title: `${prefix}orange-8`}),
          m("div", {"class":"bg-orange-9 h1 w1 dib", title: `${prefix}orange-9`}),
          m("div", {"class":"bg-orange-10 h1 w1 dib", title: `${prefix}orange-10`}),
          m("div", {"class":"bg-orange-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-yellow-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-yellow-1 h1 w1 dib", title: `${prefix}yellow-1`}),
          m("div", {"class":"bg-yellow-2 h1 w1 dib", title: `${prefix}yellow-2`}),
          m("div", {"class":"bg-yellow-3 h1 w1 dib", title: `${prefix}yellow-3`}),
          m("div", {"class":"bg-yellow-4 h1 w1 dib", title: `${prefix}yellow-4`}),
          m("div", {"class":"bg-yellow-5 h1 w1 dib", title: `${prefix}yellow-5`}),
          m("div", {"class":"bg-yellow-6 h1 w1 dib", title: `${prefix}yellow-6`}),
          m("div", {"class":"bg-yellow-7 h1 w1 dib", title: `${prefix}yellow-7`}),
          m("div", {"class":"bg-yellow-8 h1 w1 dib", title: `${prefix}yellow-8`}),
          m("div", {"class":"bg-yellow-9 h1 w1 dib", title: `${prefix}yellow-9`}),
          m("div", {"class":"bg-yellow-10 h1 w1 dib", title: `${prefix}yellow-10`}),
          m("div", {"class":"bg-yellow-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-green-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-green-1 h1 w1 dib", title: `${prefix}green-1`}),
          m("div", {"class":"bg-green-2 h1 w1 dib", title: `${prefix}green-2`}),
          m("div", {"class":"bg-green-3 h1 w1 dib", title: `${prefix}green-3`}),
          m("div", {"class":"bg-green-4 h1 w1 dib", title: `${prefix}green-4`}),
          m("div", {"class":"bg-green-5 h1 w1 dib", title: `${prefix}green-5`}),
          m("div", {"class":"bg-green-6 h1 w1 dib", title: `${prefix}green-6`}),
          m("div", {"class":"bg-green-7 h1 w1 dib", title: `${prefix}green-7`}),
          m("div", {"class":"bg-green-8 h1 w1 dib", title: `${prefix}green-8`}),
          m("div", {"class":"bg-green-9 h1 w1 dib", title: `${prefix}green-9`}),
          m("div", {"class":"bg-green-10 h1 w1 dib", title: `${prefix}green-10`}),
          m("div", {"class":"bg-green-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-teal-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-teal-1 h1 w1 dib", title: `${prefix}teal-1`}),
          m("div", {"class":"bg-teal-2 h1 w1 dib", title: `${prefix}teal-2`}),
          m("div", {"class":"bg-teal-3 h1 w1 dib", title: `${prefix}teal-3`}),
          m("div", {"class":"bg-teal-4 h1 w1 dib", title: `${prefix}teal-4`}),
          m("div", {"class":"bg-teal-5 h1 w1 dib", title: `${prefix}teal-5`}),
          m("div", {"class":"bg-teal-6 h1 w1 dib", title: `${prefix}teal-6`}),
          m("div", {"class":"bg-teal-7 h1 w1 dib", title: `${prefix}teal-7`}),
          m("div", {"class":"bg-teal-8 h1 w1 dib", title: `${prefix}teal-8`}),
          m("div", {"class":"bg-teal-9 h1 w1 dib", title: `${prefix}teal-9`}),
          m("div", {"class":"bg-teal-10 h1 w1 dib", title: `${prefix}teal-10`}),
          m("div", {"class":"bg-teal-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-blue-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-blue-1 h1 w1 dib", title: `${prefix}blue-1`}),
          m("div", {"class":"bg-blue-2 h1 w1 dib", title: `${prefix}blue-2`}),
          m("div", {"class":"bg-blue-3 h1 w1 dib", title: `${prefix}blue-3`}),
          m("div", {"class":"bg-blue-4 h1 w1 dib", title: `${prefix}blue-4`}),
          m("div", {"class":"bg-blue-5 h1 w1 dib", title: `${prefix}blue-5`}),
          m("div", {"class":"bg-blue-6 h1 w1 dib", title: `${prefix}blue-6`}),
          m("div", {"class":"bg-blue-7 h1 w1 dib", title: `${prefix}blue-7`}),
          m("div", {"class":"bg-blue-8 h1 w1 dib", title: `${prefix}blue-8`}),
          m("div", {"class":"bg-blue-9 h1 w1 dib", title: `${prefix}blue-9`}),
          m("div", {"class":"bg-blue-10 h1 w1 dib", title: `${prefix}blue-10`}),
          m("div", {"class":"bg-blue-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-indigo-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-indigo-1 h1 w1 dib", title: `${prefix}indigo-1`}),
          m("div", {"class":"bg-indigo-2 h1 w1 dib", title: `${prefix}indigo-2`}),
          m("div", {"class":"bg-indigo-3 h1 w1 dib", title: `${prefix}indigo-3`}),
          m("div", {"class":"bg-indigo-4 h1 w1 dib", title: `${prefix}indigo-4`}),
          m("div", {"class":"bg-indigo-5 h1 w1 dib", title: `${prefix}indigo-5`}),
          m("div", {"class":"bg-indigo-6 h1 w1 dib", title: `${prefix}indigo-6`}),
          m("div", {"class":"bg-indigo-7 h1 w1 dib", title: `${prefix}indigo-7`}),
          m("div", {"class":"bg-indigo-8 h1 w1 dib", title: `${prefix}indigo-8`}),
          m("div", {"class":"bg-indigo-9 h1 w1 dib", title: `${prefix}indigo-9`}),
          m("div", {"class":"bg-indigo-10 h1 w1 dib", title: `${prefix}indigo-10`}),
          m("div", {"class":"bg-indigo-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-violet-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-violet-1 h1 w1 dib", title: `${prefix}violet-1`}),
          m("div", {"class":"bg-violet-2 h1 w1 dib", title: `${prefix}violet-2`}),
          m("div", {"class":"bg-violet-3 h1 w1 dib", title: `${prefix}violet-3`}),
          m("div", {"class":"bg-violet-4 h1 w1 dib", title: `${prefix}violet-4`}),
          m("div", {"class":"bg-violet-5 h1 w1 dib", title: `${prefix}violet-5`}),
          m("div", {"class":"bg-violet-6 h1 w1 dib", title: `${prefix}violet-6`}),
          m("div", {"class":"bg-violet-7 h1 w1 dib", title: `${prefix}violet-7`}),
          m("div", {"class":"bg-violet-8 h1 w1 dib", title: `${prefix}violet-8`}),
          m("div", {"class":"bg-violet-9 h1 w1 dib", title: `${prefix}violet-9`}),
          m("div", {"class":"bg-violet-10 h1 w1 dib", title: `${prefix}violet-10`}),
          m("div", {"class":"bg-violet-11 h1 w1 dib", title: `${prefix}white`})
        ]
      ), 
      m("div", {class: "h1"},
        [
          m("div", {"class":"bg-gray-0 h1 w1 dib", title: `${prefix}black`}),
          m("div", {"class":"bg-gray-1 h1 w1 dib", title: `${prefix}gray-1`}),
          m("div", {"class":"bg-gray-2 h1 w1 dib", title: `${prefix}gray-2`}),
          m("div", {"class":"bg-gray-3 h1 w1 dib", title: `${prefix}gray-3`}),
          m("div", {"class":"bg-gray-4 h1 w1 dib", title: `${prefix}gray-4`}),
          m("div", {"class":"bg-gray-5 h1 w1 dib", title: `${prefix}gray-5`}),
          m("div", {"class":"bg-gray-6 h1 w1 dib", title: `${prefix}gray-6`}),
          m("div", {"class":"bg-gray-7 h1 w1 dib", title: `${prefix}gray-7`}),
          m("div", {"class":"bg-gray-8 h1 w1 dib", title: `${prefix}gray-8`}),
          m("div", {"class":"bg-gray-9 h1 w1 dib", title: `${prefix}gray-9`}),
          m("div", {"class":"bg-gray-10 h1 w1 dib", title: `${prefix}gray-10`}),
          m("div", {"class":"bg-gray-11 h1 w1 dib", title: `${prefix}white`})
        ]
      )
    ])
  }
}

