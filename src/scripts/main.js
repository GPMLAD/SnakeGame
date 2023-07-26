const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 400
canvas.heigth = 400

const drawMap = () => {
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.heigth)
}

const animate = () => {
  drawMap()
  food.draw()
  player_snake.update()
  player_snake.eatFood()
  player_snake.draw()
  setTimeout(animate, 1000 / speed)
}

const horizontalBlocks = 40
const verticalBlocks = 40
const blockSize = canvas.width / horizontalBlocks - 2

let speed = 10
let horizontalVelocity = 0
let verticalVelocity = 0
// ========== Control ==========
const keyDown = event => {
  switch (event.keyCode) {
    case 37:
      if (horizontalVelocity > 0) break
      verticalVelocity = 0
      horizontalVelocity = -blockSize
      break
    case 38:
      if (verticalVelocity > 0) break
      verticalVelocity = -blockSize
      horizontalVelocity = 0
      break
    case 39:
      if (horizontalVelocity < 0) break
      verticalVelocity = 0
      horizontalVelocity = blockSize
      break
    case 40:
      if (verticalVelocity < 0) break
      verticalVelocity = blockSize
      horizontalVelocity = 0
      break
  }
}

document.body.addEventListener('keydown', keyDown)

// ========== Snake ==========

class Snake {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.draw = () => {
      c.fillStyle = 'green'
      c.fillRect(this.x, this.y, blockSize, blockSize)
    }

    this.update = () => {
      this.x = this.x + horizontalVelocity
      this.y = this.y + verticalVelocity
    }

    this.eatFood = () => {
      if (this.x == food.x && this.y == food.y) {
        food.respaw()
      }
    }
  }
}

const player_snake = new Snake(
  (canvas.width / blockSize / 2) * blockSize,
  (canvas.heigth / blockSize / 2) * blockSize,
  blockSize,
  blockSize
)
// ========== Food ==========
class Food {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.draw = () => {
      c.fillStyle = 'red'
      c.fillRect(this.x, this.y, blockSize, blockSize)
    }
    this.respaw = () => {
      this.x =
        Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize
      this.y =
        Math.floor(Math.random() * (canvas.heigth / blockSize)) * blockSize
    }
  }
}

const food = new Food(
  Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize,
  Math.floor(Math.random() * (canvas.heigth / blockSize)) * blockSize,
  blockSize,
  blockSize
)
// ========== Initialize ==========
animate()
