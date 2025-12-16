import { guardarCarrito, obtenerCarrito ,vaciarCarrito } from './storage.js';
import { actualizacrContador, mostrarMensaje } from './ui.js';

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    actualizacrContador(carrito);
    mostrarMensaje('Producto agregado al carrito');
};

export const eliminarProductos = (id) => { 
    const carrito = obtenerCarrito()
    carrito.splice(id, 1);

    guardarCarrito(carrito);
    actualizacrContador(carrito);
    mostrarMensaje('Producto eliminado del carrito');
};

export const vaciarCarritoCompleto = () => {
    vaciarCarritoStorage();
    actualizacrContador([]);
    mostrarMensaje('Carrito vaciado');
};
