"use strict";

const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("movies");

const API_KEY = "7b6f9032";

async function searchMovies(query) {
  if (!query) {
    moviesContainer.innerHTML = "";
    return;
  }

  moviesContainer.innerHTML = "<p>Loading...</p>";

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    if (data.Response === "False") {
      moviesContainer.innerHTML = "<p>No movies found</p>";
      return;
    }

    renderMovies(data.Search);
  } catch (err) {
    moviesContainer.innerHTML = "<p>Error fetching movies</p>";
  }
}

// moviesContainer.addEventListener("click", async function (e) {
//   const movieCard = e.target.closest(".movie");

//   if (!movieCard) return;

//   const imdbID = movieCard.dataset.id;

//   try {
//     const res = await fetch(
//       `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
//     );

//     const data = await res.json();

//     console.log("Movie details:", data);
//   } catch (err) {
//     console.error("Error fetching movie details");
//   }
// });

function renderMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    movieCard.dataset.id = movie.imdbID;

    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";

    movieCard.innerHTML = `
      <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">
        <img src="${poster}" alt="${movie.Title}">
        <h3>Title: ${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
      </a>
    `;

    moviesContainer.appendChild(movieCard);
  });
}

function debounce(func, delay = 500) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce(searchMovies, 500);

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  debouncedSearch(e.target.value);
});
