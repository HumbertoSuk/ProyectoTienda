document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.querySelector('table');
    const valortotalSpan = document.getElementById('valortotal');

    const carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito) {
        carrito.forEach((item) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td>${item.producto.id}</td><td>${item.producto.descripcion}</td><td>${item.cantidad}</td><td>$${item.producto.precio}</td><td>$${item.producto.precio * item.cantidad}</td>`;
            tabla.appendChild(fila);
        });

        const valortotal = carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
        valortotalSpan.textContent = `$${valortotal}`;
    }
});
