// Удаление товара из локального хранилища
function removeFromCart(idProduct) {
  let cartToFavorites = [];
  // Получаем текущую корзину из localStorage
  if (localStorage.getItem('cartToFavorites')) {
    cartToFavorites = JSON.parse(localStorage.getItem('cartToFavorites'));
  }
  // Удаляем товар из корзины
  cartToFavorites = cartToFavorites.filter((item) => Number(item) !== Number(idProduct));

  // Обновляем корзину в localStorage
  localStorage.setItem('cartToFavorites', JSON.stringify(cartToFavorites));
}

// достаём переданный айди
window.addEventListener('load', () => {
  let cartToFavorites = JSON.parse(localStorage.getItem('cartToFavorites'));

  fetch('https://dummyjson.com/products')
    .then((response) => response.json())

  // распаковать папку продукты
    .then((article) => article.products)

    .then((products) => {
    // див со списком продуктов
      const productsBasket = document.querySelector('.search-results');
      // новый список для продуктов
      const ulEl = document.createElement('ul');

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
            const { id } = product;
            const { title } = product;
            const { thumbnail } = product;

            // заполняем данные элементов
            liEl.id = id;
            img.src = thumbnail;
            titleElement.textContent = title;
            buttonDelete.textContent = 'Удалить из избранного';

            // добавляем классы
            a.classList.add('link-product');
            liEl.classList.add('product');
            ulEl.classList.add('full-products');

            // добавляем элементы в блок
            liEl.append(a);
            a.append(img);
            a.append(titleElement);
            liEl.append(buttonDelete);
            ulEl.append(liEl);

            // при клике на кнопку 'удалить из избранного' продукт удаляется
            buttonDelete.addEventListener('click', () => {
              removeFromCart(id);
              // перезагрузка страницы
              location.reload();
            });
          }
        });
      });
      // добавить список ul  в див
      productsBasket.append(ulEl);
    });

  const clearFavorites = document.querySelector('#clear-favorites');

  clearFavorites.addEventListener('click', () => {
    cartToFavorites = [];
    localStorage.setItem('cartToFavorites', JSON.stringify(cartToFavorites));
    location.reload();
  });
});
