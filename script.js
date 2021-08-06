const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let snake = [
    {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200}
];

main();

function main() {
    setTimeout(() => {
        clearCanvas();
        drawSnake();
        main();
    }, 100);
}
function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.strokestyle = "black";
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}


let dx = 10;
let dy = 0;

function drawSnakeBody(snakeBody) {
    ctx.fillStyle = "#f67f3d";
    ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10)
}
function drawSnake() {
    snake.forEach(drawSnakeBody)
}
function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y
    }
    snake.unshift(head);
    snake.pop();
}