const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let dx = 10;
let dy = 0;
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];
let changeingDirection = false;
let foodX, foodY;
let score = 0;

main();
generateFood();
document.addEventListener("keydown", changeDirection);

function main() {
  if (gameEnded()) return;
  changeingDirection = false;

  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();

    main();
  }, 100);
}
function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokestyle = "black";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
function drawSnakeBody(snakeBody) {
  ctx.fillStyle = "#f67f3d";
  ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10);
}
function drawSnake() {
  snake.forEach(drawSnakeBody);
}
function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };
  const hasEaten = snake[0].x === foodX && snake[0].y === foodY;

  snake.unshift(head);

  if (hasEaten) {
    ++score;
    document.getElementById("score").innerText = score;
    generateFood();
  } else {
    snake.pop();
  }
}
function changeDirection(e) {
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;

  const keyPressed = e.keyCode;
  const goingUp = dy === -10,
    goingDown = dy === 10,
    goingRight = dx === 10,
    goingLeft = dx === -10;

  if (keyPressed === LEFT_ARROW && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === RIGHT_ARROW && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === UP_ARROW && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === DOWN_ARROW && !goingUp) {
    dx = 0;
    dy = 10;
  }
}
function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function generateFood() {
  foodX = randomFood(0, canvas.width - 10);
  foodY = randomFood(0, canvas.height - 10);

  snake.forEach((body) => {
    // check if snake has eaten
    const eaten = body.x == foodX && body.y == foodY;
    // generate more food if snake has eaten
    if (eaten) generateFood();
  });
}
function drawFood() {
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(foodX, foodY, 10, 10);
}
function gameEnded() {
  const snakeHead = snake[0];
  for (let i = 4; i < snake.length; i++) {
    // bit itself!
    const collided = snake[i].x === snakeHead.x && snake[i].y === snakeHead.y;
    if (collided) return true;
  }

  const hitLeftWall = snakeHead.x < 0;
  const hitRightWall = snakeHead.x > canvas.width - 10;
  const hitTopWall = snakeHead.y < 0;
  const hitBottomWall = snakeHead.y > canvas.height - 10;

  return hitLeftWall || hitRightWall || hitBottomWall || hitTopWall;
}
