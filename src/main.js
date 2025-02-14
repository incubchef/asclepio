// Seleccionamos las pestañas y formularios
const tabs = document.querySelectorAll('.tabs a');
const forms = document.querySelectorAll('.form-container');

// Función para cambiar pestaña
function switchTab(index) {
  // Removemos la clase 'active' de todas las pestañas y formularios
  tabs.forEach(tab => tab.classList.remove('active'));
  forms.forEach(form => form.classList.remove('active'));

  // Activamos la pestaña y el formulario correctos
  tabs[index].classList.add('active');
  forms[index].classList.add('active');
}

// Eventos para cambiar pestañas
tabs.forEach((tab, index) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    switchTab(index);
  });
});

// Simula carga y redirección
function simulateLoading(button, url) {
  button.disabled = true;
  button.textContent = "Cargando...";
  setTimeout(() => { window.location.href = url; }, 3000);
}

document.getElementById("login-button").addEventListener("click", function () {
  simulateLoading(this, "dashboard.html");
});

document.getElementById("register-button").addEventListener("click", function () {
  simulateLoading(this, "creacion_perfil.html");
});

// Activar "Iniciar sesión" por defecto
switchTab(0);



