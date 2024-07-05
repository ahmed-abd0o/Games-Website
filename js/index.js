import Genre from "./genre.module.js";

let gamesArray;
export let gamesContainer = $(".games .row");
let card = $(".games .row .card");
let mainPage = $("div.main-page");
let layer = $("section.layer");
let xmark = $("section.layer i");

$("nav ul").on("click", async function (e) {
    if (!$(e.target).hasClass("active")) {
        allProccessFunc($(e.target).attr("href").slice(1));
        $(e.target).addClass("active");
        $(e.target).parent().siblings().children().removeClass("active");
    }
});

function generateCardClick(games) {
    card.on("click", async function (e) {
        let gameIndex = $(this).attr("data-index");
        await games.gamesArray[gameIndex].fetchDetails();
        let detailsHtml = games.gamesArray[gameIndex].displayDetails();
        layer.html(detailsHtml);
        layer.removeClass("d-none");
        mainPage.addClass("d-none");
        generateLayerSelectors();
    });
}

function generateLayerSelectors() {
    xmark = $("section.layer i");
    xmark.on("click", function (e) {
        mainPage.removeClass("d-none");
        layer.addClass("d-none");
    });
    document.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            xmark.click();
        }
    });
}

allProccessFunc();

async function allProccessFunc(genre = "MMORPG") {
    gamesContainer.html(""); // container
    let games = new Genre(genre); // create object with genre property internal using query(genre)
    gamesArray = await games.fetchGames(); //fetching using internal genre property and saving the returned array
    games.createGame(gamesArray); // creating game object for each game and give it the data needed and save it in array in games object
    games.displayGames(); // display all games in the array in games object using display function internal in every game object
    card = $(".games .row .card"); // when cards changes the events are gone so re select and
    generateCardClick(games); // re generate event handler
}
