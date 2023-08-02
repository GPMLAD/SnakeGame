import { c } from './canvas.js';
import { eatSound } from './sounds.js';
export class Snake {
    constructor(x, y, w, h, food) {
        this.snakeBody = [];
        this.tailLength = 2;
        this.score = 0;
        this.horizontalVelocity = 0;
        this.verticalVelocity = 0;
        this.initialSpeed = 2;
        this.speed = 2;
        this.draw = () => {
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
        this.update = () => {
            this.x = this.x + this.horizontalVelocity;
            this.y = this.y + this.verticalVelocity;
        };
        this.eatFood = () => {
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
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.food = food;
    }
}
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
