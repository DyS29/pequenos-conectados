// guia-manual.js

// Obtener valores desde localStorage o inicializar en 0
let likesGuia = JSON.parse(localStorage.getItem("likesGuia")) || 0;
let dislikesGuia = JSON.parse(localStorage.getItem("dislikesGuia")) || 0;
let encantaGuia = JSON.parse(localStorage.getItem("encantaGuia")) || 0;

// Actualizar contadores en pantalla
function actualizarContadores() {
    document.getElementById("likes0").textContent = likesGuia;
    document.getElementById("dislikes0").textContent = dislikesGuia;
    document.getElementById("encanta0").textContent = encantaGuia;
}

// Funciones de reacción
function like(id) {
    likesGuia++;
    localStorage.setItem("likesGuia", JSON.stringify(likesGuia));
    actualizarContadores();
}

function dislike(id) {
    dislikesGuia++;
    localStorage.setItem("dislikesGuia", JSON.stringify(dislikesGuia));
    actualizarContadores();
}

function meEncanta(id) {
    encantaGuia++;
    localStorage.setItem("encantaGuia", JSON.stringify(encantaGuia));
    actualizarContadores();
}

// Inicializar al cargar la página
window.onload = actualizarContadores;