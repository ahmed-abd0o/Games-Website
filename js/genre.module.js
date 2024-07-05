import Game from "./game.module.js";
import { gamesContainer } from "./index.js";

export default class Genre {
    constructor(gen) {
        this.genre = gen;
        this.gamesArray = [];
    }
    fetchUrl(str) {
        return `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.genre}`;
    }
    fetchOptions() {
        return {
            method: "GET",
            headers: {
                "x-rapidapi-key":
                    "fc8cc3c97fmsh82ac2e2a3effd8ap19309ajsnfdf5faed990b",
                "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            },
        };
    }

    async fetchGames(str) {
        let response = await fetch(this.fetchUrl(str), this.fetchOptions());
        let responseArray = await response.json();
        return responseArray;
    }

    createGame(arrOfGames) {
        let arr = arrOfGames.map((item, index) => {
            let tempVariable = new Game(item);
            tempVariable.idx = index;
            return tempVariable;
        });
        arr.map((item) => {
            this.gamesArray.push(item);
        });
    }

    displayGames() {
        for (const game of this.gamesArray) {
            $(gamesContainer).append(game.displayGame());
        }
    }
}
