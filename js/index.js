import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById("contenedor-tarjetas");
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    fetch("./data/productos.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error HTTP status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            data.forEach((producto) => {
                const tarjeta = document.createElement("article");
                tarjeta.classList.add("card");

                const imagen = document.createElement("img");
                imagen.alt = producto.nombre;
                imagen.src = `./img/${producto.img}`;

                const titulo = document.createElement("h3");
                titulo.textContent = producto.nombre;

                const precio = document.createElement("p");
                precio.textContent = `$${producto.precio}`;

                const boton = document.createElement("button");
                boton.textContent = "Agregar al carrito";
                boton.addEventListener("click", () => {
                    agregarAlCarrito(producto);
                    // Ya no es necesario llamar actualizarContador aquí, se hace dentro de agregarAlCarrito
                });

                tarjeta.appendChild(imagen);
                tarjeta.appendChild(titulo);
                tarjeta.appendChild(precio);
                tarjeta.appendChild(boton);

                content.appendChild(tarjeta);
            });
        })
        .catch(error => console.log(error));
});