// API KEY: hk5qrCpV27xPshZoggW6ZZ9xDaANGB9q
// q, limit, rating
// document.ready

// function buildQueryURL() {
//     // queryURL is the url we'll use to query the API
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
  
//     // Begin building an object to contain our API call's query parameters
//     // Set the API key
//     var queryParams = { "api-key": "hk5qrCpV27xPshZoggW6ZZ9xDaANGB9q" };
  
//     // Grab text the user typed into the search input, add to the queryParams object
//     queryParams.q = $("#add-comedian")
//       .val()
//       .trim();
// }

// DO NOT TOUCH BELOW

var comedians =["Tina Fey", "Jimmy Kimmel", "Ali Wong", "Jerry Seinfeld", "Iliza Shlesinger", "George Carlin", "Michelle Wolf", "Conan O'Brien", "Amy Poehler", "Dave Chappelle"];

// Function for displaying comedian buttons
function showButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#comedian-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < comedians.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("comedian");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", comedians[i]);
    // Providing the button's context with a value of the movie at index i
    a.text(comedians[i]);
    // Adding the button to the HTML
    $("#comedian-view").append(a);
  }
  comedianbuttonClick();
}

$("#add-comedian").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var comedian = $("#comedian-add").val().trim();
  // The movie from the textbox is then added to our array
  comedians.push(comedian);

  // calling renderButtons which handles the processing of our movie array
  showButtons();

  
});

// Calling the renderButtons function at least once to display the initial list of movies
showButtons();

// DO NOT TOUCH ABOVE

function comedianbuttonClick () {

$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr('data-name');

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=hk5qrCpV27xPshZoggW6ZZ9xDaANGB9q&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

}

// comedianbuttonClick ();


// function to pause the Gif
// function pauseGif () {
// $(".gif").on("click", function() {
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
//   });

// }


  