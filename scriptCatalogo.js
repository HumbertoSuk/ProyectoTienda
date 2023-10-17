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
                <td><button class="btn btn-danger eliminar-producto" data-id="${producto.id}">Eliminar</button>
                <button class="btn btn-primary editar-producto" data-id="${producto.id}">Editar</button>
                </td>
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
    
        // Validar que el precio no sea negativo
        if (nuevoPrecio < 0) {
            alert("El precio no puede ser negativo.");
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

       // Agrega un evento para manejar el clic en los botones de edición
       tablaProductos.addEventListener("click", function (event) {
        if (event.target.classList.contains("editar-producto")) {
            const productoId = event.target.getAttribute("data-id");
            mostrarFormularioEdicion(productoId);
        }
    });

    // Función para mostrar el formulario de edición con los detalles del producto seleccionado
    function mostrarFormularioEdicion(id) {
        const producto = catalogo.find((p) => p.id === id);
        if (producto) {
            // Rellenar el formulario de edición con los detalles del producto
            document.getElementById("editarId").value = producto.id;
            document.getElementById("editarNombre").value = producto.descripcion;
            document.getElementById("editarImagen").value = producto.imagen;
            document.getElementById("editarPrecio").value = producto.precio;

            // Mostrar el fondo difuminado y el formulario de edición
            document.querySelector(".overlay").style.display = "block";
            document.querySelector(".modal").style.display = "block";
        }
    }

    // Manejar el clic en el botón de cerrar
    document.querySelector(".close-button").addEventListener("click", function () {
        // Ocultar el fondo difuminado y el formulario de edición
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".modal").style.display = "none";
    });

// Manejar el envío del formulario de edición
const editarProductoForm = document.getElementById("editarProductoForm");
editarProductoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("editarId").value;
    const nombre = document.getElementById("editarNombre").value;
    const imagen = document.getElementById("editarImagen").value;
    const precio = parseFloat(document.getElementById("editarPrecio").value);

    // Validar que el precio no sea negativo
    if (precio < 0) {
        alert("El precio no puede ser negativo.");
        return;
    }

    // Encuentra el producto en el catálogo
    const producto = catalogo.find((p) => p.id === id);

    if (producto) {
        // Actualizar los detalles del producto
        producto.descripcion = nombre;
        producto.imagen = imagen;
        producto.precio = precio;

        // Actualizar la tabla de productos
        actualizarTablaProductos();

        // Ocultar el formulario de edición
        document.getElementById("formularioEdicion").style.display = "none";
                // Ocultar el fondo difuminado y el formulario de edición
                document.querySelector(".overlay").style.display = "none";
                document.querySelector(".modal").style.display = "none";

        // Guardar el catálogo actualizado en el almacenamiento local
        localStorage.setItem("catalogo", JSON.stringify(catalogo));
    }
});



    cargarCatalogo();
});
