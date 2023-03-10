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

// функция создания блока для главного списка
const getBlockLi = (list) => {
  // создание DOM элементов
  const liEl = document.createElement('li');
  const titleElement = document.createElement('h3');
  const divPrice = document.createElement('div');
  const hPrice = document.createElement('h2');
  const pLastPrice = document.createElement('p');
  const pElRating = document.createElement('p');
  const buttonElBasket = document.createElement('button');
  const buttonBasketReload = document.createElement('button');
  const buttonElFavorites = document.createElement('button');
  const buttonFavoritesReload = document.createElement('button');
  const img = document.createElement('img');
  const a = document.createElement('a');
  const divButton = document.createElement('div');

  // именуем данные
  const { id } = list;
  const { title } = list;
  const { price } = list;
  const { discountPercentage } = list;
  const { rating } = list;
  const { category } = list;
  const { thumbnail } = list;

  // добавляем текст в элементы
  hPrice.textContent = `${price} $`;
  pElRating.textContent = `Рейтинг: ${rating}`;
  titleElement.textContent = title;
  buttonElBasket.textContent = 'Добавить в корзину';
  buttonElFavorites.textContent = 'Добавить в избранное';
  buttonBasketReload.textContent = 'Перейти в корзину'
  buttonFavoritesReload.textContent = 'Перейти в избранное'
  // ссылка на выбранный продукт
  a.href = 'product.html';
  // основная картинка
  img.src = thumbnail;
  // прошлая цена
  const pastPrice = price + (discountPercentage * (price / 100));
  pLastPrice.textContent = `${Math.floor(pastPrice)} $`;

  // собираем элементы в блок
  liEl.append(a);
  a.append(img);
  a.append(titleElement);
  a.append(divPrice);
  divPrice.append(hPrice);
  divPrice.append(pLastPrice);
  a.append(pElRating);
  divButton.append(buttonElBasket);
  divButton.append(buttonBasketReload);
  divButton.append(buttonElFavorites);
  divButton.append(buttonFavoritesReload);
  liEl.append(divButton);

  // добавляем атрибуты
  liEl.id = id;
  liEl.classList.add('product');
  liEl.classList.add(category);
  a.classList.add('link-product');
  divPrice.classList.add('div-price');
  hPrice.classList.add('description-price');
  pLastPrice.classList.add('description-past-price');
  buttonElBasket.classList.add('button-green');
  buttonElFavorites.classList.add('button-green');
  divButton.classList.add('div-button');
  buttonBasketReload.classList.add('button-grey');
  buttonBasketReload.setAttribute('onclick', "document.location='/basket.html'");
  buttonFavoritesReload.classList.add('button-grey');
  buttonFavoritesReload.setAttribute('onclick', "document.location='/favorites.html'")


  // при клике на товар передаём в локальное хранилище айди этого товара
  a.addEventListener('click', () => {
    localStorage.setItem('productId', id);
    window.location.href = 'product.html';
  });

  // при клике на кнопку, айди отправляется в корзину
  buttonElBasket.addEventListener('click', () => {
    addToCart(id, 'cartToBasket');
    buttonElBasket.style.display = 'none'
    buttonBasketReload.style.display = 'block'
  });

  // при клике на кнопку, айди отправляется в избранное
  buttonElFavorites.addEventListener('click', () => {
    addToCart(id, 'cartToFavorites');
    buttonElFavorites.style.display = 'none'
    buttonFavoritesReload.style.display = 'block'
  });

  buttonBasketReload.addEventListener('click', () => {
    buttonElBasket.style.display = 'block'
    buttonBasketReload.style.display = 'none'
  });

  // при клике на кнопку, айди отправляется в избранное
  buttonFavoritesReload.addEventListener('click', () => {
    buttonElFavorites.style.display = 'block'
    buttonFavoritesReload.style.display = 'none'
  });

  // отправляем готовый блок
  return liEl;
};

