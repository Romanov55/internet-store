const result = document.querySelector('.search-results')

fetch('https://dummyjson.com/products')
  .then((response) => {
    return response.json();
   })
  .then((article) => {
    console.log(article.products[1].title)
    result.innerHTML = article.products[1].title
  })
  