document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navContainer = document.querySelector(".nav-container");

  if (burgerMenu && navContainer) {
    burgerMenu.addEventListener("click", function () {
      navContainer.classList.toggle("active");
      burgerMenu.classList.toggle("active");
    });
  } else {
    console.error("Elementos del menú hamburguesa no encontrados.");
  }
});
