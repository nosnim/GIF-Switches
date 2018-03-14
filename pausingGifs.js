var destinations = ["Hawaii", "Tahiti", "Alaska", "Grand Canyon", "South Africa", "Mexico", "Australia", "Germany", "China", "Bahamas"];
//creating a variable for the gif-click counter;
var gifCounter = 0;

//creating a variable for still / moving image toggle;

var g = gifCounter % 2;
function renderButtons() {
    // Deleting the movie buttons prior to adding new movie buttons // (this is necessary otherwise we will have repeat buttons) 
    $("#destinations-view").empty(); // Looping through the array of movies 
    for (var i = 0; i < destinations.length; i++) { // Then dynamicaly generating buttons for each movie in the array. 
        // This code $( "<button>") is all jQuery needs to create the start and end tag. (<button></button>) 
        var a = $("<button>"); // Adding a class 
        a.addClass("destination"); // Adding a data-attribute with a value of the destination at index i 
        a.attr("data-name", destinations[i]); // Providing the button's text with a value of the movie at index i 
        a.text(destinations[i]); // Adding the button to the HTML 
        $("#destinations-view").append(a);
    }
}
function gifClicks() {
    $("button").on("click", function () {
        // In this case, the "this" keyword refers to the button that was clicked
        var place = $(this).attr("data-name");

        //var person = $(this).attr("data-person");

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            place + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(place);
        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                console.log(results);

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating an image tag
                        var personImage = $("<img>");
                        var personMoving = $("<img>");
                        var gifImage = 0;


                        // Giving the image tag an src attribute of a property pulled off the
                        // result item
                        personImage.attr("src", results[i].images.fixed_height_still.url);
                        personMoving.attr("src", results[i].images.fixed_height.url);

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);


                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.prepend(personImage);
                        gifDiv.append(p);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);

                        


                    };
                }


            });
    });
}
$(".item").on("click", function () {
    $(this);
    console.log($(this));
    if (g = 0) {
        gifDiv.prepend(personMoving);
        gifDiv.append(p);
        $("#gifs-appear-here").prepend(gifDiv);
        gifCounter++;
    }
    else {
        gifDiv.prepend(personImage);
        gifDiv.append(p);
        $("#gifs-appear-here").prepend(gifDiv);
        gifCounter++;
    }
});

// This function handles events where one button is clicked 
$("#add-destination").on("click", function (event) { // event.preventDefault() prevents the form from trying to submit itself. 
    // We're using a form so that the user can hit enter instead of clicking the button if they want 
    event.preventDefault(); // This line will grab the text from the input box 
    var destination = $("#destination-input").val().trim();
    // The movie from the textbox is then added to our array 
    destinations.push(destination); // calling renderButtons which handles the processing of our movie array 
    renderButtons();
    gifClicks();
});
// Calling the renderButtons function at least once to display the initial list of movies 
renderButtons();
gifClicks();















