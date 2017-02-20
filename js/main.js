// listen for form submit
document.getElementById('bookmarksForm').addEventListener('submit', saveBookmark);



function saveBookmark(e){
	// get form values
	var websiteName = document.getElementById('websiteName').value;
	var websiteUrl = document.getElementById('websiteUrl').value;	

	if(!validateForm(websiteName, websiteUrl)){
		return false;
	}

	var bookmark = {
		name: websiteName,
		url: websiteUrl
	}

	// console.log(bookmark);

	/*
	// local Storage Test
	localStorage.setItem('test', 'hello world');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	// test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// init array
		var bookmarks = [];

		// add to array
		bookmarks.push(bookmark);

		// set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		// Add bookmark to array
		bookmarks.push(bookmark);

		// Re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear Form
	document.getElementById('bookmarksForm').reset();

	// Re-fetch bookmarks
	fetchBookmarks();

	// prevent form from submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
	// console.log(url);

	// Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Loop throught bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// remove from array
			bookmarks.splice(i, 1);
		}
	}

	// Re-set back to LocalStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch bookmarks
	fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// console.log(bookmarks);

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// build output
	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>' + name +
										' <a class="btn btn-info" target="_blank" href="'+url+'">Visit</a>' + 
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
										'</h3>'+ 
										'</div>';
	}
}

// Validate Form
function validateForm(websiteName, websiteUrl){

	if(!websiteName || !websiteUrl){
		alert('Please fill in the form');
		return false;		
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!websiteUrl.match(regex)){
		alert('Please use a vaild URL');
		return false;
	}

	return true;
}

