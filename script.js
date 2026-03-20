// Pong Game Logic

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 75;

const playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, speed: 6 };
const aiPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, speed: 4 };

// Ball properties
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speedX: 5, speedY: 3 };

// Score tracking
let playerScore = 0;
let aiScore = 0;

// Input handling
const keys = {};
document.addEventListener('keydown', (event) => { keys[event.key] = true; });
document.addEventListener('keyup', (event) => { keys[event.key] = false; });

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
    
    // Draw ball
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    
    // Draw scores
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Player: ${playerScore}`, 20, 30);
    ctx.fillText(`AI: ${aiScore}`, canvas.width - 120, 30);
}

function update() {
    // Move player paddle
    if (keys['ArrowUp'] && playerPaddle.y > 0) playerPaddle.y -= playerPaddle.speed;
    if (keys['ArrowDown'] && playerPaddle.y < canvas.height - paddleHeight) playerPaddle.y += playerPaddle.speed;

    // Move AI paddle
    aiLogic();

    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Bounce off top and bottom
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY *= -1;
    }

    // Check for ball collision with paddles
    if (ball.x - ball.radius < playerPaddle.x + playerPaddle.width && 
        ball.y > playerPaddle.y && 
        ball.y < playerPaddle.y + playerPaddle.height) {
        ball.speedX *= -1;
    }

    if (ball.x + ball.radius > aiPaddle.x && 
        ball.y > aiPaddle.y && 
        ball.y < aiPaddle.y + aiPaddle.height) {
        ball.speedX *= -1;
    }

    // Scoring
    if (ball.x - ball.radius < 0) {
        aiScore++;
        resetBall();
    }
    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
    }

    // Update scoreboard
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('aiScore').textContent = aiScore;
}

function aiLogic() {
    if (aiPaddle.y + paddleHeight / 2 < ball.y) {
        aiPaddle.y += aiPaddle.speed;
    } else {
        aiPaddle.y -= aiPaddle.speed;
    }
    aiPaddle.y = Math.max(Math.min(aiPaddle.y, canvas.height - paddleHeight), 0);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.speedY = (Math.random() - 0.5) * 5;
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();