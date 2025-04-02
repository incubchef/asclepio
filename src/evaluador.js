document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("evaluadorModal");
    const evalTab = document.getElementById("evalTab");
    const candadoEval = document.getElementById("candado-eval");

    // 🔹 Comprobar si el usuario ya aceptó ser Evaluador
    if (localStorage.getItem("evaluadorAceptado") === "true") {
        activarEvaluacion(); // Si aceptó antes, activar pestaña
    } else if (!sessionStorage.getItem("modalMostrado")) {
        // Mostrar el modal solo si no se ha mostrado en esta sesión
        setTimeout(() => {
            modal.style.display = "flex";
        }, 500);
        sessionStorage.setItem("modalMostrado", "true"); // Guardar que se mostró
    }
});

// ✅ Función para activar Evaluación y guardar en localStorage
function activarEvaluacion() {
    const evalTab = document.getElementById("evalTab");
    const candadoEval = document.getElementById("candado-eval");

    evalTab.disabled = false; // Habilitar pestaña
    candadoEval.style.display = "none"; // Ocultar candado
}

// Aceptar Evaluador → Guarda estado y navega a Evaluación
function aceptarEvaluador() {
    document.getElementById("evaluadorModal").style.display = "none";
    localStorage.setItem("evaluadorAceptado", "true"); // Guardar estado permanente
    activarEvaluacion(); // Activar la pestaña de Evaluación
    window.location.href = "CompanyNew_eval.html";
}

// Denegar Evaluador → Solo cierra el modal
function denegarEvaluador() {
    document.getElementById("evaluadorModal").style.display = "none";
    localStorage.setItem("evaluadorAceptado", "false"); // Guardar estado de rechazo
    alert("Has denegado la solicitud de evaluador.");
}

// 🔄 Función para actualizar la UI en la página de evaluación
function actualizarEstadoEvaluacion() {
    const btnNuevo = document.getElementById("reset-evaluacion");
    const btnEvaluando = document.createElement("button");
    btnEvaluando.className = "evaluacion-btn estado-dd";
    btnEvaluando.innerText = "Evaluando";

    const btnDesestimado = document.createElement("button");
    btnDesestimado.className = "evaluacion-btn estado-rech";
    btnDesestimado.innerText = "Desestimado";

    if (localStorage.getItem("evaluadorAceptado") === "true") {
        if (btnNuevo) btnNuevo.replaceWith(btnEvaluando);
    } else if (localStorage.getItem("evaluadorAceptado") === "false") {
        if (btnNuevo) btnNuevo.replaceWith(btnDesestimado);
    }
}
