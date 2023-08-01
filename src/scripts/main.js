const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
const span = document.getElementsByTagName('h2')[0]

canvas.width = 400
canvas.heigth = 400

const colision = () => {
  for (let i = 0; i < snakeBody.length; i++) {
    let part = snakeBody[i]
    if (part.x == player_snake.x && part.y == player_snake.y) {
      return true
    }
  }
  return false
}

const drawMap = () => {
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.heigth)
}

const animate = () => {
  player_snake.update()
  if (gameOver()) return
  drawMap()
  food.draw()
  player_snake.eatFood()
  player_snake.draw()
  //drawScore()
  moveIsAvaliable = true
  setTimeout(animate, 1000 / speed)
}

const horizontalBlocks = 20
const verticalBlocks = 20
const blockSize = canvas.width / horizontalBlocks

const initialSpeed = 10
let speed = initialSpeed
let horizontalVelocity = 0
let verticalVelocity = 0
let moveIsAvaliable = true

let score = 0

const gameOver = () => {
  if (horizontalVelocity == 0 && verticalVelocity == 0) {
    return false
  }
  if (
    player_snake.x < 0 ||
    player_snake.x >= canvas.width ||
    player_snake.y < 0 ||
    player_snake.y >= canvas.heigth
  ) {
    drawGameOver()
    return true
  }

  if (colision()) {
    drawGameOver()
    return true
  }
  return false
}
//colocar a info em um <span>
const drawScore = () => {
  c.fillStyle = 'white'
  c.font = '14px serif'
  c.fillText('Score:' + score, canvas.width - 75, 15)
  span.innerText = `Score: ${score}`
}

const drawGameOver = () => {
  c.fillStyle = 'white'
  c.font = '40px serif'
  c.fillText('Game Over', canvas.width / 4, canvas.heigth / 2)
}
// ========== Control ==========
const keyDown = event => {
  if (!moveIsAvaliable) {
    return
  }
  moveIsAvaliable = false
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
const snakeBody = []
let tailLength = 2
class Snake {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.draw = () => {
      for (let i = 0; i < snakeBody.length; i++) {
        c.fillStyle = `rgb(${(snakeBody.length - i) * 10},255,0)`
        const part = snakeBody[i]
        c.fillRect(part.x, part.y, w, h)
      }

      snakeBody.push(new SnakePart(this.x, this.y))

      if (snakeBody.length > tailLength) {
        snakeBody.shift()
      }
      c.fillStyle = 'green'
      c.fillRect(this.x, this.y, w, h)
    }

    this.update = () => {
      this.x = this.x + horizontalVelocity
      this.y = this.y + verticalVelocity
    }

    this.eatFood = () => {
      if (this.x == food.x && this.y == food.y) {
        food.respawn()
        tailLength++
        score++
        if (speed < 20 && tailLength < 21) {
          speed = Math.floor(tailLength / 2) + initialSpeed
        }
      }
    }
  }
}

class SnakePart {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

const player_snake = new Snake(
  (canvas.width / blockSize / 2) * blockSize,
  (canvas.heigth / blockSize / 2) * blockSize,
  blockSize - 2,
  blockSize - 2
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
      c.fillRect(this.x, this.y, w, h)
    }
    this.respawn = () => {
      this.x =
        Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize
      this.y =
        Math.floor(Math.random() * (canvas.heigth / blockSize)) * blockSize
      for (let i = 0; i < snakeBody.length; i++) {
        const part = snakeBody[i]
        if (this.x == part.x && this.y == part.y) {
          console.log('Deu respawn duas vezes')
          this.respawn()
        }
      }
    }
  }
}

const food = new Food(
  Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize,
  Math.floor(Math.random() * (canvas.heigth / blockSize)) * blockSize,
  blockSize - 2,
  blockSize - 2
)
// ========== Initialize ==========
animate()
