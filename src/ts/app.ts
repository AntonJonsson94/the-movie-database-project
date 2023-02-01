const submitButton = document.querySelector("#submit") as HTMLElement;
submitButton.innerText = "Search";
const trendingTab = document.querySelector("#trending") as HTMLElement;
const maincontentArea = document.querySelector("#main-content") as HTMLElement;

const searchMovieUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = "?api_key=aa5ee409d52ded21ba46b85a22480907";
const queryUrl = "&query=";
const imageUrl = "https://image.tmdb.org/t/p/w500//";
const watchListButton = document.querySelector(
    "#watchlist-button"
) as HTMLParagraphElement;

const trendingUrl =
    "https://api.themoviedb.org/3/trending/all/day?api_key=aa5ee409d52ded21ba46b85a22480907";

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

type watchList = {
    poster_path: string;
    title: string;
};

const searchedMovies: movie[] = [];
const trendingMovies: trendingMovie[] = [];
const userWatchList: watchList[] = [{ poster_path: "hello", title: "string" }];

async function getMovie() {
    const inputField = document.querySelector("#input") as HTMLInputElement;
    const searchedMovie = inputField.value;
    const response = await fetch(
        searchMovieUrl + apiKey + queryUrl + searchedMovie
    );

    const data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
        const nameVariants = data.results[i].title ?? data.results[i].name;
        const releaseDateNameVariants =
            data.results[i].release_date ?? data.results[i].first_air_date;
        const roundedNumber = data.results[i].vote_average;

        const resultsCard = document.createElement("section") as HTMLElement;
        resultsCard.innerHTML = "Search results for:" + searchedMovie;

        const newSearchedMovies: movie = {
            poster_path: data.results[i].poster_path,
            title: nameVariants,
            rating: roundedNumber.toFixed(1),
            release: releaseDateNameVariants,
            overview: data.results[i].overview,
        };
        searchedMovies.push(newSearchedMovies);
        console.log(newSearchedMovies);
        printSearchResults();
    }
}

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    getMovie();
});

async function getTrendingMovies() {
    const response = await fetch(trendingUrl);
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        const checkNameVariant = data.results[i].title ?? data.results[i].name;
        const roundedNumber = data.results[i].vote_average;

        const newTrendingMovie: trendingMovie = {
            poster_path: data.results[i].poster_path,
            title: checkNameVariant,
            rating: roundedNumber.toFixed(1),
        };
        trendingMovies.push(newTrendingMovie);
        printTrendingMovies();
        console.log(newTrendingMovie);
    }
}

function printTrendingMovies() {
    const trendingCard = document.createElement("section") as HTMLElement;
    trendingCard.setAttribute("id", "trendingcard");
    trendingCard.innerHTML = "";
    for (let i: number = 0; i < trendingMovies.length; i++) {
        const posterCard = new Image();
        posterCard.setAttribute("class", "trending-poster");
        posterCard.src = imageUrl + trendingMovies[i].poster_path;
        const movieTitleCard = document.createElement(
            "p"
        ) as HTMLParagraphElement;
        movieTitleCard.innerHTML = trendingMovies[i].title;
        const movieRatingCard = document.createElement(
            "p"
        ) as HTMLParagraphElement;
        movieRatingCard.innerHTML = `Rating: ${trendingMovies[
            i
        ].rating.toString()}`;

        const goToMoviePageButton = document.createElement(
            "input"
        ) as HTMLInputElement;

        const addToWatchlistButton = document.createElement(
            "input"
        ) as HTMLInputElement;
        goToMoviePageButton.setAttribute("class", "trending-buttons");
        goToMoviePageButton.setAttribute("type", "submit");
        goToMoviePageButton.setAttribute("value", "Page");

        addToWatchlistButton.setAttribute("type", "submit");
        addToWatchlistButton.setAttribute("value", "Add to Watchlist");
        addToWatchlistButton.setAttribute("class", "trending-buttons");

        trendingTab.appendChild(trendingCard);
        trendingCard.appendChild(posterCard);
        trendingCard.appendChild(movieTitleCard);
        trendingCard.appendChild(movieRatingCard);
        trendingCard.appendChild(goToMoviePageButton);
        trendingCard.appendChild(addToWatchlistButton);
    }
}
getTrendingMovies();

function printSearchResults() {
    const searchedMovieCard = document.createElement("section") as HTMLElement;
    searchedMovieCard.setAttribute("id", "searchedMovieCard");
    searchedMovieCard.textContent = "";

    for (let i: number = 0; i < searchedMovies.length; i++) {
        const searchedPosterCard = new Image();
        searchedPosterCard.setAttribute("class", "searched-movie-poster");
        searchedPosterCard.src = imageUrl + searchedMovies[i].poster_path;

        const movieTitleCard = document.createElement(
            "p"
        ) as HTMLParagraphElement;
        movieTitleCard.innerHTML = searchedMovies[i].title;
        const movieRatingCard = document.createElement(
            "p"
        ) as HTMLParagraphElement;
        movieRatingCard.innerHTML = `Rating: ${searchedMovies[
            i
        ].rating.toString()}`;

        maincontentArea.appendChild(searchedMovieCard);
        searchedMovieCard.appendChild(searchedPosterCard);
        searchedMovieCard.appendChild(movieTitleCard);
        searchedMovieCard.appendChild(movieRatingCard);
    }
}
