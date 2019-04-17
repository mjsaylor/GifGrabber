
var heroes = ["Thor", "Captain America", "Hulk", "Black Widow", "Hawkeye", "Iron Man", "Spiderman"]


function renderButtons() {
    $("#render-buttons").empty();
    for (var i = 0; i < heroes.length; i++) {
        var a = $("<button>");
        a.addClass("hero-button");
        a.attr("data-hero", heroes[i]);
        a.text(heroes[i]);
        $("#render-buttons").append(a);
    }
}

$("#add-hero").on("click", function (event) {
    event.preventDefault();
    
    var hero = $("#hero-input").val().trim();
    if (heroes.includes(hero)) {
        console.log("Already Added")
        return
    } else {
        heroes.push(hero);
    }
    console.log(heroes);
    renderButtons();
});


function renderGifs() {
    var hero = $(this).attr("data-hero");
    console.log(this)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=SWdoMuBNH9GrMPaYWBF4V2TfSNYgGvlK&limit=10";

    $.get(queryURL)
        .then(function (response) {
            console.log(response)
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var heroImage = $("<img>");
                heroImage.attr("src", results[i].images.fixed_height_still.url)
                    .attr("data-still", results[i].images.fixed_height_still.url)
                    .attr("data-animate", results[i].images.fixed_height.url)
                    .attr("data-state", "still")
                    .addClass("gif");

                gifDiv.prepend(p);
                gifDiv.prepend(heroImage);

                $("#render-gifs").prepend(gifDiv);
            }
        });

};

function animateGifs () {
    var state = $(this).attr("data-state");
    console.log(state)

    if (state == "still") {
        var animateValue = $(this).attr("data-animate");
        $(this).attr("src", animateValue);
        $(this).attr("data-state", "animate")
    } else {
        console.log("State:" + state)
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
// function clearInput(){
//     $("#hero-input").text(" ")
// }

$(document).on("click", ".hero-button", renderGifs);
$(document).on("click", ".gif", animateGifs);
// $(document).on("click", "#hero-input", clearInput);
renderButtons();