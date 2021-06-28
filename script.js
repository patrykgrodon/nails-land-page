"use strict";

const header = document.querySelector(".header__name");

const portfolio = document.querySelector(".contact");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");

const gallery = document.querySelector(".gallery");
const btnGallery = document.querySelector(".btn__gallery");

const portfolioImgContainer = document.querySelector(
  ".portfolio__img-container"
);
const portfolioImg = document.querySelector(".portfolio__img");

//////////////////////////////////////
// Functions
const showModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");

  if (gallery.style.display === "none") {
    setTimeout(function () {
      gallery.style.display = "none";
    }, 1000);
  }

  // Remove current img
  const tempImg = modal.querySelector(".temp__img");

  if (tempImg) {
    setTimeout(function () {
      tempImg.remove();
    }, 1000);
  }
};

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Close & Clear modal if:
// - Click on Close modal button
// - key up escape
// - click outiside the modal

// BTN
btnCloseModal.addEventListener("click", function () {
  closeModal();
});

// Outside the modal
overlay.addEventListener("click", function () {
  closeModal();
});

// Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// Open modal with picture u clicked
portfolioImgContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("portfolio__img")) return;
  gallery.style.display = "none";
  showModal();

  // Removing img from modal if it's
  if (
    modal.querySelector("img") &&
    !modal.querySelector("img").classList.contains("gallery__item")
  ) {
    modal.querySelector("img").remove();
  }
  // Getting img source from el
  const currImgSrc = e.target.getAttribute("src");

  const html = `<img class="temp__img" src="${currImgSrc}">`;
  // modal.innerHTML = html;
  modal.insertAdjacentHTML("afterbegin", html);
});

// Open gallery
btnGallery.addEventListener("click", function () {
  gallery.style.display = "grid";

  if (modal.querySelector(".temp__img")) {
    modal.querySelector(".temp__img").remove();
  }
  showModal();
});