// достаём данные из ссылки
fetch('https://dummyjson.com/products')
  .then((response) => response.json())

  // распаковать папку продукты
  .then((article) => article.products)

  .then((products) => {
    // список полученных продуктов
    const listProducts = document.querySelector('.search-results');

    // создаём список с классом все продукты
    const ulEl = document.createElement('ul');
    ulEl.classList.add('full-products');

    // добавляем блоки в список продуктов
    products.forEach((product) => {
      ulEl.append(getBlockLi(product));
    });
    // добавляем список в див
    listProducts.append(ulEl);

    // достаём все чекбоксы
    const checkboxes = document.querySelectorAll('.checkbox');

    // пустой массив для активных чекбоксов
    let checkedCategories = [];
    // добавляем активные чекбоксы в массив
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          checkedCategories.push(e.target.value);
        } else {
          checkedCategories = checkedCategories.filter(
            (category) => category !== e.target.value,
          );
        }
        // фильтруем полученную базу по категориям
        const filteredProducts = products.filter((product) => checkedCategories.includes(getBlockLi(product).className.split(' ')[1]));
        // новый список для фильтрованного блока
        const ulFilter = document.createElement('ul');
        ulFilter.classList.add('full-products');
        // опустошаем список товаров
        listProducts.innerHTML = '';
        // добавляем отфильтрованные блоки в список
        filteredProducts.forEach((product) => {
          ulFilter.append(getBlockLi(product));
        });
        // добавляем в див готовый список
        listProducts.append(ulFilter);

        // если нет активных чекбоксов выводим исходный список
        if (checkedCategories.length === 0) {
          const ulEmpty = document.createElement('ul');
          ulEmpty.classList.add('full-products');
          // опустошаем список товаров
          listProducts.innerHTML = '';
          // добавляем блоки в список
          products.forEach((product) => {
            ulEmpty.append(getBlockLi(product));
          });
          // добавляем в див готовый список
          listProducts.append(ulEmpty);
        }

        // собираем все радио точки
        const radioChecks = document.querySelectorAll('.radio-check');

        // перебираем точки при клике на чекбокс, отслеживая активный
        radioChecks.forEach((oneRadio) => {
          // список отображаемых продуктов
          const displayList = document.querySelectorAll('.product');
          // массив для айди товаров отображаемых на странице
          const allIdForDisplay = [];
          displayList.forEach((product) => {
            allIdForDisplay.push(product.id);
          });
          // если кнопка включена и совпадаем с айди 'дешевле' сортируем по возрастанию цены
          if (oneRadio.checked && oneRadio.id === 'cheaper') {
            // новый список
            const ulSort = document.createElement('ul');
            ulSort.classList.add('full-products');
            // опустошаем список товаров
            listProducts.innerHTML = '';
            // создаём массив для отображаемый товаров сейчас
            const listSort = [];
            // перебираем список отображаемых айди и списка продуктов из базы
            allIdForDisplay.forEach((id) => {
              products.forEach((product) => {
                // если айди продукта на странице совпадает с айди товара в базе
                if (Number(id) === Number(product.id)) {
                  listSort.push(product);
                  // добавляем в массив отображаемые товары
                  listSort.sort((a, b) => a.price - b.price);
                }
              });
            });
            // добавляем сортированные блоки в список
            listSort.forEach((itemSort) => {
              ulSort.append(getBlockLi(itemSort));
            });
            // добавляем в див готовый список
            listProducts.append(ulSort);
            // если включена кнопка дороже, сортируем по убыванию цены
          } else if (oneRadio.checked && oneRadio.id === 'expensive') {
            const ulSort = document.createElement('ul');
            ulSort.classList.add('full-products');
            // опустошаем список товаров
            listProducts.innerHTML = '';
            // создаём массив для отображаемый товаров сейчас
            const listSort = [];
            // перебираем список отображаемых айди и списка продуктов из базы
            allIdForDisplay.forEach((id) => {
              products.forEach((product) => {
                // если айди продукта на странице совпадает с айди товара в базе
                if (Number(id) === Number(product.id)) {
                  listSort.push(product);
                  // добавляем в массив отображаемые товары
                  listSort.sort((a, b) => b.price - a.price);
                }
              });
            });
            // добавляем в ul отсортированный блок
            listSort.forEach((itemSort) => {
              ulSort.append(getBlockLi(itemSort));
            });
            // добавляем сортированный список в див
            listProducts.append(ulSort);
          }
        });
      });
    });

    // достаём элементы формы
    const searchForm = document.querySelector('.search');
    const searchInput = document.querySelector('input#search-input');

    // функция поиска по вводу
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // вытаскиваем вводимое значение
      const searchTerm = searchInput.value.toLowerCase();

      // фильтруем список товаров по вводимому значению
      const searchedProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm));

      // новый список для найденный блоков
      const ulSearch = document.createElement('ul');
      ulSearch.classList.add('full-products');
      // опустошаем список товаров
      listProducts.innerHTML = '';
      // найденные блоки добавляем в список
      searchedProducts.forEach((searchedProduct) => {
        ulSearch.append(getBlockLi(searchedProduct));
        // добавляем в див готовый список
        listProducts.append(ulSearch);
      });
    });

    // список радио кнопок
    const radioChecks = document.querySelectorAll('.radio-check');
    // перебираем точки при клике
    radioChecks.forEach((oneRadio) => {
      oneRadio.addEventListener('change', () => {
        // список отображаемых продуктов
        const displayList = document.querySelectorAll('.product');
        // массив для айди товаров отображаемых на странице
        const allIdForDisplay = [];
        displayList.forEach((product) => {
          allIdForDisplay.push(product.id);
        });
        // если кнопка включена и совпадаем с айди - дешевле
        if (oneRadio.checked && oneRadio.id === 'cheaper') {
          const ulSort = document.createElement('ul');
          ulSort.classList.add('full-products');
          // опустошаем список товаров
          listProducts.innerHTML = '';
          // создаём массив для отображаемый товаров сейчас
          const listSort = [];
          // перебираем список отображаемых айди и списка продуктов из базы
          allIdForDisplay.forEach((id) => {
            products.forEach((product) => {
              // если совпадает айди в базе добавляем в массив эти товары
              if (Number(id) === Number(product.id)) {
                listSort.push(product);
                // сортируем блоки по цене
                listSort.sort((a, b) => a.price - b.price);
              }
            });
          });
          // добавляем сортированные блоки в список
          listSort.forEach((itemSort) => {
            ulSort.append(getBlockLi(itemSort));
          });
          // добавляем в див готовый список
          listProducts.append(ulSort);
        } else if (oneRadio.checked && oneRadio.id === 'expensive') {
          const ulSort = document.createElement('ul');
          ulSort.classList.add('full-products');
          // опустошаем список товаров
          listProducts.innerHTML = '';
          // создаём массив для отображаемый товаров сейчас
          const listSort = [];
          // перебираем список отображаемых айди и списка продуктов из базы
          allIdForDisplay.forEach((id) => {
            products.forEach((product) => {
              // если айди продукта на странице совпадает с айди товара в базе
              if (Number(id) === Number(product.id)) {
                listSort.push(product);
                // сортируем блоки по цене
                listSort.sort((a, b) => b.price - a.price);
              }
            });
          });
          // добавляем сортированные блоки в список
          listSort.forEach((itemSort) => {
            ulSort.append(getBlockLi(itemSort));
          });
          // добавляем в див готовый список
          listProducts.append(ulSort);
          // если включена кнопка - отсутсивует
        } else if (oneRadio.checked && oneRadio.id === 'empty') {
          // создаём список
          const ulSort = document.createElement('ul');
          ulSort.classList.add('full-products');
          // опустошаем список товаров
          listProducts.innerHTML = '';
          // создаём массив для отображаемый товаров сейчас
          const listSort = [];
          // перебираем список отображаемых айди и списка продуктов из базы
          allIdForDisplay.forEach((id) => {
            products.forEach((product) => {
              // если айди продукта на странице совпадает с айди товара в базе
              if (Number(id) === Number(product.id)) {
                listSort.push(product);
                // сортируем по айди
                listSort.sort((a, b) => a.id - b.id);
              }
            });
          });
          // добавляем сортированные блоки в список
          listSort.forEach((itemSort) => {
            ulSort.append(getBlockLi(itemSort));
          });
          // добавляем в див готовый список
          listProducts.append(ulSort);
        }
      });
    });
  });
