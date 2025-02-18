document.addEventListener("DOMContentLoaded", function () {
  console.log("JS cargado correctamente.");

  const formPago = document.getElementById("form-pago");
  const paymentModal = document.getElementById("paymentModal");
  const modalText = document.getElementById("modal-text");

  formPago.addEventListener("submit", function (event) {
    event.preventDefault(); // 🚫 Evita el envío del formulario
    console.log("Formulario enviado, pero preventDefault() lo detuvo.");

    // Mostrar el modal de carga
    paymentModal.style.display = "flex";
    modalText.innerHTML = "Procesando tu pago...";
    console.log("Modal mostrado.");

    // Simular procesamiento de pago (3 segundos)
    setTimeout(() => {
      modalText.innerHTML = `<span class="success-icon">✔️</span> <br> Pago procesado con éxito`;
      console.log("Cambio de mensaje en el modal.");

      // Esperar 2 segundos más y redirigir
      setTimeout(() => {
        console.log("Redirigiendo a verificacion_perfil.html...");
        window.location.href = "verificacion_perfil.html";
      }, 2000);
    }, 3000);
  });
});
