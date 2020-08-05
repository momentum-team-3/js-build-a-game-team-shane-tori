let canvas = document.querySelector ("#canvas")

function getContext () {
    return canvas.getContext("2d")
}

// Global Variables
const WIDTH = canvas.width
const HEIGHT = canvas.height
const rabbitColor = "rgb(255 , 255, 255)"
const wolfColor = "rgb(220, 2220, 220)"
const bearColor = "rgb(165, 42, 42)"
let animationId

// Start Function
function startGame () {
  
  animationId = window.setInterval(drawScreen, 10)
  console.log("Game Started!")
}

//Function to Clear Screen
function clearScreen () {
  let ctx = getContext ()
  ctx.clearRect(0,0, WIDTH, HEIGHT)
}

// Function to prodcue chararacter objects
function makeCharacter (x, y, width, height, color) {
  let character = {
    x: x,
    y: y,
    width: width,
    height: height,
    color: color,
  }
  return character
}

// Creation of character objects 
let rabbit = makeCharacter(450, 900, 100, 100, rabbitColor)
let wolf = makeCharacter(300, 800, 125, 100, wolfColor)
let bear = makeCharacter(600, 700, 200, 100, bearColor)

//Function to draw characters
function drawCharacter (x, y, width, height, color) {
  let ctx = getContext ()
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}
// Function to draw objects on the screen 
function drawScreen() {
  clearScreen()
  drawCharacter(rabbit.x, rabbit.y, rabbit.width, rabbit.height, rabbit.color)
  drawCharacter(wolf.x, wolf.y, wolf.width, wolf.height, wolf.color)
  drawCharacter(bear.x, bear.y, bear.width, bear.height, bear.color)
}

//Event handler to control movement of the rabbit via arrow keys
function keyPressListener (event) {
  if (event.key === "ArrowUp") {
      rabbit.y -= 100
  } else if (event.key === "ArrowDown") {
      rabbit.y += 100
  } else if (event.key === "ArrowLeft") {
      rabbit.x -= 10
  } else if (event.key === "ArrowRight") {
      rabbit.x += 10
  }
}

//Event Listner to hide menu box and start game
//

// let startButton = document.querySelector("#start-button")
// startButton.addEventListener("click", startGame)

//Event Listener for event handle keypress listener
window.addEventListener("keydown", keyPressListener)

