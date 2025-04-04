document.addEventListener("DOMContentLoaded", function () {
    const evaluadorSection = document.getElementById("evaluadorSection");
    const evalTab = document.getElementById("evalTab");
    const candadoEval = document.getElementById("candado-eval");
    const mensajeRechazo = document.getElementById("mensajeRechazo");

    // 🔹 Verifica si el usuario ya aceptó o rechazó
    if (localStorage.getItem("evaluadorAceptado") === "true") {
        activarEvaluacion(); // Usuario aceptó antes → Activar Evaluación
    } else if (localStorage.getItem("evaluadorAceptado") === "false") {
        mostrarMotivoRechazo(); // Usuario rechazó antes → Mostrar motivo
    } else {
        evaluadorSection.classList.remove("hidden"); // 🔥 Mostrar siempre al cargar
    }
});

// ✅ Función para activar la pestaña de Evaluación
function activarEvaluacion() {
    evalTab.disabled = false; // Habilitar pestaña
    candadoEval.style.display = "none"; // Ocultar candado
}

// ✅ Aceptar Evaluador → Guarda estado y habilita evaluación
function aceptarEvaluador() {
    document.getElementById("evaluadorSection").classList.add("hidden");
    localStorage.setItem("evaluadorAceptado", "true"); // Guardar estado
    activarEvaluacion();
    window.location.href = "CompanyNew_eval.html"; // Redirigir a Evaluación
}

// ✅ Denegar Evaluador → Muestra selector de motivo
function denegarEvaluador() {
    document.getElementById("motivoRechazoContainer").classList.remove("hidden");
}

// ✅ Guardar motivo de rechazo
function guardarMotivoRechazo() {
    const motivoSelect = document.getElementById("motivoRechazo");
    const motivoSeleccionado = motivoSelect.value;

    if (motivoSeleccionado !== "") {
        localStorage.setItem("evaluadorAceptado", "false");
        localStorage.setItem("motivoRechazo", motivoSeleccionado);
        
        document.getElementById("evaluadorSection").classList.add("hidden");
        mostrarMotivoRechazo();
    } else {
        alert("Por favor selecciona un motivo.");
    }
}

// ✅ Mostrar motivo de rechazo guardado
function mostrarMotivoRechazo() {
    const mensajeRechazo = document.getElementById("mensajeRechazo");
    const motivo = localStorage.getItem("motivoRechazo");

    if (motivo) {
        mensajeRechazo.innerHTML = `<p><strong>Motivo del rechazo:</strong> ${motivo}</p>`;
        mensajeRechazo.classList.remove("hidden");
    }
}
