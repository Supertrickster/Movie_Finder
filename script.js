$(document).ready(function() {
  let movies = [];

  $.ajax({
    type: "GET",
    url: "db.xml",
    dataType: "xml",
    success: function(xml) {
      $(xml).find('movie').each(function() {
        const title = $(this).find('title').text();
        const year = $(this).find('year').text();
        const director = $(this).find('director').text();
        const genre = $(this).find('genre').text();
        const rating = $(this).find('rating').text();
        movies.push({ title, year, director, genre, rating });
      });

      // Sort movies by year (default)
      movies.sort((a, b) => a.year - b.year);

      updateMovieList(movies);
    },
    error: function() {
      $('#movie-list').append('<li>Error loading movie data</li>');
    }
  });

  // Search bar functionality
  $('#search-btn').on('click', function() {
    const searchTerm = $('#search-bar').val().trim();
    if (searchTerm !== '') {
      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
      updateMovieList(filteredMovies);
    } else {
      updateMovieList(movies);
    }
  });

  // Sort by year button
  $('#sort-by-year').on('click', function() {
    movies.sort((a, b) => a.year - b.year);
    updateMovieList(movies);
  });

  // Sort by rating button
  $('#sort-by-rating').on('click', function() {
    movies.sort((a, b) => b.rating - a.rating);
    updateMovieList(movies);
  });

  function updateMovieList(movies) {
    $('#movie-list').empty();
    movies.forEach(movie => {
      $('#movie-list').append(`
        <li class="movie-item">
          <h2>${movie.title}</h2>
          <p>Year: ${movie.year}</p>
          <p>Director: ${movie.director}</p>
          <p>Genre: ${movie.genre}</p>
          <p>Rating: ${movie.rating}</p>
        </li>
      `);
    });
  }
});

/*      // Get the sorting buttons
const sortByYearBtn = document.getElementById('sort-by-year');
const sortByRatingBtn = document.getElementById('sort-by-rating');

// Add event listeners to the buttons
sortByYearBtn.addEventListener('click', () => {
  // Toggle the arrow indicator
  if (sortByYearBtn.textContent.includes('↑')) {
    sortByYearBtn.textContent = 'Sort by Year ↓';
  } else {
    sortByYearBtn.textContent = 'Sort by Year ↑';
  }
  // Call the sorting function here
});

sortByRatingBtn.addEventListener('click', () => {
  // Toggle the arrow indicator
  if (sortByRatingBtn.textContent.includes('↑')) {
    sortByRatingBtn.textContent = 'Sort by Rating ↓';
  } else {
    sortByRatingBtn.textContent = 'Sort by Rating ↑';
  }
  // Call the sorting function here
});*/