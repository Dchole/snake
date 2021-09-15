import { cols, context, grid, rows } from "../canvas.js"
import { randomCell } from "../utils.js"

export class Cell {
  #x
  #y
  #col
  #row
  #width
  #height
  #color
  #containsFood
  #neighbors

  /**
   * @constructor
   * @param {number} xPosition
   * @param {number} yPosition
   * @param {number} width
   * @param {number} height
   */
  constructor(xPosition, yPosition, width, height) {
    this.#x = xPosition
    this.#y = yPosition
    this.#col = xPosition / width
    this.#row = yPosition / height
    this.#width = width
    this.#height = height
    this.#color = "white"
    this.#containsFood = false
    this.#neighbors = []
  }

  get neighbors() {
    return this.#neighbors
  }

  /**
   * @method
   * @param { 1 | 0 | -1 } x - Adjacent side where neighbor lives.
   *                        (x = 1, means neighbor is on adjacent right.
   *                        x = -1, means neighbor is on adjacent left.)
   * @param { 1 | 0 | -1 } y - Adjacent side where neighbor lives.
   *                   (y = 1, means neighbor is on adjacent below.
   *                  y = -1, means neighbor is on adjacent above.)
   *
   * Values can't be the same
   * @example
   * getNeighbor(1, 1) ❌ // We can't access diagonal neighbor
   * getNeighbor(0, 0) ❌ // We need to move one axis to get neighbor
   * getNeighbor(1, 0) ✅ // Right neighbor is returned
   * getNeighbor(-1, 0) ✅ // Left neighbor is returned
   */
  getNeighbor(x, y) {
    if (x === y) throw new Error("X and Y should be different")
    if (x > 1 || x < -1 || y > 1 || y < -1)
      throw new Error("Neighbor is in an interval of 1")

    const row = grid[this.#col + x]
    if (!row) return
    const cell = row[this.#row + y]

    return cell
  }

  setNeighbors() {
    if (this.#col > 0) this.#neighbors.push(grid[this.#col - 1][this.#row])
    if (this.#row > 0) this.#neighbors.push(grid[this.#col][this.#row - 1])
    if (this.#col < cols - 1)
      this.#neighbors.push(grid[this.#col + 1][this.#row])
    if (this.#row < rows - 1)
      this.#neighbors.push(grid[this.#col][this.#row + 1])
  }

  draw() {
    context.beginPath()
    context.rect(this.#x, this.#y, this.#width, this.#height)
    context.fillStyle = this.#containsFood ? "green" : this.#color
    context.fill()
    context.stroke()
    context.closePath()
  }

  updateFillColor(color = "black") {
    this.#color = color
  }

  placeFood(snakeCells) {
    let cell = randomCell()

    while (snakeCells.includes(cell)) {
      cell = randomCell()
    }

    if (cell === this) {
      this.#containsFood = true
      return this
    }
  }

  eaten() {
    this.#containsFood = false
  }
}
