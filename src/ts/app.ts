const submitButton = document.querySelector("#submit") as HTMLInputElement;
submitButton.innerText = "Search";
const trendingTab = document.querySelector("#trending") as HTMLHeadingElement;
const inputField = document.querySelector("#input") as HTMLInputElement;
const searchedMovie = inputField.value;
console.log(searchedMovie);
const searchMovieUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = "?api_key=aa5ee409d52ded21ba46b85a22480907";
const queryUrl = "&query=";
const imageUrl = "https://image.tmdb.org/t/p/w500//";
const movieByTitle = "heat";
const watchListButton = document.querySelector(
    "#watchlist-button"
) as HTMLParagraphElement;

watchListButton.addEventListener("click", function () {
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
});

async function getMovie() {
    const response = await fetch(
        searchMovieUrl + apiKey + queryUrl + searchedMovie
    );

    const data = await response.json();

    console.log(data.results[0].title);
    console.log(data.results[1].title);
    console.log(data.results[2].title);
    console.log(data.results[3].title);
    console.log(data.results[4].title);
}

// submitButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     getMovie();
// });

type movie = {
    poster_path: string;
    title: string;
    rating: number;
    release: number;
    overview: string;
};

type trendingMovie = {
    poster_path: string;
    title: string;
    rating: number;
};

const movies: movie[] = [];
const trendingMovies: trendingMovie[] = [];

const trendingUrl =
    "https://api.themoviedb.org/3/trending/all/day?api_key=aa5ee409d52ded21ba46b85a22480907";

async function getTrendingMovies() {
    const response = await fetch(trendingUrl);
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        const checkNameVariant = data.results[i].title ?? data.results[i].name;
        const newTrendingMovie: trendingMovie = {
            poster_path: data.results[i].poster_path,
            title: checkNameVariant,
            rating: data.results[i].vote_average,
        };
        trendingMovies.push(newTrendingMovie);
        console.log(newTrendingMovie);
    }
    printTrendingMovies();
}
function printTrendingMovies() {
    const trendingCard = document.createElement("section") as HTMLElement;
    trendingCard.setAttribute("id", "trendingcard");
    trendingCard.innerHTML = "";
    for (let i = 0; i < trendingMovies.length; i++) {
        const posterCard = new Image();
        posterCard.setAttribute("class", "trending-poster");
        posterCard.src = `https://image.tmdb.org/t/p/w500//${trendingMovies[i].poster_path}`;
        const movieTitleCard = document.createElement(
            "p"
        ) as HTMLParagraphElement;
        movieTitleCard.innerHTML = trendingMovies[i].title;
        const movieRatingCard = document.createElement(
            "p"
        ) as HTMLParagraphElement;
        movieRatingCard.innerHTML = `Rating ${trendingMovies[
            i
        ].rating.toString()}`;

        trendingTab.appendChild(trendingCard);
        trendingCard.appendChild(posterCard);
        trendingCard.appendChild(movieTitleCard);
        trendingCard.appendChild(movieRatingCard);
    }
}
getTrendingMovies();
