// Находим корзину и счётчик расположенные на ней
const cart = document.querySelector("[data-cart]");
const counter = cart.querySelector("[data-counter]");

// Находим кнопки добавления товара в корзину
const btnsAddToCart = document.querySelectorAll("[data-addToCart]");

//  Находим корзину и div, в который добавляем товары
const productCart = document.querySelector(".cart");
const cartWrapper = document.querySelector(".cart-wrapper");

// Показываем/скрываем контейнер с товарами при клике на козину
cart.onclick = function () {
  productCart.classList.toggle("none");
};

// При нажатии на кнопку добаления товара добавляем этот товар в cartWrapper
btnsAddToCart.forEach(
  (btn) =>
    (btn.onclick = function (e) {
      // Определяем текущую карточку товара
      const product = btn.closest(".tabs__slider-slide");

      let productCounter = 1;
      // Собираем данные товара из карточки
      const productInfo = {
        id: btn.dataset.addtocart,
        imgSrc: product.querySelector(".tabs__slider-img").getAttribute("src"),
        title: product.querySelector(".tabs__slider-description").innerText,
        price: product.querySelector(".tabs__slider-price").innerText,
        counter: productCounter,
      };

      //  Проверка есть ли уже товар в корзине
      const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

      if (itemInCart) {
        const prodQuantity = itemInCart.querySelector(".product-cart__quantity");
        const prodPrice = itemInCart.querySelector(".product-cart__total-price");

        prodQuantity.innerHTML = parseInt(prodQuantity.innerHTML) + productInfo.counter;
        prodPrice.innerHTML = "$" + productInfo.price.split("$")[1] * prodQuantity.innerHTML + ".00";
      } else {
        // Собранные данные подставляем в шаблон
        const cardItemHTML = `
              <div class="cart-product product-cart" data-id=${productInfo.id}>
                <div class="product-cart__description">
                  <img class="product-cart__image" src=${productInfo.imgSrc} />
                  <p class="product-cart__name">${productInfo.title}</p>
                  <button class="product-cart__remove" data-remove=${productInfo.id}>X</button>
                </div>
                <div class="product-cart__amount">
                  <p class="product-cart__current-price">Per one: ${productInfo.price}</p>
                  <span>Quantity:</span>
                  <p class="product-cart__quantity"> ${productInfo.counter}</p>
                  <span>Price: </span>
                  <p class="product-cart__total-price"> ${productInfo.price}</p>
                </div>
              </div>
            `;

        cartWrapper.insertAdjacentHTML("afterbegin", cardItemHTML);
      }

      // Считаем количество товаров в корзине
      counterProducts();

      // Считаем общую стоимость товаров в корзине
      totalPrice();
      // Удаление товаров из корзины
      removeProduct();
    })
);

// Функция для расчета общей стоимости товаров в корзине
function totalPrice() {
  let total = 0;
  const childrensCartWrapper = cartWrapper.children;

  if (childrensCartWrapper.length > 0) {
    const productsArr = Array.from(childrensCartWrapper);

    total = productsArr.reduce((acc, item) => {
      const priceItem = item.querySelector(".product-cart__total-price");
      const priceOfProduct = Number(priceItem.innerHTML.split("$")[1]);

      acc += priceOfProduct;
      return acc;
    }, 0);
  }

  const cartTotal = document.querySelector(".cart-total");
  return (cartTotal.innerHTML = `Total price: $${total}.00`);
}

// Функция для удаления товаров из корзины
function removeProduct() {
  const removeProduct = document.querySelectorAll("[data-remove]");

  removeProduct.forEach((item) => {
    item.onclick = function () {
      const product = item.closest(".cart-product");

      if (item.dataset.remove === product.dataset.id) {
        product.remove();
        totalPrice();
        counterProducts();
      }
    };
  });
}

//  Функция для расчёта количества товаров в корзине
function counterProducts() {
  let total = 0;
  const childrensCartWrapper = cartWrapper.children;

  if (childrensCartWrapper.length > 0) {
    const productsArr = Array.from(childrensCartWrapper);

    total = productsArr.reduce((acc, item) => {
      const countItem = item.querySelector(".product-cart__quantity");

      acc += parseInt(countItem.innerHTML);
      return acc;
    }, 0);
  }

  return (counter.innerHTML = total);
}
