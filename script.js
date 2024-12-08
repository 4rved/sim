const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

// Spieler und Ball-Konfiguration
const ball = { x: 400, y: 200, radius: 10, dx: 2, dy: 1 };
const goals = { left: 0, right: canvas.width };
let leftScore = 0;
let rightScore = 0;

// Spielzeit
let gameTime = 90; // 90 Sekunden
let timerInterval;

// Zeichne das Spielfeld und die Tore
function drawField() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Hintergrund
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tore zeichnen
  ctx.fillStyle = 'white';
  ctx.fillRect(0, canvas.height / 4, 10, canvas.height / 2); // Linkes Tor
  ctx.fillRect(canvas.width - 10, canvas.height / 4, 10, canvas.height / 2); // Rechtes Tor

  // Ball zeichnen
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();

  // Ergebnisse zeichnen
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Linkes Team: ${leftScore}`, 20, 30);
  ctx.fillText(`Rechtes Team: ${rightScore}`, canvas.width - 140, 30);
}

// Ballbewegung und Kollision
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ballbewegung gegen obere und untere Kante
  if (ball.y < 10 || ball.y > canvas.height - 10) {
    ball.dy *= -1;
  }

  // Überprüfe, ob der Ball in ein Tor gefallen ist
  if (ball.x - ball.radius < goals.left) {
    rightScore++;
    resetBall();
  } else if (ball.x + ball.radius > goals.right) {
    leftScore++;
    resetBall();
  }

  // Überprüfe horizontal, ob Ball die Seitenwände berührt
  if (ball.x < 10 || ball.x > canvas.width - 10) {
    ball.dx *= -1;
  }
}

// Ball zurücksetzen bei Torerfolg
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = Math.random() > 0.5 ? 2 : -2;
  ball.dy = Math.random() > 0.5 ? 1 : -1;
}

// Timer starten
function startTimer() {
  timerInterval = setInterval(() => {
    gameTime--;
    if (gameTime <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Spielende und Ergebnisanzeige
function endGame() {
  alert(`Spiel beendet! Ergebnis: Linkes Team: ${leftScore} | Rechtes Team: ${rightScore}`);
}

// Hauptspiel-Loop
function gameLoop() {
  drawField();
  moveBall();
  requestAnimationFrame(gameLoop);
}

// Spiel starten
startTimer();
gameLoop();

