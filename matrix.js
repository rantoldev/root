const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px "Source Code Pro", monospace';

    for (let i = 0; i < drops.length; i++) {
        // Random character
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$TERM';
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Random green intensity for depth
        const intensity = Math.random() > 0.9 ? 1 : (Math.random() * 0.5 + 0.5);
        const gVal = Math.floor(255 * intensity);

        // Occasional white highlight
        if (Math.random() > 0.99) {
            ctx.fillStyle = '#fff';
        } else {
            ctx.fillStyle = `rgb(0, ${gVal}, 0)`;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 33);
