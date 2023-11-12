document.addEventListener("DOMContentLoaded", function () {
  const inputBar = document.getElementById("search-bar");
  const suggestionsContainer = document.getElementById("suggestions-container");

  inputBar.addEventListener("input", debounce(handleInput, 300));

  // .........fetching movie details  from server based on  user's search using omdb api....................

  async function handleInput() {
    const inputValue = inputBar.value.trim();

    if (inputValue === "") {
      suggestionsContainer.style.display = "none";
      return;
    }

    try {
      const response2 = await fetch(
        `https://www.omdbapi.com/?t=${inputValue}&plot=full&apikey=b8d42e41`
      );
      const data2 = await response2.json();
      const response = await fetch(
        `https://www.omdbapi.com/?s=${inputValue}&apikey=b8d42e41`
      );
      const data = await response.json();
      console.log(data.Search);
      console.log("plot", data2);

      if (data.Search) {
        displaySuggestions(data.Search, data2);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //....binding  the fetched  movie details using bootstrap  card and showing to user on frontend side ................

  function displaySuggestions(suggestions, data2Value) {
    suggestionsContainer.innerHTML = "";
    console.log(suggestions);

    suggestions.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("card", "m-2");
      card.innerHTML = `
              <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
              <div class="card-body">
                  <h5 class="card-title">${movie.Title}</h5>
                  <p class="card-text">${movie.Year}</p>
                  <p class="card-text" style="display:none">${data2Value.Plot}</p>
                  
                  <a href="./MovieDetails.html" class="btn btn-warning ms-4">Click for more Info</a>
                  <button type="button" class="btn btn-info mt-3 favourites">Click to Add To Favourites</button>
              </div>
          `;
      card.addEventListener("click", () => {
        inputBar.value = movie.Title;
        suggestionsContainer.style.display = "none";
      });

      if (movie.Poster !== "N/A") {
        suggestionsContainer.appendChild(card);
      }
    });

    suggestionsContainer.style.display = "contents";
  }

  //  below  debounce function delays the frquent api  calls which maintains the  performane of  the application......

  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }
});
