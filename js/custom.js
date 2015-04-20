$(document).ready(function($) {

	var posts = [];
	var feeds = ['http://julienliabeuf.com/feed/', 'http://themeavenue.net/author/julien/feed'];

	// feeds.forEach( function(feed) {
	for ( var i = 0, len = feeds.length; i < len; i++ ) {

		$.get(
			document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&callback=?&q=' + encodeURIComponent(feeds[i]),
			'',
			function( data ) {
				
				$.each(data.responseData.feed.entries, function( key, value ) {

					var post = [];

					/* Set the post array */
					post['title']      = value.title;
					post['author']     = value.author;
					post['date']       = value.publishedDate;
					post['categories'] = value.categories;
					post['content']    = value.content;
					post['extract']    = value.contentSnippet;
					post['link']       = value.link;

					posts.push( post );

				});

			},
			'json'
		)

		.done( function() {
			if ( posts.length === 5 * feeds.length ) {

				var dated = [];

				for ( var i = 0, len = posts.length; i < len; i++ ) {
					var timestamp = new Date( posts[i]['date'] );
					timestamp = timestamp.getTime();
					dated[timestamp] = posts[i];
				}

				dated.sort();

				var articles = '';

				for ( var post in dated ) {
					articles += '<li><a href="' + dated[post]['link'] + '?utm_source=about-julien-liabeuf&utm_medium=portfolio&utm_campaign=Julien%20Liabeuf" target="_blank">' + dated[post]['title'] + '</a></li>';
				};

				document.getElementById( "writing-articles-list" ).innerHTML = articles;

			}
		});

	}

});