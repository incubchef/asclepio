document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navContainer = document.querySelector(".nav-container");

  burgerMenu.addEventListener("click", function () {
    navContainer.classList.toggle("active");
    burgerMenu.classList.toggle("active");
  });
});
