import { renderCarrito } from "./carrito.js";
import { guardarCarrito, obtenerCarrito } from './storage.js';
import { actualizarContador, mostrarMensaje } from './ui.js';

export const agregarAlCarrito = (producto) => {
    let carrito = obtenerCarrito();
    
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje('Producto agregado al carrito');
};

export const eliminarDelCarrito = (id) => { 
    const carrito = obtenerCarrito();

    const nuevoCarrito = carrito.filter(item => item.id !== id);

    guardarCarrito(nuevoCarrito);
    actualizarContador(nuevoCarrito);
    mostrarMensaje('Producto eliminado del carrito');
    
    if (document.getElementById('productos-carrito')) {
        renderCarrito();
    }
};

export const vaciarCarritoCompleto = () => {
    guardarCarrito([]);
    actualizarContador([]);
    mostrarMensaje('Carrito vaciado');
    if (document.getElementById('productos-carrito')) {
        renderCarrito();
    }
};