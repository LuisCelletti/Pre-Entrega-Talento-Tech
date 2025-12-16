conts KEY ="carrito";

export const guardarCarrito = (carrito) => {
    localStorage.setItem(KEY, JSON.stringify(carrito));
};

export conts obtenerCarrito = () => {
       return JSON.parse(localStorage.getItem(carrito)) || [];
};

// Agregamos"Storage" al nombre de la función para que no se pise con las funcioneCarrito
export const vaciarCarritoStorage = () => {
 localStorage.removeItem(KEY);    
};
