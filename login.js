// Definir usuarios con sus respectivas credenciales
const usuarios = [
    { tipo: "ADMINISTRADOR", usuario: "Admin", contrasena: "admin123" },
    { tipo: "CLIENTE", usuario: "Client", contrasena: "cliente123" },
];

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el envío del formulario

    const usuarioInput = document.getElementById("usuario");
    const contrasenaInput = document.getElementById("contrasena");
    const usuario = usuarioInput.value;
    const contrasena = contrasenaInput.value;

    const usuarioEncontrado = usuarios.find((user) => user.usuario === usuario && user.contrasena === contrasena);

    if (usuarioEncontrado) {
        sessionStorage.setItem("username", usuarioEncontrado.usuario);
        sessionStorage.setItem("userType", usuarioEncontrado.tipo); // Agregar el tipo de usuario a la sesión

        alert(`¡Inicio de sesión exitoso como ${usuarioEncontrado.tipo}!`);
        
        // Puedes redirigir a diferentes páginas según el tipo de usuario aquí.
        window.location.href = "main.html";
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
        // Limpiar los campos de usuario y contraseña
        usuarioInput.value = "";
        contrasenaInput.value = "";
        // Puedes mostrar un mensaje de error en el HTML en lugar de usar alert.
    }
});
