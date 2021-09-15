import { Cell } from "./Cell.js"

export class Snake {
  #isDead
  #direction
  /** @type {Cell[]} */
  #cells

  constructor() {
    this.#cells = []
    this.#direction = "right"
    this.#isDead = false

    window.addEventListener("keydown", this.handleKeyPress)
  }

  /**
   * @method
   * @param {KeyboardEvent} event
   */
  handleKeyPress = event => {
    switch (event.key) {
      case "ArrowRight":
        if (this.#direction !== "left") this.#direction = "right"
        break
      case "ArrowLeft":
        if (this.#direction !== "right") this.#direction = "left"
        break
      case "ArrowUp":
        if (this.#direction !== "down") this.#direction = "up"
        break
      case "ArrowDown":
        if (this.#direction !== "up") this.#direction = "down"
        break

      default:
        break
    }
  }

  /**
   * @method
   * @param {Cell[]} occupyingCells
   */
  set position(occupyingCells) {
    this.#cells = [...occupyingCells].reverse()
  }

  get direction() {
    return this.#direction
  }

  get isDead() {
    return this.#isDead
  }

  get head() {
    return this.#cells[0]
  }

  move() {
    let [head, ...body] = this.#cells

    switch (this.#direction) {
      case "right":
        head = head.getNeighbor(1, 0)
        break

      case "left":
        head = head.getNeighbor(-1, 0)
        break

      case "up":
        head = head.getNeighbor(0, -1)
        break

      case "down":
        head = head.getNeighbor(0, 1)
        break

      default:
        break
    }

    body = body.map((_, index) => this.#cells[index])
    this.#cells = [head, ...body]
  }

  /**
   * @method
   * @param {Cell} food
   */
  eat(food) {
    food.eaten()

    // @ts-ignore
    const tail = this.#cells.at(-1)
    // @ts-ignore
    const beforeTail = this.#cells.at(-2)
    let newPart

    console.log(tail.neighbors, beforeTail.neighbors.includes(tail))
    const [left, top, right, bottom] = tail.neighbors

    switch (beforeTail) {
      case right:
        newPart = tail.getNeighbor(-1, 0)
        break

      case left:
        newPart = tail.getNeighbor(1, 0)
        break

      case top:
        newPart = tail.getNeighbor(0, 1)
        break

      case bottom:
        newPart = tail.getNeighbor(0, -1)
        break

      default:
        break
    }

    this.#cells.push(newPart)
  }

  draw() {
    for (const cell of this.#cells) {
      if (!cell) {
        // If a cell is undefined then we've hit the edge
        this.#isDead = true
        return
      }

      const [head, ...body] = this.#cells

      if (body.includes(head)) {
        this.#isDead = true
        return
      }

      cell.updateFillColor()
    }

    this.move()
  }
}
