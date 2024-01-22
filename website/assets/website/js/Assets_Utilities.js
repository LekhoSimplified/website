function list_assets() {

	$.getJSON( `/project/${project_id}/list_assets`, function(assets) {

		// console.info(assets);

		articles = []
		$.each( assets['articles'], function( article_id, article_name ) {
		    articles.push( `<a
		    		href='#'
		    		class="bl bw2 black link pa1 hover-bg-moon-gray hide-child"
		    		onclick="Load_article('${article_id}')">
		    		<span class="dib w-80 truncate" title="Open: ${article_name}">${article_name}</span>
		    		<span
			            class="fr child f4"
			            title="Delete Atricle"
			            onclick="Delete_article(event, '${article_name}', '${article_id}')">
			               ␡
			        </span>
			        <span
			            class="fr child f4 relative right-1"
			            title="Insert Link"
			            onclick="Insert_article_link(event, '${article_name}', '${article_id}')">
			               🔗
			        </span>
		    	</a>` );
		  });
		article_assets.innerHTML = articles.join("")

		images = []
		$.each( assets['images'], function( index ) {
		    images.push( `<a
			     href='#'
			     onclick="Load_image('${assets['images'][index]}')"
			     class="bl bw2 black link pa1 hover-bg-moon-gray hide-child">
			        <span class="dib w-80 truncate" title="Open: ${assets['images'][index]}">${assets['images'][index]}</span>
			        <span
			            class="fr child f4"
			            onclick="Delete_image(event, '${assets['images'][index]}')">
			               ␡
			        </span>
					<span
					    class="fr child f4 relative right-1"
					    title="Insert Link"
					    onclick="Insert_image_src(event, '${assets['images'][index]}')">
					       🔗
					</span>
			      </a>` );
		  });
		image_assets.innerHTML = images.join("")

		documents = []
		$.each( assets['documents'], function( index ) {
		    documents.push( `<a
		    	href="#"
		    	onclick="Load_document('${assets['documents'][index]}')"
		    	class="bl bw2 black link pa1 hover-bg-moon-gray hide-child relative">
		    		<span class="dib w-80 truncate" title="Open: ${assets['documents'][index]}">${assets['documents'][index]}</span>
		    		<span
		            class="fr child f4"
		            onclick="Delete_document(event, '${assets['documents'][index]}')">
		               ␡
		        </span>
		    </a>` );
		  });
		document_assets.innerHTML = documents.join("")

		templates = []
		$.each( assets['templates'], function( template_id, template_name ) {
		    templates.push( `<a
		    		href='#'
		    		class="bl bw2 black link pa1 hover-bg-moon-gray hide-child"
		    		onclick="Open_template('${template_id}')">
		    		<span class="dib w-80 truncate" title="Open: ${template_name}">${template_name}</span>
		    		<span
			            class="fr child f4"
			            onclick="Delete_template(event, '${project_id}', '${template_name}', '${template_id}')">
			               ␡
			        </span>
		    	</a>` );
		  });
		template_assets.innerHTML = templates.join("")
	 })
	.fail(function() {
		alert("Failed to list assets.")
	})
}
