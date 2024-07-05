export default class Game {
    constructor(gameObject) {
        this.idx = 0;
        this.id = gameObject.id;
        this.title = gameObject.title;
        this.genre = gameObject.genre;
        this.developer = gameObject.developer;
        this.publisher = gameObject.publisher;
        this.platform = gameObject.platform;
        this.release_date = gameObject.release_date;
        this.short_description = gameObject.short_description;
        this.thumbnail = gameObject.thumbnail;
        this.details = {};
    }
    displayGame() {
        let gameContainer = `
                        <div class="col-md-3 col-6">
                            <div class="inner h-100">
                                <div
                                    class="card h-100 pb-0 bg-transparent text-white rounded-bottom-3 rounded-top-5 overflow-hidden"
                                    data-id="${this.id}" data-index="${this.idx}"
                                >
                                    <div class="img-container"">
                                        <img
                                            src="${this.thumbnail}"
                                            class="w-100"
                                            alt="..."
                                        />
                                    </div>
                                    <div class="card-body small">
                                        <div
                                            class="card-title d-flex justify-content-between align-items-center mb-3"
                                        >
                                            <h5 class="m-0">
                                                ${this.title}
                                            </h5>
                                            <h4
                                                class=" text-primary p-2"
                                            >
                                                Free
                                            </h4>
                                        </div>
                                        <p
                                            class="card-text text-center opacity-25"
                                        >
                                        ${this.short_description}
                                        </p>
                                    </div>
                                    <div
                                        class="my-card-footer opacity-25 position-relative my-3 small d-flex justify-content-around align-items-center"
                                    >
                                        <span class="">
                                            ${this.genre}
                                        </span>
                                        <span class="">
                                            ${this.platform}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
`;
        return gameContainer;
    }

    fetchUrl(id) {
        return `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
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

    async fetchDetails() {
        try {
            const response = await fetch(
                this.fetchUrl(this.id),
                this.fetchOptions()
            );
            const result = await response.json();
            this.details = await result;
        } catch (error) {
            console.error(error);
        }
    }

    displayDetails() {
        return `
    <div class="container position-relative">
                <h2 class="text-white py-4">Details Game</h2>
                <div class="row text-white">
                    <div class="col-md-4 col-12">
                        <img
                            src="${this.thumbnail}"
                            alt=""
                            class="w-100"
                        />
                    </div>
                    <div class="col-md-8 col-12">
                        <h3>title: ${this.title}</h3>
                        <p class="mb-3">
                            Category:
                            <span class="badge badge-bgc">${this.genre}</span>
                        </p>
                        <p class="mb-3">
                            Platform:
                            <span class="badge badge-bgc">${this.platform}</span>
                        </p>
                        <p class="mb-3">
                            Status: <span class="badge badge-bgc">${this.details.status}</span>
                        </p>
                        <p>
                        ${this.details.description}
                        </p>
                        <a class="btn btn-outline-warning" href="${this.details.game_url}" target="_blank">Show Game</a>
                    </div>
                </div>
                <i class="fa-solid fa-xmark text-white position-absolute top-0 fa-2x end-0 mt-4 me-4"></i>
            </div>
        `;
    }
}
