
document.addEventListener("DOMContentLoaded", function () {
    const agregarProductoForm = document.getElementById("agregarProductoForm");
    const tablaProductos = document.getElementById("tablaProductos");
    const catalogo = [];

    // Función para actualizar la tabla de productos
    function actualizarTablaProductos() {
        // Limpiar la tabla actual
        tablaProductos.innerHTML = "";

        // Llenar la tabla con los productos actualizados
        catalogo.forEach((producto) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.descripcion}</td>
                <td><img src="${producto.imagen}" alt="${producto.descripcion}" height="60" width="100"></td>
                <td>$${producto.precio}</td>
                <td><button class="btn btn-danger eliminar-producto" data-id="${producto.id}">Eliminar</button></td>
            `;
            tablaProductos.appendChild(fila);
        });
    }

    // Agrega un evento para manejar el clic en los botones de eliminación
    tablaProductos.addEventListener("click", function (event) {
        if (event.target.classList.contains("eliminar-producto")) {
            const productoId = event.target.getAttribute("data-id");
            mostrarConfirmacion(productoId);
        }
    });

    // Función para mostrar un mensaje de confirmación antes de eliminar un producto
    function mostrarConfirmacion(productoId) {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");

        if (confirmar) {
            eliminarProducto(productoId);
        }
    }

    // Función para eliminar un producto del catálogo
    function eliminarProducto(id) {
        // Encuentra el índice del producto en el catálogo
        const index = catalogo.findIndex((producto) => producto.id === id);

        if (index !== -1) {
            // Elimina el producto del catálogo
            catalogo.splice(index, 1);

            // Actualiza el catálogo en el almacenamiento local
            localStorage.setItem("catalogo", JSON.stringify(catalogo));

            // Vuelve a cargar la tabla de productos
            actualizarTablaProductos();
        }
    }

    // Función para verificar si el ID ya existe en el catálogo
    function idExiste(id) {
        return catalogo.some((producto) => producto.id === id);
    }

    // Manejar el envío del formulario
    agregarProductoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores ingresados en el formulario
        const nuevoId = document.getElementById("nuevoId").value;
        const nuevoNombre = document.getElementById("nuevoNombre").value;
        const nuevaImagen = document.getElementById("nuevaImagen").value;
        const nuevoPrecio = parseFloat(document.getElementById("nuevoPrecio").value);

        // Validar que el ID sea numérico
        if (!/^\d+$/.test(nuevoId)) {
            alert("El ID debe ser un valor numérico.");
            return;
        }

        // Verificar si el ID ya existe en el catálogo
        if (idExiste(nuevoId)) {
            const confirmar = confirm("El ID ya está en uso. ¿Deseas reemplazar el producto existente?");
            if (!confirmar) {
                return;
            }
            // Eliminar el producto existente antes de agregar el nuevo
            eliminarProducto(nuevoId);
        }

        // Crear un nuevo objeto de producto
        const nuevoProducto = {
            id: nuevoId,
            descripcion: nuevoNombre,
            imagen: nuevaImagen,
            precio: nuevoPrecio,
        };

        // Agregar el nuevo producto al catálogo
        catalogo.push(nuevoProducto);

        // Almacenar el catálogo actualizado en el almacenamiento local
        localStorage.setItem("catalogo", JSON.stringify(catalogo));

        // Actualizar la tabla de productos
        actualizarTablaProductos();

        // Limpiar el formulario
        agregarProductoForm.reset();
    });

    // Cargar el catálogo existente al cargar la página
    function cargarCatalogo() {
        const catalogoGuardado = JSON.parse(localStorage.getItem("catalogo")) || [];
        catalogo.push(...catalogoGuardado);
        actualizarTablaProductos();
    }
    

    cargarCatalogo();
});
