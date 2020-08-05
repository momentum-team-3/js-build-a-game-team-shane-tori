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

//function to creat spawn points
function createSpawnPoint (x,y) {
  return {
    x: x,
    y: y,
  }
}

//Spawn Points
let rabbitSpawn = createSpawnPoint(360,720)
let spawn1 = createSpawnPoint(0,640)
let spawn2 = createSpawnPoint(0,560)
let spawn3 = createSpawnPoint(0,480)
let spawn4 = createSpawnPoint(0,400)
let spawn5 = createSpawnPoint(0,320)
let spawn6 = createSpawnPoint(0,240)
let spawn7 = createSpawnPoint(0,160)
let spawn8 = createSpawnPoint(0,80)
  

// Function to prodcue chararacter objects
function makeCharacter (x,y, width, height, color) {
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    xUpper: WIDTH - width,
    yUpper: HEIGHT - height,
    xLower: 0,
    yLower: 0,
    color: color,
  }
}

// Creation of character objects 
let rabbit = makeCharacter(360, 720, 80, 80, rabbitColor)
let wolf = makeCharacter(300, 640, 125, 80, wolfColor)
wolf.velocity = [-2,0]
let bear = makeCharacter(200, 560, 200, 80, bearColor)
bear.velocity = [-1,0]

//Array of Enemies
enemyArr = [wolf, bear]

//Function to draw characters
function drawCharacter (x, y, width, height, color) {
  let ctx = getContext ()
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}
// Function to draw objects on the screen 
function drawScreen() {
  clearScreen()
  updateBearPosition()
  updateWolfPosition()
  if (collision(rabbit, bear)) {
    window.clearInterval(animationId)
    alert(("You got eaten!"))
  }
  drawCharacter(rabbit.x, rabbit.y, rabbit.width, rabbit.height, rabbit.color)
  drawCharacter(wolf.x, wolf.y, wolf.width, wolf.height, wolf.color)
  drawCharacter(bear.x, bear.y, bear.width, bear.height, bear.color)
}

//Event handler to control movement of the rabbit via arrow keys
function keyPressListener (event) {
  if (event.key === "ArrowUp") {
      rabbit.y -= 80
  } else if (event.key === "ArrowDown") {
      rabbit.y += 80
  } else if (event.key === "ArrowLeft") {
      rabbit.x -= 10
  } else if (event.key === "ArrowRight") {
      rabbit.x += 10
  }
  if (rabbit.x >= (rabbit.xUpper + 40)) {
    rabbit.x = (rabbit.xLower - 40)
    }
  if (rabbit.x <= (rabbit.xLower - 40)) {
    rabbit.x = (rabbit.xUpper + 40)
    }
  if (rabbit.y >= (rabbit.yUpper + 40)) {
    rabbit.y = (rabbit.yLower - 40)
    }
  if (rabbit.y <= (rabbit.yLower - 40)) {
    rabbit.y = (rabbit.yUpper + 40)
    }
}

function collision (char1, char2) {
  if (char1.x < char2.x + char2.width &&
      char1.x + char1.width > char2.x &&
      char1.y < char2.y + char2.height &&
      char1.y + char1.height > char2.y) {
        return true
      } else {
        return false
      }
 }

// Update Enemy Position
function updateWolfPosition () {
  wolf.x += wolf.velocity[0]
  wolf.y += wolf.velocity[1]

  if (wolf.x >= (wolf.xUpper + 40)) {
    wolf.x = (wolf.xLower - 40)
    }
  if (wolf.x <= (wolf.xLower - 40)) {
    wolf.x = (wolf.xUpper + 40)
    }
  if (wolf.y >= (wolf.yUpper + 40)) {
    wolf.y = (wolf.yLower - 40)
    }
  if (wolf.y <= (wolf.yLower - 40)) {
    wolf.y = (wolf.yUpper + 40)
    }
}

function updateBearPosition () {
  bear.x += bear.velocity[0]
  bear.y += bear.velocity[1]

  if (bear.x >= (bear.xUpper + 40)) {
    bear.x = (bear.xLower - 40)
    }
  if (bear.x <= (bear.xLower - 40)) {
    bear.x = (bear.xUpper + 40)
    }
  if (bear.y >= (bear.yUpper + 40)) {
    bear.y = (bear.yLower - 40)
    }
  if (bear.y <= (bear.yLower - 40)) {
    bear.y = (bear.yUpper + 40)
    }
}

//Event Listner to hide menu box and start game
//

// let startButton = document.querySelector("#start-button")
// startButton.addEventListener("click", startGame)

//Event Listener for event handle keypress listener
window.addEventListener("keydown", keyPressListener)

