/*
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const c = canvas.getContext('2d')!;

const body = document.getElementsByTagName('body')[0];
const scoreElement = document.getElementsByTagName('h2')[0];
const button = document.createElement('button');
button.innerText = 'Try again';

const showButton = () => {
  body.appendChild(button);
  button.addEventListener('click', resetGame);
};

canvas.width = 400;
canvas.height = 400;

let reset = false;

const eatSound = new Audio('./src/sounds/eatEffect.wav');
const gameOverSound = new Audio('./src/sounds/gameOverEffect.wav');
eatSound.volume = 0.5;

const resetGame = () => {
  button.removeEventListener('click', resetGame);
  body.removeChild(button);
  initialConditions();
  animate();
};

const colision = () => {
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i];
    if (part.x == player_snake.x && part.y == player_snake.y) {
      return true;
    }
  }
  return false;
};

const drawMap = () => {
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const animate = () => {
  player_snake.update();
  if (gameOver()) return;
  drawMap();
  food.draw();
  player_snake.eatFood();
  player_snake.draw();
  drawScore();
  moveIsAvaliable = true;
  animationId = setTimeout(animate, 1000 / speed);
  if (reset) {
    clearTimeout(animationId);
    reset = false;
    initialConditions();
    setTimeout(animate, 100);
  }
};

const initialConditions = () => {
  speed = initialSpeed;
  horizontalVelocity = 0;
  verticalVelocity = 0;
  moveIsAvaliable = true;
  score = 0;
  tailLength = 2;
  snakeBody.length = 0;
  player_snake.x = (canvas.width / blockSize / 2) * blockSize;
  player_snake.y = (canvas.height / blockSize / 2) * blockSize;
  food.respawn();
};

let animationId;
const horizontalBlocks = 20;
const verticalBlocks = 20;
const blockSize = canvas.width / horizontalBlocks;

const initialSpeed = 2;
let speed = initialSpeed;
let horizontalVelocity = 0;
let verticalVelocity = 0;
let moveIsAvaliable = true;

let score = 0;

const gameOver = () => {
  if (horizontalVelocity == 0 && verticalVelocity == 0) {
    return false;
  }
  if (
    player_snake.x < 0 ||
    player_snake.x >= canvas.width ||
    player_snake.y < 0 ||
    player_snake.y >= canvas.height
  ) {
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
//colocar a info em um <scoreElement>
const drawScore = () => {
  scoreElement.innerText = `Score: ${score}`;
};

const drawGameOver = () => {
  c.fillStyle = 'white';
  c.font = '40px serif';
  c.fillText('Game Over', canvas.width / 4, canvas.height / 2);
};
// ========== Control ==========
const keyDown = (event: KeyboardEvent) => {
  if (!moveIsAvaliable) {
    return;
  }
  moveIsAvaliable = false;
  switch (event.keyCode) {
    case 37:
      if (horizontalVelocity > 0) break;
      verticalVelocity = 0;
      horizontalVelocity = -blockSize;
      break;
    case 38:
      if (verticalVelocity > 0) break;
      verticalVelocity = -blockSize;
      horizontalVelocity = 0;
      break;
    case 39:
      if (horizontalVelocity < 0) break;
      verticalVelocity = 0;
      horizontalVelocity = blockSize;
      break;
    case 40:
      if (verticalVelocity < 0) break;
      verticalVelocity = blockSize;
      horizontalVelocity = 0;
      break;
  }
};

document.body.addEventListener('keydown', keyDown);

// ========== Snake ==========
const snakeBody: SnakePart[] = [];
let tailLength = 2;

class Snake {
  x: number;
  y: number;
  w: number;
  h: number;
  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw = () => {
    for (let i = 0; i < snakeBody.length; i++) {
      c.fillStyle = `rgb(${(snakeBody.length - i) * 10},255,0)`;
      const part = snakeBody[i];
      c.fillRect(part.x, part.y, this.w, this.h);
    }

    snakeBody.push(new SnakePart(this.x, this.y));

    if (snakeBody.length > tailLength) {
      snakeBody.shift();
    }
    c.fillStyle = 'green';
    c.fillRect(this.x, this.y, this.w, this.h);
  };

  update = () => {
    this.x = this.x + horizontalVelocity;
    this.y = this.y + verticalVelocity;
  };

  eatFood = () => {
    if (this.x == food.x && this.y == food.y) {
      eatSound.play();
      tailLength++;
      score++;
      food.respawn();
      if (speed < 20 && tailLength < 21) {
        speed = Math.floor(tailLength / 2) + initialSpeed;
      }
    }
  };
}

class SnakePart {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const player_snake = new Snake(
  (canvas.width / blockSize / 2) * blockSize,
  (canvas.height / blockSize / 2) * blockSize,
  blockSize - 2,
  blockSize - 2
);
// ========== Food ==========
class Food {
  x: number;
  y: number;
  w: number;
  h: number;
  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw = () => {
    c.fillStyle = 'red';
    c.fillRect(this.x, this.y, this.w, this.h);
  };
  respawn = () => {
    this.x = Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize;
    this.y =
      Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize;
    for (let i = 0; i < snakeBody.length; i++) {
      const part = snakeBody[i];
      if (this.x == part.x && this.y == part.y) {
        this.respawn();
      }
    }
  };
}

const food = new Food(
  Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize,
  Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize,
  blockSize - 2,
  blockSize - 2
);
// ========== Initialize ==========
animate();
*/
