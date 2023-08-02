import { canvas } from './canvas.js';
import { Snake } from './snake.js';
import { Food } from './food.js';
import { gameOverSound } from './sounds.js';
import { drawMap, drawGameOver } from './draws.js';
const body = document.getElementsByTagName('body')[0];
const scoreElement = document.getElementsByTagName('h2')[0];
const button = document.createElement('button');
button.innerText = 'Try again';
const showButton = () => {
    body.appendChild(button);
    button.addEventListener('click', resetGame);
};
let reset = false;
const resetGame = () => {
    button.removeEventListener('click', resetGame);
    body.removeChild(button);
    initialConditions();
    animate();
};
const colision = () => {
    for (let i = 0; i < playerSnake.snakeBody.length; i++) {
        let part = playerSnake.snakeBody[i];
        if (part.x == playerSnake.x && part.y == playerSnake.y) {
            return true;
        }
    }
    return false;
};
const animate = () => {
    playerSnake.update();
    if (gameOver())
        return;
    drawMap();
    food.draw();
    playerSnake.eatFood();
    playerSnake.draw();
    drawScore();
    moveIsAvaliable = true;
    animationId = setTimeout(animate, 1000 / playerSnake.speed);
    if (reset) {
        clearTimeout(animationId);
        reset = false;
        initialConditions();
        setTimeout(animate, 100);
    }
};
const initialConditions = () => {
    playerSnake.speed = playerSnake.initialSpeed;
    playerSnake.horizontalVelocity = 0;
    playerSnake.verticalVelocity = 0;
    moveIsAvaliable = true;
    playerSnake.score = 0;
    playerSnake.tailLength = 2;
    playerSnake.snakeBody.length = 0;
    playerSnake.x = (canvas.width / blockSize / 2) * blockSize;
    playerSnake.y = (canvas.height / blockSize / 2) * blockSize;
    food.respawn();
};
let animationId;
const horizontalBlocks = 20;
const blockSize = canvas.width / horizontalBlocks;
let moveIsAvaliable = true;
const gameOver = () => {
    if (playerSnake.horizontalVelocity == 0 &&
        playerSnake.verticalVelocity == 0) {
        return false;
    }
    if (playerSnake.x < 0 ||
        playerSnake.x >= canvas.width ||
        playerSnake.y < 0 ||
        playerSnake.y >= canvas.height) {
        drawGameOver();
        gameOverSound.play();
        showButton();
        return true;
    }
    if (colision()) {
        drawGameOver();
        gameOverSound.play();
        showButton();
        return true;
    }
    return false;
};
export const drawScore = () => {
    scoreElement.innerText = `Score: ${playerSnake.score}`;
};
// ========== Control ==========
const keyDown = (event) => {
    if (!moveIsAvaliable) {
        return;
    }
    moveIsAvaliable = false;
    switch (event.keyCode) {
        case 37:
            if (playerSnake.horizontalVelocity > 0)
                break;
            playerSnake.verticalVelocity = 0;
            playerSnake.horizontalVelocity = -blockSize;
            break;
        case 38:
            if (playerSnake.verticalVelocity > 0)
                break;
            playerSnake.verticalVelocity = -blockSize;
            playerSnake.horizontalVelocity = 0;
            break;
        case 39:
            if (playerSnake.horizontalVelocity < 0)
                break;
            playerSnake.verticalVelocity = 0;
            playerSnake.horizontalVelocity = blockSize;
            break;
        case 40:
            if (playerSnake.verticalVelocity < 0)
                break;
            playerSnake.verticalVelocity = blockSize;
            playerSnake.horizontalVelocity = 0;
            break;
    }
};
document.body.addEventListener('keydown', keyDown);
// ========== Instances ==========
const food = new Food(Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize, Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize, blockSize - 2);
const playerSnake = new Snake((canvas.width / blockSize / 2) * blockSize, (canvas.height / blockSize / 2) * blockSize, blockSize - 2, blockSize - 2, food);
// ========== Initialize ==========
animate();
