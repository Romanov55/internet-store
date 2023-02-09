// Удаление товара из локального хранилища
function removeFromCart(idProduct) {
  let cartToBasket = [];
  // Получаем текущую корзину из localStorage
  if (localStorage.getItem('cartToBasket')) {
    cartToBasket = JSON.parse(localStorage.getItem('cartToBasket'));
  }
  // Удаляем товар из корзины
  cartToBasket = cartToBasket.filter((item) => Number(item) !== Number(idProduct));

  // Обновляем корзину в localStorage
  localStorage.setItem('cartToBasket', JSON.stringify(cartToBasket));
}

// достаём переданный айди
window.addEventListener('load', () => {
  let cartToBasket = JSON.parse(localStorage.getItem('cartToBasket'));

  fetch('https://dummyjson.com/products')
    .then((response) => response.json())

  // распаковать папку продукты
    .then((article) => article.products)

    .then((products) => {
    // получаем див для списка
      const productsBasket = document.querySelector('.search-results');
      // создаём новый список
      const ulEl = document.createElement('ul');
      // если айди продукта и переданный айди совпадают, создаём блоки для отображения

      cartToBasket.forEach((cartId) => {
        products.forEach((product) => {
          if (Number(product.id) === Number(cartId)) {
          // создаём элементы
            const liEl = document.createElement('li');
            const titleElement = document.createElement('h3');
            const elPrice = document.createElement('h2');
            const buttonDelete = document.createElement('button');
            const img = document.createElement('img');
            const a = document.createElement('a');
            const quantityDiv = document.createElement('div');
            const quantityEl = document.createElement('input');

            // именуем данные
            const { id } = product;
            const { title } = product;
            const { price } = product;
            const { thumbnail } = product;

            // заполняем контент элементов
            elPrice.textContent = `${price} $`;
            titleElement.textContent = title;
            img.src = thumbnail;
            buttonDelete.textContent = 'Удалить из корзины';
            a.href = 'product.html';

            // собираем элементы в список
            quantityDiv.append(quantityEl);
            liEl.append(a);
            a.append(img);
            a.append(titleElement);
            a.append(elPrice);
            liEl.append(quantityDiv);
            liEl.append(buttonDelete);
            ulEl.append(liEl);

            // добавляем атрибуты
            liEl.id = id;
            elPrice.classList.add('price');
            a.classList.add('link-product');
            liEl.classList.add('product');
            ulEl.classList.add('full-products');
            buttonDelete.classList.add('button-red');
            elPrice.classList.add('description-price');
            quantityEl.classList.add('quanity');
            quantityEl.setAttribute('type', 'number');
            quantityEl.setAttribute('min', '1');
            quantityEl.value = 1;

            // при клике на кнопку удалить продукт из списка
            buttonDelete.addEventListener('click', () => {
              removeFromCart(id);
              location.reload();
            });
          }
        });
      });
      // добавить список ul  в див
      productsBasket.append(ulEl);

      // собираем данные о колличестве товара в корзине
      const displayQuaniti = document.querySelectorAll('.quanity');
      const displayPrice = document.querySelectorAll('.price');
      const totalPrice = document.querySelector('.total-price');
      let totalPriceAnswer = 0;

      for (let i = 0; i < displayPrice.length; i += 1) {
        const price = displayPrice[i].textContent.split(' ')[0];
        const quanity = displayQuaniti[i].value;
        totalPriceAnswer += Number(price * quanity);
      }

      // при изменении колличества товаров на странице пересчитать цену на товары
      displayQuaniti.forEach((item) => {
        item.addEventListener('change', () => {
          totalPriceAnswer = 0;
          for (let i = 0; i < displayPrice.length; i += 1) {
            const price = displayPrice[i].textContent.split(' ')[0];
            const quanity = displayQuaniti[i].value;
            totalPriceAnswer += Number(price * quanity);
          }
          totalPrice.textContent = `К оплате: ${totalPriceAnswer} $`;
        });
      });
      totalPrice.textContent = `К оплате: ${totalPriceAnswer} $`;
    });

  // кнопка очистки
  const clearBasket = document.querySelector('#clear-basket');

  // при клике на кнопку очистить корзину
  clearBasket.addEventListener('click', () => {
    cartToBasket = [];
    localStorage.setItem('cartToBasket', JSON.stringify(cartToBasket));
    location.reload();
  });
});
