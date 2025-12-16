import { obtenerCarrito, guardarCarrito } from "./storage.js"; 
import { actualizarContador, mostrarMensaje } from "./ui.js"; 
import { eliminarDelCarrito } from "./funcionesCarrito.js"; 


export const renderCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedorProductos = document.getElementById("productos-carrito");
    const contenedorTotal = document.getElementById("total-carrito");
    const botonVaciar = document.getElementById("boton-vaciar");

    if (!contenedorProductos) return; 
    
    contenedorProductos.innerHTML = ""; 

    if (carrito.length === 0) {
        if (contenedorTotal) contenedorTotal.textContent = "$0";
        // Si el HTML ya tiene el mensaje, no lo generamos de nuevo
        return;
    }

    let totalCompra = 0;
    
    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        totalCompra += subtotal; 
        
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>$${subtotal.toLocaleString()}</td>
            <td>
                <button class="btn-eliminar" data-id="${producto.id}">X</button>
            </td>
        `;
        contenedorProductos.appendChild(fila);
    });

    if (contenedorTotal) {
        contenedorTotal.textContent = `$${totalCompra.toLocaleString()}`;
    }

    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            eliminarDelCarrito(id);
        });
    });

    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            guardarCarrito([]);
            renderCarrito();    
            actualizarContador([]);
            mostrarMensaje("Carrito vaciado.");
        });
    }

};

document.addEventListener('DOMContentLoaded', () => {
    renderCarrito();
});