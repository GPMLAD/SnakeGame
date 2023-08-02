import { c } from './canvas.js';
import { eatSound } from './sounds.js';
import { Food } from './food.js';

export class Snake {
  x: number;
  y: number;
  w: number;
  h: number;
  food: Food;
  constructor(x: number, y: number, w: number, h: number, food: Food) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.food = food;
  }

  snakeBody: SnakePart[] = [];
  tailLength = 2;

  score = 0;

  horizontalVelocity = 0;
  verticalVelocity = 0;
  initialSpeed = 2;
  speed = 2;

  draw = () => {
    for (let i = 0; i < this.snakeBody.length; i++) {
      c.fillStyle = `rgb(${(this.snakeBody.length - i) * 10},255,0)`;
      const part = this.snakeBody[i];
      c.fillRect(part.x, part.y, this.w, this.h);
    }

    this.snakeBody.push(new SnakePart(this.x, this.y));

    if (this.snakeBody.length > this.tailLength) {
      this.snakeBody.shift();
    }
    c.fillStyle = 'green';
    c.fillRect(this.x, this.y, this.w, this.h);
  };

  update = () => {
    this.x = this.x + this.horizontalVelocity;
    this.y = this.y + this.verticalVelocity;
  };

  eatFood = () => {
    if (this.x == this.food.x && this.y == this.food.y) {
      eatSound.play();
      this.tailLength++;
      this.score++;
      this.food.respawn();
      if (this.speed < 20 && this.tailLength < 21) {
        this.speed = Math.floor(this.tailLength / 2) + this.initialSpeed;
      }
      for (let i = 0; i < this.snakeBody.length; i++) {
        const part = this.snakeBody[i];
        if (this.food.x == part.x && this.food.y == part.y) {
          this.food.respawn();
        }
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
