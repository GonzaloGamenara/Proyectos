const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Ajustamos el tamaño inicial del canvas
resizeCanvas();

const stars = [];
const numStars = 250; // Número de estrellas

// Función para generar estrellas
function generateStars() {
    stars.length = 0; // Limpiamos el array
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5, // Tamaño aleatorio
            speed: Math.random() * 0.1 + 0.2 // Velocidad de movimiento
        });
    }
}

// Dibujar estrellas en el canvas
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Borra todo el canvas
    ctx.fillStyle = "white";

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Mover ligeramente las estrellas
function updateStars() {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

// Animar
function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

// Iniciar animación
generateStars();
animate();

// Ajuste del tamaño del canvas al cambiar la ventana
window.addEventListener('resize', () => {
    resizeCanvas();
    generateStars(); // Regeneramos las estrellas para adaptarlas al nuevo tamaño
});
