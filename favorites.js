  // Удаление товара из локального хранилища
  function removeFromCart(idProduct) {
    let cartToFavorites = [];
    // Получаем текущую корзину из localStorage
    if (localStorage.getItem('cartToFavorites')) {
      cartToFavorites = JSON.parse(localStorage.getItem('cartToFavorites'));
    }
    // Удаляем товар из корзины
    cartToFavorites = cartToFavorites.filter(item => Number(item) !== Number(idProduct));
    console.log(cartToFavorites)
    // Обновляем корзину в localStorage
    localStorage.setItem('cartToFavorites', JSON.stringify(cartToFavorites));
  }

// достаём переданный айди
window.addEventListener("load", function() {
  let cartToFavorites = JSON.parse(localStorage.getItem("cartToFavorites"));

fetch('https://dummyjson.com/products')
  .then((response) => {
    return response.json();
   })

  // распаковать папку продукты
  .then((article) => {
    return article.products;
  })

  .then((products) => {
    // див со списком продуктов
    const productsBasket = document.querySelector('.search-results')
    // новый список для продуктов
    const ulEl = document.createElement('ul')


    cartToFavorites.forEach((cartId) => {
      products.forEach((product) => {
        if (Number(product.id) === Number(cartId)) {
          // создаём элементы
          const liEl = document.createElement('li');
          const titleElement = document.createElement('h3');
          const buttonDelete = document.createElement('button');
          const img = document.createElement('img');
          const a = document.createElement('a');
          // ссылка на выбранный продукт
          a.href = 'product.html';

          // именуем данные
          const idProduct = product.id;
          const nameProduct = product.title;
          const thumbnail = product.thumbnail;
        
          // заполняем данные элементов
          liEl.id = idProduct;
          img.src = thumbnail;
          titleElement.textContent = nameProduct;
          buttonDelete.textContent = 'Удалить из избранного';

          // добавляем классы
          a.classList.add('link-product');
          liEl.classList.add('product');
          ulEl.classList.add('full-products')

          // добавляем элементы в блок
          liEl.append(a);
          a.append(img);
          a.append(titleElement);
          liEl.append(buttonDelete);
          ulEl.append(liEl);

          // при клике на кнопку 'удалить из избранного' продукт удаляется
          buttonDelete.addEventListener('click', function(event) {
            removeFromCart(idProduct);
            // перезагрузка страницы
            location.reload();
          })
        }
      })
    }); 
    // добавить список ul  в див
    productsBasket.append(ulEl);
  })

  const clearFavorites = document.querySelector('#clear-favorites');

  clearFavorites.addEventListener('click', function(event) {
    cartToFavorites = [];
    localStorage.setItem('cartToFavorites', JSON.stringify(cartToFavorites));
    location.reload();
  })
});
