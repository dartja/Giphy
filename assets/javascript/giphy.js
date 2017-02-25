
      // Initial array of animals
      var animals = ["dog", "cat", "cheetah", "lion","honey badger", "snake", "shark", "eagle", "bear", "polar bear", "parrot", "elephant", "monkey", "lionfish", "octopus", "sperm whale", "beaver", "cougar", "dingo", "megalodon", "human", "jellyfish", "lizard"];

      //
      function displayAnimalInfo() {

        var animal = $(this).attr("data-animal");
        $("#animals-show-here").empty();
        animal = encodeURI(animal);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for clicking animal button 
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var results = response.data;

          for (var i = 0; i < results.length; i++) {
              // Creating a div to hold the animal
              var animalDiv = $("<div class='animal-item'>");
              // Storing the rating data
              var rating = results[i].rating;
              // Creating an element to have the rating displayed
              var pRating = $("<p>").text("Rating: " + rating);
              // Displaying the rating
              animalDiv.append(pRating);
              //Make separate images with different states
              var animalImage = $("<img class='gif'>").attr("data-state", "still");
              animalImage.attr('data-animate', results[i].images.fixed_height.url);
              animalImage.attr('data-still', results[i].images.fixed_height_still.url);
              animalImage.attr("src", results[i].images.fixed_height_still.url);
              // Creating an element to hold the image
              // Appending the image
              animalDiv.append(animalImage);
              $("#animals-show-here").prepend(animalDiv);
            }

              $(".gif").on("click", function() {
              // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
              // If the clicked image's state is still, update its src attribute to what its data-animate value is.
              // Then, set the image's data-state to animate
              // Else set src to the data-still value
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
        });
      }

      // Function for displaying animal buttons and data
      function renderButtons() {

        //Deleting the animal div prior to adding new buttons
        //so the buttons don't duplicate
        $("#buttons-animal").empty();
        //$("#animals-show-here").empty();
        // Looping through the array of animals
        for (var j = 0; j < animals.length; j++) {

          //Generate buttons for each animal in the array
          var a = $("<button class='btn btn-success'>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-animal", animals[j]);
          // Providing the initial button text
          a.text(animals[j]);
          // Adding the button to the buttons-animal div
          $("#buttons-animal").append(a);
        }
      }

      // This function handles events where an animal button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        // Adding animal from the textbox to our array
        animals.push(animal);
        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal"
      $(document).on("click", ".animal", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      


