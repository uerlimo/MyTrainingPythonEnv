// Pong Game Logic

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 400;

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
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // Draw scores
    ctx.font = '16px Arial';
    ctx.fillText(`Player: ${playerScore}`, 20, 20);
    ctx.fillText(`AI: ${aiScore}`, canvas.width - 80, 20);
}

function update() {
    // Move player paddle
    if (keys['ArrowUp'] && playerPaddle.y > 0) playerPaddle.y -= playerPaddle.speed;
    if (keys['ArrowDown'] && playerPaddle.y < canvas.height - paddleHeight) playerPaddle.y += playerPaddle.speed;

    // Move AI paddle
aIlogic();

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
}

function aIlogic() {
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
    ball.speedX = -ball.speedX;
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();