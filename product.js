// достаём переданный айди
window.addEventListener("load", function() {
  const productId = localStorage.getItem("productId");

 fetch('https://dummyjson.com/products')
  .then((response) => {
    return response.json();
   })

  // распаковать папку продукты
  .then((article) => {
    return article.products;
  })

  .then((products) => {
    const title = document.querySelector('.product-title')

    products.forEach((product) => {
      const allImages = document.querySelectorAll('.swiper-slide');
      const productDescrip = document.querySelector('#description-prod');
      const descriptionRating = document.querySelector('#description-rating');
      const descriptionBrand = document.querySelector('#description-brand');
      const descriptionPrice = document.querySelector('#description-price');
      const descriptionPastPrice = document.querySelector('#description-past-price');
      const descriptionStock = document.querySelector('#description-stock')
      
      const name = product.title;
      const description = product.description;
      const price = product.price;
      const discountPercentage = product.discountPercentage;
      const rating = product.rating;
      const stock = product.stock;
      const brand = product.brand;
      // прошлая цена
      const pastPrice = price + (discountPercentage * (price / 100))

      // если айди продукта совпадает с переданным номером из списка
      if (Number(productId) === Number(product.id)) {
        title.innerHTML = name;
      // вставляем ссылки картинок в img
        for (let i = 0; i < allImages.length; i += 1) {
          allImages[i].src = product.images[i]
        }
        productDescrip.innerHTML = description;
        descriptionRating.innerHTML = `Рейтинг: ${rating}`;
        descriptionBrand.innerHTML = `Брэнд: ${brand}`;
        descriptionPrice.innerHTML = `${price} $`;
        descriptionPastPrice.innerHTML = `${pastPrice} $`;
        descriptionStock.innerHTML = `Остаток: ${stock}`;
      }
    })
    
  })
});