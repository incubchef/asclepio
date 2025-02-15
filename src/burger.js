document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navContainer = document.querySelector(".nav-container");

  if (burgerMenu && navContainer) {
    burgerMenu.addEventListener("click", function () {
      console.log("Burger clicked!");
      navContainer.classList.toggle("active");
      burgerMenu.classList.toggle("active");
      console.log(navContainer.classList);  // Verifica las clases de navContainer
    });
  } else {
    console.error("Elementos del menú hamburguesa no encontrados.");
  }
});
