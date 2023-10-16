document.addEventListener("DOMContentLoaded", function () {
    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");
    let carrito = [];

    // Obtener el catálogo de productos desde el almacenamiento local o inicializarlo como un array vacío
    let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];

    // Función para llenar el catálogo de productos
    function llenarCatalogo() {
        catalogo.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");
            card.innerHTML = `
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.descripcion}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.descripcion}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        Cantidad: 
                        <input type="number" id="cantidadProducto${producto.id}" value="0" min="0">
                        <button class="btn btn-primary" id="agregarAlCarrito${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            catalogoContainer.appendChild(card);

            const botonAgregar = card.querySelector(`#agregarAlCarrito${producto.id}`);
            botonAgregar.addEventListener("click", function () {
                const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);
                if (cantidad > 0) {
                    agregarProductoAlCarrito(producto, cantidad);
                }
            });
        }
        )}

    llenarCatalogo(); // Llena el catálogo al cargar la página

    function agregarProductoAlCarrito(producto, cantidad) {
        // Verifica si ya hay elementos en el carrito en el almacenamiento local
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Busca el producto en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ producto, cantidad });
        }

        // Almacena el carrito actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.producto.id}</td>
                <td>${item.producto.descripcion}</td>
                <td>${item.cantidad}</td>
                <td>$${item.producto.precio}</td>
                <td>$${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        total.textContent = `$${subtotalTotal}`;
    }

    const finalizarCompraBtn = document.getElementById("finalizarCompra");
    finalizarCompraBtn.addEventListener("click", function () {
        // No es necesario guardar el carrito en localStorage aquí, ya que se actualiza automáticamente al agregar productos.

        const ticketURL = "ticket.html";
        window.open(ticketURL, "_blank");
    });
});
