// Variables globales usando localStorage
let likes = JSON.parse(localStorage.getItem("likes")) || {};
let dislikes = JSON.parse(localStorage.getItem("dislikes")) || {};
let encanta = JSON.parse(localStorage.getItem("encanta")) || {};
let comentarios = JSON.parse(localStorage.getItem("comentarios")) || {};

// Inicializar valores al cargar la página
function inicializar() {
    // Likes
    for (let id in likes) {
        const el = document.getElementById("likes" + id);
        if (el) el.textContent = likes[id];
    }
    // Dislikes
    for (let id in dislikes) {
        const el = document.getElementById("dislikes" + id);
        if (el) el.textContent = dislikes[id];
    }
    // Me encanta
    for (let id in encanta) {
        const el = document.getElementById("encanta" + id);
        if (el) el.textContent = encanta[id];
    }
    // Comentarios
    for (let id in comentarios) {
        const cont = document.getElementById("listaComentarios" + id);
        if (cont) {
            comentarios[id].forEach(c => {
                const div = document.createElement("div");
                div.classList.add("comentario");
                div.innerHTML = `
                    <strong>${c.nombre}:</strong> ${c.texto}
                    <button class="btn-eliminar" onclick="eliminarComentario(this, '${id}')">🗑️ Eliminar</button>
                `;
                cont.appendChild(div);
            });
        }
    }
}

// Funciones de reacción
function like(id) {
    likes[id] = (likes[id] || 0) + 1;
    localStorage.setItem("likes", JSON.stringify(likes));
    document.getElementById("likes" + id).textContent = likes[id];
}

function dislike(id) {
    dislikes[id] = (dislikes[id] || 0) + 1;
    localStorage.setItem("dislikes", JSON.stringify(dislikes));
    document.getElementById("dislikes" + id).textContent = dislikes[id];
}

function meEncanta(id) {
    encanta[id] = (encanta[id] || 0) + 1;
    localStorage.setItem("encanta", JSON.stringify(encanta));
    document.getElementById("encanta" + id).textContent = encanta[id];
}

// Función para agregar comentario
function agregarComentario(id) {
    const nombre = document.getElementById("nombre" + id).value.trim();
    const texto = document.getElementById("comentario" + id).value.trim();

    if (!nombre || !texto) {
        alert("Escribe tu nombre y comentario antes de enviar");
        return;
    }

    const nuevo = { nombre, texto };

    // Guardar en localStorage
    if (!comentarios[id]) comentarios[id] = [];
    comentarios[id].push(nuevo);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    // Crear div de comentario
    const cont = document.getElementById("listaComentarios" + id);
    const div = document.createElement("div");
    div.classList.add("comentario");
    div.innerHTML = `
        <strong>${nombre}:</strong> ${texto}
        <button class="btn-eliminar" onclick="eliminarComentario(this, '${id}')">🗑️ Eliminar</button>
    `;
    cont.appendChild(div);

    // Limpiar campos
    document.getElementById("nombre" + id).value = "";
    document.getElementById("comentario" + id).value = "";
}

// Función para eliminar comentario
function eliminarComentario(boton, id) {
    const div = boton.parentElement;
    const nombreTexto = div.querySelector("strong").textContent;
    const texto = nombreTexto.split(": ")[1];

    // Eliminar del array y actualizar localStorage
    comentarios[id] = comentarios[id].filter(c => c.texto !== texto);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    // Eliminar del DOM
    div.remove();
}

// Inicializar al cargar
window.onload = inicializar;