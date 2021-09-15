// @ts-nocheck
import gameLoop from "./canvas.js"

gameLoop()

const GAME_OVER_DIALOG = document.getElementById("game-over")
const RESTART_BUTTON = GAME_OVER_DIALOG.querySelector("button")

RESTART_BUTTON.addEventListener("click", () => {
  //   gameLoop()
  GAME_OVER_DIALOG.close()
})
