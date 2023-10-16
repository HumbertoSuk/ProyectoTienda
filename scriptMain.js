document.addEventListener("DOMContentLoaded", function () {
    const usernameDisplay = document.getElementById("username-display");
    const catalogLink = document.getElementById("catalog-link");
    const username = sessionStorage.getItem("username");
    const userType = sessionStorage.getItem("userType");

    if (username) {
        usernameDisplay.textContent = `Bienvenido, ${username}!`;

        if (userType === "CLIENTE") {
            catalogLink.style.display = "none"; // Ocultar catálogo solo para CLIENTE
        }
        
    }
    else {
    // El usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    window.location.href = "login.html";
}
});
