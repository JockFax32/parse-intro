// Initialize Parse app
Parse.initialize('whFUiMRbhZNBs8LSXBekVE7JolwODumX5i0dDyCM','3x7vBV6vLeYkNwgebDVAqMtsroFKs2XUZauOaZ4M')

// Create a new sub-class of the Parse.Object, with name "Music"
var Music = Parse.Object.extend('Music');
// Create a new instance of your Music class 
// var music = new Music();

// // Set a property 'band' equal to a band name
// music.set('band', 'Frank Orange');

// // Set a property 'website' equal to the band's website
// music.set('website', 'frankOrange.com');
    
// // Set a property 'song' equal to a song
// music.set('song','Forest Gump');

// // Save your instance of your song -- and go see it on parse.com!
// music.save();

// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of your Music class 
	var music = new Music();

	// For each input element, set a property of your new instance equal to the input's value
	// music.set('band', $("#band").val());
	// music.set('website', $('#website'.val()));
	// music.set ('song', $('#song:input').val());

	
	// A more effective loop structure
	$(this).find('input').each(function (){
		music.set($(this).attr('id'),$(this).val())
		$(this).val('');
	});
	// After setting each property, save your new instance back to your database
	music.save(null,{
		success:function(){
			getData()
		}
	});


	
	return false
})



// Write a function to get data
var getData = function() {
	

	// Set up a new query for our Music class
	var query = new Parse.Query(Music);


	// Set a parameter for your query -- where the website property isn't missing
	query.exists('website');


	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/

	query.find({
		success:function(response){
			buildList(response);
		} 
	})

	/* querry.find ({
		success:buildList
	})*/
}

// A function to build your list
var buildList = function(data) {
	console.log('buildList', data)
	// Empty out your unordered list
	$('ol').empty();
	// Loop through your data, and pass each element to the addItem function
	data.forEach(function(d){
		addItem(d);
	})

}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	console.log('add item: ',item)
	// Get parameters (website, band, song) from the data item passed to the function
	var website = item.get('website');
	var band = item.get ('band');
	var song =item.get('song');
	// Append li that includes text from the data item
	var li =$('<li> Check out '+ band + 'I love song '+ song + '</li>');
	var button = $('<button class="btn-xs btn-danger"><span  class ="glyphicon  glyphicon-remove"></span></button>');
	button.on('click',function(){
		item.destroy({
			success: function(){
				getData()
			}
		});

	})


	li.append(button) 
	$('ol').append(li);

	
	// Time pending, create a button that removes the data item on click
	
}

// Call your getData function when the page loads
getData();


