document.addEventListener("DOMContentLoaded", function () {
  const account = document.getElementById("account");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const logoutLink = dropdownMenu.querySelector("li:last-child a"); // Último enlace (Logout)

  account.addEventListener("click", function () {
    account.classList.toggle("active");
  });

  // Cierra el menú si se hace clic fuera
  document.addEventListener("click", function (event) {
    if (!account.contains(event.target)) {
      account.classList.remove("active");
    }
  });

  // Redirigir al hacer clic en "Logout"
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault(); // Evita el comportamiento por defecto
    window.location.href = "index.html"; // Redirige a index.html
  });
});
