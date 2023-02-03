const listProducts = document.querySelector('.search-results');

const elLi = (list) => {
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
    const stock = list.stock;
    const brand = list.brand;
    const category = list.category;
    const thumbnail = list.thumbnail;
    const images = list.images;

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

    // добавляем общий класс
    // liEl.classList.add('product')
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
    const liUl = document.createElement('ul')
    liUl.classList.add('full-products')
    // добавляем блоки в список продуктов
    products.forEach((product) => {
      liUl.append(elLi(product));
    })
    // добавляем список в див
    listProducts.append(liUl);

  
    const checkboxes = document.querySelectorAll('.checkbox');

    let checkedCategories = [];

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", e => {
        if (e.target.checked) {
          checkedCategories.push(e.target.value);
        } else {
          checkedCategories = checkedCategories.filter(
            category => category !== e.target.value
          );
        }
        
        const filteredProducts = products.filter(product =>
          checkedCategories.includes(elLi(product).className)
        );

        const liUlFilter = document.createElement('ul')
        listProducts.innerHTML = "";
        filteredProducts.forEach(product => {
          liUlFilter.append(elLi(product))
        });
        listProducts.append(liUlFilter);
      });
    });

    // checkboxes.forEach(checkbox => {
    //   checkbox.addEventListener("change", e => {
    //     if (!e.target.checked) {
    //       const liUlFilter = document.createElement('ul')
    //       listProducts.innerHTML = "";
    //       products.forEach(product => {
    //         liUlFilter.append(elLi(product))
    //       });
    //       listProducts.append(liUlFilter)
    //     }

        
    //   });
    // });
  })
