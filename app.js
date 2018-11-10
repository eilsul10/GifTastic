
var comedians =["Tina Fey", "Jimmy Kimmel", "Ali Wong", "Jerry Seinfeld", "Iliza Shlesinger", "George Carlin", "Michelle Wolf", "Conan O'Brien", "Amy Poehler", "Dave Chappelle"];

// Function for displaying comedian buttons
function showButtons() {

  // Deleting the buttons prior to adding new buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#comedian-view").empty();

  // Looping through the array of comedians
  for (var i = 0; i < comedians.length; i++) {

    // Then dynamicaly generating buttons for each comedian in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("comedian");
    // Adding a data-attribute with a value of the comedian at index i
    a.attr("data-name", comedians[i]);
    // Providing the button's context with a value of the comedian at index i
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
  // The comedian from the textbox is then added to our array
  comedians.push(comedian);

  // calling renderButtons which handles the processing of our comedian array
  showButtons();

  
});

// Calling the renderButtons function at least once to display the initial list of comedians
showButtons();

function comedianbuttonClick () {

$("button").on("click", function() {

    $("#gifs-appear-here").empty();

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
            let personImage = $("<img>");
            personImage.css("width", "90%");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.original.url);
            personImage.attr("animatedGif",results[i].images.original.url);
            personImage.attr("pausedGif",results[i].images.original_still.url);

            personImage.on("dblclick", function() {
              if (personImage.attr("src") === personImage.attr("animatedGif")) {
                  personImage.attr("src", personImage.attr("pausedGif"));
              }

              else {
                personImage.attr("src",personImage.attr("animatedGif"));

              }


            });

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);
            gifDiv.css("float", "left")
            gifDiv.css("width", "33%");
            gifDiv.css("padding", "5px");

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);

          }
        }
      });
  });

}



  