const listProducts = document.querySelector('.search-results');

// функция создания блока для главного списка
const getBlockLi = (list) => {
  // создание DOM элементов
  const liEl = document.createElement('li');
  const titleElement = document.createElement('h3');
  const pElPrice = document.createElement('p');
  const pElRating = document.createElement('p');
  const buttonElBasket = document.createElement('button');
  const buttonElFavorites = document.createElement('button');
  const img = document.createElement('img')

  // именуем данные
  const nameProduct = list.title;
  const price = list.price;
  const discountPercentage = list.discountPercentage;
  const rating = list.rating;
  const category = list.category;
  const thumbnail = list.thumbnail;

  // заполняем название и цену
  pElPrice.textContent = `${price} (-${discountPercentage}%)`;
  pElRating.textContent = `Rating: ${rating}`;
  img.src = thumbnail

  // добавляем элементы в блок
  liEl.append(img)
  titleElement.textContent = nameProduct;
  liEl.append(titleElement);
  liEl.append(pElPrice);
  liEl.append(pElRating);
  buttonElBasket.textContent = 'Добавить в корзину';
  liEl.append(buttonElBasket);
  buttonElFavorites.textContent = 'Добавить в избранное';
  liEl.append(buttonElFavorites);

  // добавляем класс к блоку по категории
  liEl.classList.add(category)
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
    // создаём список с классом все продукты
    const ulEl = document.createElement('ul')
    ulEl.classList.add('full-products')
    // добавляем блоки в список продуктов
    products.forEach((product) => {
      ulEl.append(getBlockLi(product));
    })
    // добавляем список в див
    listProducts.append(ulEl);

  
    const checkboxes = document.querySelectorAll('.checkbox');

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
        // фильтруем базу по категориям
        const filteredProducts = products.filter(product =>
          checkedCategories.includes(getBlockLi(product).className)
        );
        // новый фильтрованый список
        const ulFilter = document.createElement('ul')
        // опустошаем список товаров
        listProducts.innerHTML = "";
        // добавляем отфильтрованные блоки в список
        filteredProducts.forEach(product => {
          ulFilter.append(getBlockLi(product))
        });
        // добавляем в див готовый список
        listProducts.append(ulFilter);
      });
    });
    // обходим чекбоксы, если нет активных выводим список
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", e => {
        checkbox.addEventListener("change", e => {
          if (checkedCategories.length === 0) {
            const ulEmpty = document.createElement('ul')
              // опустошаем список товаров
              listProducts.innerHTML = "";
              // добавляем отфильтрованные блоки в список
              products.forEach(product => {
                ulEmpty.append(getBlockLi(product));
              });
              // добавляем в див готовый список
              listProducts.append(ulEmpty);
          }
        })
      })
    })

    // называем элементы формы
    let searchForm = document.querySelector('.search');
    let searchInput = document.querySelector('input#search-input');
    
    // функция поиска по вводу Enter
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // вытаскиваем вводимое значени
        const searchTerm = searchInput.value;

        // фильтруем список товаров по вводимому значению
        let searchedProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

          const ulSearch = document.createElement('ul')
          // опустошаем список товаров
          listProducts.innerHTML = "";
        searchedProducts.forEach((searchedProduct) => {
          ulSearch.append(getBlockLi(searchedProduct))
          
          // добавляем в див готовый список
          listProducts.append(ulSearch);
      })
    });

  })
