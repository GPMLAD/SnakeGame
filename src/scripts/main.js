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
  player_snake.update()
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
      verticalVelocity = 0
      horizontalVelocity = -blockSize
      break
    case 38:
      verticalVelocity = -blockSize
      horizontalVelocity = 0
      break
    case 39:
      verticalVelocity = 0
      horizontalVelocity = blockSize
      break
    case 40:
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
  }
}

const player_snake = new Snake(
  (canvas.width / blockSize / 2) * blockSize,
  (canvas.heigth / blockSize / 2) * blockSize,
  blockSize,
  blockSize
)

// ========== Initialize ==========
animate()
