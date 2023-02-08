// функция добавления элемента в локальное хранилище
function addToCart(product, cartToBasket) {
  cartToBasket = [];
  // Получаем текущую корзину из localStorage
  if (localStorage.getItem('cartToBasket')) {
    cartToBasket = JSON.parse(localStorage.getItem('cartToBasket'));
  }
  // Добавляем новый товар в корзину
  if  (!cartToBasket.includes(product)) {
    cartToBasket.push(product)
  }
  // Обновляем корзину в localStorage
  localStorage.setItem('cartToBasket', JSON.stringify(cartToBasket));
}

// функция создания блока для главного списка
const getBlockLi = (list) => {
  // создание DOM элементов
  const liEl = document.createElement('li');
  const titleElement = document.createElement('h3');
  const pElPrice = document.createElement('p');
  const pElRating = document.createElement('p');
  const buttonElBasket = document.createElement('button');
  const buttonElFavorites = document.createElement('button');
  const img = document.createElement('img');
  const a = document.createElement('a');

  // именуем данные
  const idProduct = list.id;
  const nameProduct = list.title;
  const price = list.price;
  const discountPercentage = list.discountPercentage;
  const rating = list.rating;
  const category = list.category;
  const thumbnail = list.thumbnail;

  // добавляем текст в элементы
  pElPrice.textContent = `${price} $ (-${discountPercentage}%)`;
  pElRating.textContent = `Rating: ${rating}`;
  titleElement.textContent = nameProduct;
  buttonElBasket.textContent = 'Добавить в корзину';
  buttonElFavorites.textContent = 'Добавить в избранное';
  // адрес ссылки
  a.href = 'product.html';
  // основная картинка
  img.src = thumbnail
  
  // собираем элементы в блок
  liEl.append(a);
  a.append(img)
  a.append(titleElement);
  a.append(pElPrice);
  a.append(pElRating);
  liEl.append(buttonElBasket);
  liEl.append(buttonElFavorites);

  // добавляем атрибуты
  liEl.id = idProduct;
  liEl.classList.add('product');
  liEl.classList.add(category);
  a.classList.add('link-product');
  
  // при клике на товар передаём в локальное хранилище айди этого товара
  a.addEventListener("click", function(event) {
    localStorage.setItem("productId", idProduct);
    window.location.href = "product.html";
  });

  // при клике на кнопку, айди отправляется в корзину
  buttonElBasket.addEventListener('click', function(event) {
    addToCart(idProduct, 'cartToBasket');
  });

  // при клике на кнопку, айди отправляется в избранное
  buttonElFavorites.addEventListener('click', function(event) {
    addToCart(idProduct, 'productIdFavorites');
  });

  // отправляем готовый блок
  return liEl
}

