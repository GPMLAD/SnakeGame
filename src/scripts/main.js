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
  player_snake.draw()
  //requestAnimationFrame(animate)
  setTimeout(animate, 1000 / speed)
}

const horizontalBlocks = 40
const verticalBlocks = 40
let speed = 10
const blockSize = canvas.width / horizontalBlocks - 2
// ========== Control ==========
const keyDown = event => {
  switch (event.keyCode) {
    case 37:
      console.log('left')
      player_snake.left()
      break
    case 38:
      console.log('up')
      player_snake.up()
      break
    case 39:
      console.log('right')
      player_snake.right()
      break
    case 40:
      console.log('down')
      player_snake.down()
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

    this.left = () => {
      this.x = this.x - blockSize
    }

    this.right = () => {
      this.x = this.x + blockSize
    }

    this.up = () => {
      this.y = this.y - blockSize
    }

    this.down = () => {
      this.y = this.y + blockSize
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
