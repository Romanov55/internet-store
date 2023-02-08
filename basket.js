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
          const buttonPay = document.createElement('button');
          const buttonDelete = document.createElement('button');
          const img = document.createElement('img');
          const a = document.createElement('a');
          a.href = 'product.html';

          // создаём блок колличества заказанного с кнопками
          const quantityDiv = document.createElement('div');
          const quantityEl = document.createElement('input');
          // const buttonMinus = document.createElement('button');
          // const buttonPlus = document.createElement('button');

          quantityEl.classList.add('quanity');
          quantityEl.setAttribute('type', 'number');
          quantityEl.value = 1;
          quantityEl.classList.add('quanity-block');
          // buttonMinus.textContent = '-';
          // buttonMinus.classList.add('quanity-block')
          // buttonPlus.textContent = '+';
          // buttonPlus.classList.add('quanity-block')

          // добавляем кнопки и сумму в спеиальный див
          // quantityDiv.append(buttonMinus);
          // buttonMinus.classList.add('minus');
          quantityDiv.append(quantityEl);
          // quantityDiv.append(buttonPlus);
          // buttonPlus.classList.add('plus');

          // именуем данные
          const idProduct = product.id;
          const nameProduct = product.title;
          const priceProduct = product.price;
          const discountPercentage = product.discountPercentage;
          const thumbnail = product.thumbnail;
        
          // добавляем к блоку айди продукта
          liEl.id = idProduct;

          // заполняем название и цену
          elPrice.textContent = `${priceProduct} $ (-${discountPercentage}%)`;
          img.src = thumbnail

          liEl.append(a);
          a.classList.add('link-product');
          // добавляем элементы в блок
          a.append(img)
          titleElement.textContent = nameProduct;
          a.append(titleElement);
          a.append(elPrice);
          buttonPay.textContent = 'Оплатить';
          liEl.append(quantityDiv)
          liEl.append(buttonPay);
          buttonDelete.textContent = 'Удалить из корзины';
          liEl.append(buttonDelete);

          // добавляем общий класс  в каждому продукту
          liEl.classList.add('product');
          ulEl.append(liEl);
        }
        
      })
    }); 
    
    productsBasket.append(ulEl)

    // собираем продукты которые в корзине
    // const displayList = document.querySelectorAll('.product')

    // displayList.forEach((itemList) => {

    //   console.log(itemList)

    //   const quanityResult = document.querySelector('.quanity');
    //   const minusButton = document.querySelector('.minus')
    //   const plusButton = document.querySelector('.plus')

      // allBlock.addEventListener('change', function(event) {
      //   allBlock[0].addEventListener('click', function(e) {
      //     quanityResult[1].textContent = quanityResult[1].textContent - 1
      //   })
      // })

    // });

    })
});


// // Удаление товара из локального хранилища
// function removeFromCart(productId) {
//   let cart = [];

//   // Получаем текущую корзину из localStorage
//   if (localStorage.getItem('cart')) {
//     cart = JSON.parse(localStorage.getItem('cart'));
//   }

//   // Удаляем товар из корзины
//   cart = cart.filter(item => item.id !== productId);

//   // Обновляем корзину в localStorage
//   localStorage.setItem('cart', JSON.stringify(cart));
// }