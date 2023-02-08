// функция добавления элемента в локальное хранилище
function addToCart(product, cart) {
  let listCart = [];
  // Получаем текущую корзину из localStorage
  if (localStorage.getItem(cart)) {
    listCart = JSON.parse(localStorage.getItem(cart));
  }
  // Добавляем новый товар в корзину
  if (!listCart.includes(product)) {
    listCart.push(product);
  }
  // Обновляем корзину в localStorage
  localStorage.setItem(cart, JSON.stringify(listCart));
}

// достаём переданный айди
window.addEventListener('load', () => {
  const receivedId = localStorage.getItem('productId');

  fetch('https://dummyjson.com/products')
    .then((response) => response.json())

  // распаковать папку продукты
    .then((article) => article.products)

    .then((products) => {
      const titleProduct = document.querySelector('.product-title');

      products.forEach((product) => {
        const allImages = document.querySelectorAll('.swiper-slide');
        const productDescrip = document.querySelector('#description-prod');
        const descriptionRating = document.querySelector('#description-rating');
        const descriptionBrand = document.querySelector('#description-brand');
        const descriptionPrice = document.querySelector('#description-price');
        const descriptionPastPrice = document.querySelector('#description-past-price');
        const descriptionStock = document.querySelector('#description-stock');
        const buttonElBasket = document.querySelector('.buttonElBasket');
        const buttonElFavorite = document.querySelector('.buttonElFavorite');

        const { id } = product;
        const { title } = product;
        const { description } = product;
        const { price } = product;
        const { discountPercentage } = product;
        const { rating } = product;
        const { stock } = product;
        const { brand } = product;
        // прошлая цена
        const pastPrice = price + (discountPercentage * (price / 100));

        // если айди продукта совпадает с переданным номером из списка
        if (Number(receivedId) === Number(product.id)) {
          titleProduct.innerHTML = title;
          // вставляем ссылки картинок в img
          for (let i = 0; i < allImages.length; i += 1) {
            allImages[i].src = product.images[i];
          }
          productDescrip.innerHTML = description;
          descriptionRating.innerHTML = `Рейтинг: ${rating}`;
          descriptionBrand.innerHTML = `Брэнд: ${brand}`;
          descriptionPrice.innerHTML = `${price} $`;
          descriptionPastPrice.innerHTML = `${pastPrice} $`;
          descriptionStock.innerHTML = `Остаток: ${stock}`;

          // при клике на кнопку, айди отправляется в корзину
          buttonElBasket.addEventListener('click', () => {
            addToCart(id, 'cartToBasket');
          });

          // при клике на кнопку, айди отправляется в избранное
          buttonElFavorite.addEventListener('click', () => {
            addToCart(id, 'cartToFavorites');
          });
        }
      });
    });
});
