"use strict";

const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("movies");

const API_KEY = "7b6f9032";

async function searchMovies(query) {
  if (!query) {
    moviesContainer.innerHTML = "";
    return;
  }

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
    moviesContainer.innerHTML = "Error fetching movies";
  }
}

function renderMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
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

const debouncedSearch = debounce(searchMovies, 1000);

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  debouncedSearch(e.target.value);
});
