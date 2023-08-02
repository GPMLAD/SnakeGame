import { canvas, c } from './canvas.js';

export class Food {
  x: number;
  y: number;
  blockSize: number;

  constructor(x: number, y: number, blockSize: number) {
    this.x = x;
    this.y = y;
    this.blockSize = blockSize;
  }

  draw = () => {
    c.fillStyle = 'red';
    c.fillRect(this.x, this.y, this.blockSize, this.blockSize);
  };

  respawn = () => {
    this.x =
      Math.floor(Math.random() * (canvas.width / (this.blockSize + 2))) *
      (this.blockSize + 2);
    this.y =
      Math.floor(Math.random() * (canvas.height / (this.blockSize + 2))) *
      (this.blockSize + 2);
  };
}
