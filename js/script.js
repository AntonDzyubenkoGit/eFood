/*================ Сокрытие/отображение поисковой строки в хедере ================*/
const label = document.querySelector("[data-label]");

label.onclick = function () {
  // Находим поисковую строку(инпут) при клике на лейбл
  const search = document.querySelector("[data-search]");
  let hidden = search.getAttribute("hidden");

  // При наличии атрибута hidden убираем его, при отсутствии добавляем
  if (hidden) {
    search.removeAttribute("hidden");
  } else {
    search.setAttribute("hidden", "hidden");
  }

  // !!!!!!! Клик отрабатывает со второго раза
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
