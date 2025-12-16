import { obtenerCarrito, guardarCarrito } from "./storage.js"; 
import { actualizarContador, mostrarMensaje } from "./ui.js"; 
import { eliminarDelCarrito } from "./funcionesCarrito.js"; 


const renderCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedorCarrito = document.getElementById("contenedor-carrito");

    if (!contenedorCarrito) return; 
    
    contenedorCarrito.innerHTML = ""; 

    
    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-vacio");
        mensaje.textContent = "El carrito está vacío.";
        contenedorCarrito.appendChild(mensaje);
        

        const totalElement = document.getElementById("total-carrito");
        if (totalElement) totalElement.textContent = "$0";
        
        return;
    }

    
    let totalCompra = 0;
    
    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        totalCompra += subtotal; 
        
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");
        tarjeta.dataset.id = producto.id; 


        const imagen = document.createElement("img");
        imagen.src = `./img/${producto.img}`;
        imagen.alt = producto.nombre;
        
        const titulo = document.createElement("h3");
        titulo.textContent = `${producto.nombre} (x${producto.cantidad})`; 

        const precio = document.createElement("p");
        
        precio.textContent = `Subtotal: $${subtotal.toLocaleString()}`; 

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar del carrito";
        botonEliminar.classList.add("btn-eliminar");
        
        
        botonEliminar.addEventListener("click", () => {
            
            eliminarDelCarrito(producto.id); 
           
        });

        // Ensamblar tarjeta (FALTA EN TU CÓDIGO ORIGINAL)
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(botonEliminar);
        
        contenedorCarrito.appendChild(tarjeta);
    });
    
    
    const totalElement = document.getElementById("total-carrito");
    if (totalElement) {
        totalElement.textContent = `$${totalCompra.toLocaleString()}`;
    }
    
    
    const botonVaciar = document.getElementById("boton-vaciar");
    if (botonVaciar) {
        
        botonVaciar.addEventListener('click', () => {
            guardarCarrito([]);
            renderCarrito();    
            mostrarMensaje("Carrito vaciado.", "alerta");
        });
    }

};


document.addEventListener('DOMContentLoaded', () => {
    renderCarrito();
});