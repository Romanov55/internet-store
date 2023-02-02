const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', function() {
  const searchTerm = searchInput.value;

  // Use searchTerm to search for products (e.g. send an API request)
  // ...

  // Update search results
  searchResults.innerHTML = `Results for "${searchTerm}"`;
});


// Обработчик события submit формы
document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Получение значения поля ввода
  var searchTerm = document.querySelector("item-serch").value;

  // Отправка запроса на сервер с помощью fetch API
  fetch("http://127.0.0.1:5500/" + searchTerm)
    .then(function(response) {
      return response.json();
    })
    .then(function(results) {
      // Обработка результатов поиска
      searchResults.innerHTML = (results);
    });
});