// достаём данные из ссылки
fetch('https://dummyjson.com/products')
  .then((response) => {
    return response.json();
   })

  // распаковать папку продукты
  .then((article) => {
    return article.products;
  })

  .then((products) => {
    // список полученных продуктов
    const listProducts = document.querySelector('.search-results');

    // создаём список с классом все продукты
    const ulEl = document.createElement('ul');
    ulEl.classList.add('full-products');

    // добавляем блоки в список продуктов
    products.forEach((product) => {
      ulEl.append(getBlockLi(product));
    })
    // добавляем список в див
    listProducts.append(ulEl);
    
    // достаём все чекбоксы
    const checkboxes = document.querySelectorAll('.checkbox');

    // пустой массив для активных чекбоксов
    let checkedCategories = [];
    // добавляем активные чекбоксы в массив
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", e => {
        if (e.target.checked) {
          checkedCategories.push(e.target.value);
        } else {
          checkedCategories = checkedCategories.filter(
            category => category !== e.target.value
          );
        }
        // фильтруем полученную базу по категориям
        const filteredProducts = products.filter(product =>
          checkedCategories.includes(getBlockLi(product).className.split(' ')[1])
        );
        // новый список для фильтрованного блока
        const ulFilter = document.createElement('ul')
        ulFilter.classList.add('full-products')
        // опустошаем список товаров
        listProducts.innerHTML = "";
        // добавляем отфильтрованные блоки в список
        filteredProducts.forEach(product => {
          ulFilter.append(getBlockLi(product))
        });
        // добавляем в див готовый список
        listProducts.append(ulFilter);

        //если нет активных чекбоксов выводим исходный список
        if (checkedCategories.length === 0) {
          const ulEmpty = document.createElement('ul')
          ulEmpty.classList.add('full-products')
          // опустошаем список товаров
          listProducts.innerHTML = "";
          // добавляем блоки в список
          products.forEach(product => {
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
            allIdForDisplay.push(product.id)
          })
          // если кнопка включена и совпадаем с айди 'дешевле' сортируем по возрастанию цены
          if (oneRadio.checked && oneRadio.id === 'cheaper') {
            // новый список
            const ulSort = document.createElement('ul')
            ulSort.classList.add('full-products')
            // опустошаем список товаров
            listProducts.innerHTML = "";
            // создаём массив для отображаемый товаров сейчас
            let listSort = [];
            // перебираем список отображаемых айди и списка продуктов из базы
            allIdForDisplay.forEach((id) => {
              products.forEach(product => {
                // если айди продукта на странице совпадает с айди товара в базе 
                if (Number(id) === Number(product.id)) {
                  listSort.push(product)
                  // добавляем в массив отображаемые товары
                  listSort.sort((a, b) => a.price - b.price);
                }
              })
            })
            // добавляем сортированные блоки в список
            listSort.forEach((itemSort) => {
              ulSort.append(getBlockLi(itemSort));
            })
            // добавляем в див готовый список
            listProducts.append(ulSort);
            // если включена кнопка дороже, сортируем по убыванию цены
          } else if (oneRadio.checked && oneRadio.id === 'expensive') {
              const ulSort = document.createElement('ul');
              ulSort.classList.add('full-products');
              // опустошаем список товаров
              listProducts.innerHTML = "";
              // создаём массив для отображаемый товаров сейчас
              let listSort = [];
              // перебираем список отображаемых айди и списка продуктов из базы
              allIdForDisplay.forEach((id) => {
                products.forEach(product => {
                  // если айди продукта на странице совпадает с айди товара в базе 
                  if (Number(id) === Number(product.id)) {
                    listSort.push(product)
                    // добавляем в массив отображаемые товары
                    listSort.sort((a, b) => b.price - a.price);
                  }
                })
              })
              // добавляем в ul отсортированный блок
              listSort.forEach((itemSort) => {
                ulSort.append(getBlockLi(itemSort));
              })
              // добавляем сортированный список в див
              listProducts.append(ulSort);
            }
          })
      });
    });

    // достаём элементы формы
    let searchForm = document.querySelector('.search');
    let searchInput = document.querySelector('input#search-input');
    
    // функция поиска по вводу
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // вытаскиваем вводимое значение
        const searchTerm = searchInput.value;

        // фильтруем список товаров по вводимому значению
        let searchedProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

        // новый список для найденный блоков
          const ulSearch = document.createElement('ul');
          ulSearch.classList.add('full-products');
          // опустошаем список товаров
          listProducts.innerHTML = "";
        // найденные блоки добавляем в список
        searchedProducts.forEach((searchedProduct) => {
          ulSearch.append(getBlockLi(searchedProduct));
          // добавляем в див готовый список
          listProducts.append(ulSearch);
      })
    });

    // список радио кнопок
    const radioChecks = document.querySelectorAll('.radio-check');
      // перебираем точки при клике
      radioChecks.forEach((oneRadio) => {
        oneRadio.addEventListener('change', function(event) {
          // список отображаемых продуктов
          const displayList = document.querySelectorAll('.product');
          // массив для айди товаров отображаемых на странице
          const allIdForDisplay = [];
          displayList.forEach((product) => {
            allIdForDisplay.push(product.id)
          })
          // если кнопка включена и совпадаем с айди - дешевле
          if (oneRadio.checked && oneRadio.id === 'cheaper') {
            const ulSort = document.createElement('ul')
            ulSort.classList.add('full-products')
            // опустошаем список товаров
            listProducts.innerHTML = "";
            // создаём массив для отображаемый товаров сейчас
            let listSort = [];
            // перебираем список отображаемых айди и списка продуктов из базы
            allIdForDisplay.forEach((id) => {
              products.forEach(product => {
                // если айди продукта на странице совпадает с айди товара в базе добавляем в массив эти товары
                if (Number(id) === Number(product.id)) {
                  listSort.push(product)
                  // сортируем блоки по цене
                  listSort.sort((a, b) => a.price - b.price);
                }
              })
            })
            // добавляем сортированные блоки в список
            listSort.forEach((itemSort) => {
              ulSort.append(getBlockLi(itemSort));
            })
            // добавляем в див готовый список
            listProducts.append(ulSort);
          } else if (oneRadio.checked && oneRadio.id === 'expensive') {
              const ulSort = document.createElement('ul');
              ulSort.classList.add('full-products');
              // опустошаем список товаров
              listProducts.innerHTML = "";
              // создаём массив для отображаемый товаров сейчас
              let listSort = [];
              // перебираем список отображаемых айди и списка продуктов из базы
              allIdForDisplay.forEach((id) => {
                products.forEach(product => {
                  // если айди продукта на странице совпадает с айди товара в базе 
                  if (Number(id) === Number(product.id)) {
                    listSort.push(product)
                    // сортируем блоки по цене
                    listSort.sort((a, b) => b.price - a.price);
                  }
                })
              })
              // добавляем сортированные блоки в список
              listSort.forEach((itemSort) => {
                ulSort.append(getBlockLi(itemSort));
              })
              // добавляем в див готовый список
              listProducts.append(ulSort);
              // если включена кнопка - отсутсивует
            } else if (oneRadio.checked && oneRadio.id === 'empty') {
              // создаём список
              const ulSort = document.createElement('ul');
              ulSort.classList.add('full-products');
              // опустошаем список товаров
              listProducts.innerHTML = "";
              // создаём массив для отображаемый товаров сейчас
              let listSort = [];
              // перебираем список отображаемых айди и списка продуктов из базы
              allIdForDisplay.forEach((id) => {
                products.forEach(product => {
                  // если айди продукта на странице совпадает с айди товара в базе 
                  if (Number(id) === Number(product.id)) {
                    listSort.push(product)
                    // сортируем по айди
                    listSort.sort((a, b) => a.id - b.id)
                  }
                })
              })
              // добавляем сортированные блоки в список
              listSort.forEach((itemSort) => {
                ulSort.append(getBlockLi(itemSort));
              })
              // добавляем в див готовый список
              listProducts.append(ulSort);
            }
            
        })
      })
  })
