export const actualizarContador = (carrito) => {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
        contador.textContent = totalItems;
    }   
}

export const mostrarMensaje = (mensaje) => {
    alert(mensaje);
}