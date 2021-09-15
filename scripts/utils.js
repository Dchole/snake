import { cols, rows, grid } from "./canvas.js"

export function randomInt(n) {
  return Math.floor(Math.random() * n)
}

export function randomCell() {
  return grid[randomInt(cols)][randomInt(rows)]
}
