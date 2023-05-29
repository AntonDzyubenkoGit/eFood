/*================ Сокрытие/отображение поисковой строки в хедере ================*/
const label = document.querySelector("[data-label]");

label.onclick = function () {
  // Находим поисковую строку(инпут) при клике на лейбл
  const search = document.querySelector("[data-search]");

  // При наличии атрибута hidden убираем его, при отсутствии добавляем
  search.toggleAttribute("hidden");

  // Вешаем прослушку на инпут
  search.addEventListener("input", function () {
    let inputValue = this.value;

    //  Находим div, в который разместим результат поиска
    const searchLinks = document.querySelector(".header__search-link");

    // Отправляем запрос на сервер при вводе пяти символов
    if (inputValue.length === 5) {
      const requestData = fetch("https://jsonplaceholder.typicode.com/photos?albumId=1&_limit=5").then((response) => response.json());

      requestData.then((json) =>
        json.map((item) => {
          const requestItemHTML = `<a href="${item.url}" target="_blank">link on your request №${item.id}</a>`;
          searchLinks.insertAdjacentHTML("beforeend", requestItemHTML);
        })
      );
    } else if (inputValue.length > 5) {
      // Очищаем инпут и результат поиска при вводе более пяти символов
      searchLinks.innerHTML = " ";
      this.value = "";
    }
  });
};

/*================ BURGER-MENU ================*/
const iconMenu = document.querySelector("[data-menu]");

iconMenu.onclick = function () {
  const menuNav = document.querySelector("[data-nav]");

  // При клике на бургер добавляем/убираем класс у навигации и самого бургера
  iconMenu.classList.toggle("_active");
  menuNav.classList.toggle("_active");

  // Блокируем прокрутку страницы
  document.body.classList.toggle("_lock");
};

/*================ Перемещение кнопки 'Sign Up' во внуть бургера на экранах менее 480px ================*/
function moveBtn() {
  if (window.innerWidth <= 480) {
    const menuNav = document.querySelector("[data-nav]");
    menuNav.insertAdjacentHTML("beforeend", `<a href="#" class="header__subscribe-btn btn" style="display: block">Sign Up</a>`);
  }
}

moveBtn();

/*================ Присвоение активному табу класа "_active" ================*/
const tabs = document.querySelectorAll("[data-tabs]");
const sliders = document.querySelectorAll("[data-slider]");

// Перебираем табы
tabs.forEach((item) => {
  // При клике на таб удаляем класс "_active" у всех табов и вешаем на тот, котрый нажали
  item.addEventListener("click", (e) => {
    tabs.forEach((item) => item.classList.remove("_active"));

    // Удаляем класс "_active" у всех сдайдеров
    sliders.forEach((slider) => slider.classList.remove("_active"));

    if (item.dataset === e.target.dataset) {
      item.classList.add("_active");

      // Вешаем класс "_active" слайдеру со значением атрибута = item.dataset.tabs
      const slider = document.querySelector(`[data-slider="${item.dataset.tabs}"]`);
      slider.classList.add("_active");
    }
  });
});
