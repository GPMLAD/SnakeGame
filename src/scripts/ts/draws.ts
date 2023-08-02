import { c, canvas } from './canvas.js';

export const drawMap = () => {
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
};

export const drawGameOver = () => {
  c.fillStyle = 'white';
  c.font = '40px serif';
  c.fillText('Game Over', canvas.width / 4, canvas.height / 2);
};
