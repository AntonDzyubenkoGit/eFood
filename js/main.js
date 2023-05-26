import "./script.js";

//Инициализация Swiper
if (document.querySelector(".tabs__slider")) {
  new Swiper(".tabs__slider", {
    navigation: {
      nextEl: ".tabs__slider-arrow-next",
      prevEl: ".tabs__slider-arrow-prev",
    },
    slidesPerView: 5,
    slidesPerGroup: 1,
    spaceBetween: 30,
    watchOverflow: false,
    speed: 800,
    loop: false,
    pagination: {
      el: ".tabs__slider-pagination",
      clickable: true,
      type: "bullets",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1,
      },
      481: {
        slidesPerView: 2,
        spaceBetween: 15,
        slidesPerGroup: 2,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 2,
      },
      993: {
        slidesPerView: 5,
        spaceBetween: 30,
        slidesPerGroup: 1,
      },
    },
  });
}

//Инициализация Swiper (feedback)
if (document.querySelector(".feedback__slider")) {
  new Swiper(".feedback__slider", {
    navigation: {
      nextEl: ".feedback__slider-arrow-next",
      prevEl: ".feedback__slider-arrow-prev",
    },
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    loop: true,
  });
}
