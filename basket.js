  // Удаление товара из локального хранилища
  function removeFromCart(idProduct) {
    let cartToBasket = [];
    // Получаем текущую корзину из localStorage
    if (localStorage.getItem('cartToBasket')) {
      cartToBasket = JSON.parse(localStorage.getItem('cartToBasket'));
    }
    // Удаляем товар из корзины
    cartToBasket = cartToBasket.filter(item => Number(item) !== Number(idProduct));
    console.log(cartToBasket)
    // Обновляем корзину в localStorage
    localStorage.setItem('cartToBasket', JSON.stringify(cartToBasket));
  }

// достаём переданный айди
window.addEventListener("load", function() {
  let cartToBasket = JSON.parse(localStorage.getItem("cartToBasket"));

   fetch('https://dummyjson.com/products')
  .then((response) => {
    return response.json();
   })

  // распаковать папку продукты
  .then((article) => {
    return article.products;
  })

  .then((products) => {
    const productsBasket = document.querySelector('.search-results')
    const ulEl = document.createElement('ul')
    cartToBasket.forEach((cartId) => {
      products.forEach((product) => {
        if (Number(product.id) === Number(cartId)) {
          const liEl = document.createElement('li');
          const titleElement = document.createElement('h3');
          const elPrice = document.createElement('p');
          const buttonDelete = document.createElement('button');
          const img = document.createElement('img');
          const a = document.createElement('a');
          a.href = 'product.html';

          // создаём блок колличества заказанного с кнопками
          const quantityDiv = document.createElement('div');
          const quantityEl = document.createElement('input');

          quantityEl.classList.add('quanity');
          quantityEl.setAttribute('type', 'number');
          quantityEl.setAttribute('min', '1')
          quantityEl.value = 1;
          
          // добавляем инпут колличества в спеиальный див
          quantityDiv.append(quantityEl);

          // именуем данные
          const idProduct = product.id;
          const nameProduct = product.title;
          const priceProduct = product.price;
          const thumbnail = product.thumbnail;
        
          // добавляем к блоку айди продукта
          liEl.id = idProduct;

          // заполняем название и цену
          elPrice.textContent = `${priceProduct} $`;
          elPrice.classList.add('price')
          img.src = thumbnail;

          liEl.append(a);
          a.classList.add('link-product');
          // добавляем элементы в блок
          a.append(img)
          titleElement.textContent = nameProduct;
          a.append(titleElement);
          a.append(elPrice);
          liEl.append(quantityDiv)
          buttonDelete.textContent = 'Удалить из корзины';
          liEl.append(buttonDelete);
          ulEl.append(liEl);

          // добавляем общий класс  в каждому продукту
          liEl.classList.add('product');
          ulEl.classList.add('full-products')

          buttonDelete.addEventListener('click', function(event) {
            removeFromCart(idProduct);
            location.reload();
          })
        }
      })
    }); 
    // добавить список ul  в див
    productsBasket.append(ulEl);

    // собираем данные о колличестве товара в корзине
    const displayQuaniti = document.querySelectorAll('.quanity')
    const displayPrice = document.querySelectorAll('.price')
    let totalPrice = document.querySelector('.total-price')
    let totalPriceAnswer = 0;

    for (let i = 0; i < displayPrice.length; i += 1) {
      const price = displayPrice[i].textContent.split(' ')[0];
      const quanity = displayQuaniti[i].value;
      totalPriceAnswer += Number(price * quanity);
    }

    displayQuaniti.forEach((item) => {
      item.addEventListener('change', function(event) {
        totalPriceAnswer = 0
        for (let i = 0; i < displayPrice.length; i += 1) {
          const price = displayPrice[i].textContent.split(' ')[0];
          const quanity = displayQuaniti[i].value;
          totalPriceAnswer += Number(price * quanity);
        }
        totalPrice.textContent = `К оплате: ${totalPriceAnswer} $`
      });
    });
    totalPrice.textContent = `К оплате: ${totalPriceAnswer} $`;
  })

  const clearBasket = document.querySelector('#clear-basket');

  clearBasket.addEventListener('click', function(event) {
    cartToBasket = [];
    localStorage.setItem('cartToBasket', JSON.stringify(cartToBasket));
    location.reload();
  })
});
