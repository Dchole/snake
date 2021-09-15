import { Cell } from "./assets/Cell.js"
import { Snake } from "./assets/Snake.js"

const canvas = document.querySelector("canvas")
export const context = canvas.getContext("2d")

canvas.width = 500
canvas.height = 500

export const cols = 20
export const rows = 20

/** @type {Cell[][]} */
export const grid = new Array(cols)

for (let i = 0; i < cols; i++) {
  grid[i] = new Array(rows)
}

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    const width = canvas.width / cols,
      height = canvas.height / rows
    grid[i][j] = new Cell(i * width, j * height, width, height)
  }
}

const snakeCells = []

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    const cell = grid[i][j]
    cell.setNeighbors()

    if (i <= 2 && j === Math.round(rows / 2)) {
      snakeCells.push(grid[i][j])
    }
  }
}

const snake = new Snake()
snake.position = snakeCells

/** @type {Cell} */
let food

function placeFood() {
  if (!food) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const cell = grid[i][j]
        if (!food) {
          food = cell.placeFood(snakeCells)
        }
      }
    }
  }
}

// Game Loop
export default function gameLoop() {
  const handle = requestAnimationFrame(gameLoop)

  context.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = grid[i][j]
      cell.draw()
      cell.updateFillColor("white")
    }
  }

  snake.draw()
  placeFood()

  if (food === snake.head) {
    snake.eat(food)
    food = null
    placeFood()
  }

  if (snake.isDead) {
    cancelAnimationFrame(handle)
  }
}
