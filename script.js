const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

const players = [
  { x: 100, y: 200, color: 'green', dx: 2 },
  { x: 700, y: 200, color: 'red', dx: -2 },
];

function drawPlayers() {
  players.forEach(player => {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
  });
}

function updatePositions() {
  players.forEach(player => {
    player.x += player.dx;
    if (player.x < 10 || player.x > canvas.width - 10) {
      player.dx *= -1;
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayers();
  updatePositions();
  requestAnimationFrame(gameLoop);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service Worker registered!');
    });
  }
  
gameLoop();
