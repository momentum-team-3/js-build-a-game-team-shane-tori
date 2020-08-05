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
const boarColor = "rgb(120, 50, 50)"
const cayoteColor = "rgb(130, 20, 60)"
const lionColor = "rgb(90, 20, 40)"
const foxColor = "rgb(200, 95, 50)"
const catColor = "rgb(110, 80, 30)"
let animationId

/*
const rabbitImage = new Image()
rabbitImage.src = "9317247a2d60bf6ab62e4fafc1df6621.jpg"

enemyImages = [new Image(), new Image(), new Image(), new Image()]
*/

// Start Function
function startGame () {
  animationId = window.setInterval(drawScreen, 10)
  console.log("Game Started!")
}

//End Game Function
function endGame () {
  if (rabbit.y <= rabbit.yLower) {
    window.clearInterval(animationId)
    alert(("You Win!"))

  }
}

//Function to Clear Screen
function clearScreen () {
  let ctx = getContext ()
  ctx.clearRect(0,0, WIDTH, HEIGHT)
}

/*
//function to creat spawn points
function createSpawnPoint (x,y) {
  return {
    x: x,
    y: y,
    velocity: velocity,
    vx: () => spawn.velocity[0],
    vy: () => spawn.velocity[1],
  }
}

//Spawn Points
let spawn1 = createSpawnPoint(0, 640, [1,0])
let spawn2 = createSpawnPoint(0, 560, [1.5,0])
let spawn3 = createSpawnPoint(0, 480, [2,0])
let spawn4 = createSpawnPoint(0, 400, [2.5,0])
let spawn5 = createSpawnPoint(0, 320, [3,0])
let spawn6 = createSpawnPoint(0, 240, [3.5,0])
let spawn7 = createSpawnPoint(0, 160, [4,0])
let spawn8 = createSpawnPoint(0, 80, [5,0])
*/

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
wolf.velocity = [2,0]
let bear = makeCharacter(200, 560, 200, 80, bearColor)
bear.velocity = [1,0]
let boar = makeCharacter(200, 480, 180, 80, boarColor)
boar.velocity= [1.5,0]
let cayote = makeCharacter(200, 400, 130, 80, cayoteColor)
cayote.velocity= [3,0]
let lion = makeCharacter(200, 320, 160, 80, lionColor)
lion.velocity= [1,0]
let fox = makeCharacter(200, 240, 120, 80, foxColor)
fox.velocity= [4,0]
let cat = makeCharacter(200, 160, 110, 80, catColor)
cat.velocity= [2,0]


//Array of Enemies
enemyArr = [wolf, bear, boar, cayote, lion, fox, cat]

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
  updateBoarPosition()
  updateCayotePosition()
  updateLionPosition()
  updateFoxPosition()
  updateCatPosition()
  
  if (collision(rabbit, bear, wolf, boar, cayote, lion, fox, cat)) {
    window.clearInterval(animationId)
    alert(("You got eaten!"))
  }
  endGame()
  drawCharacter(rabbit.x, rabbit.y, rabbit.width, rabbit.height, rabbit.color)
  drawCharacter(wolf.x, wolf.y, wolf.width, wolf.height, wolf.color)
  drawCharacter(bear.x, bear.y, bear.width, bear.height, bear.color)
  drawCharacter(boar.x, boar.y, boar.width, boar.height, boar.color)
  drawCharacter(cayote.x, cayote.y, cayote.width, cayote.height, cayote.color)
  drawCharacter(lion.x, lion.y, lion.width, lion.height, lion.color)
  drawCharacter(fox.x, fox.y, fox.width, fox.height, fox.color)
  drawCharacter(cat.x, cat.y, cat.width, cat.height, cat.color)
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
    rabbit.x = rabbit.xLower
    }
  if (rabbit.x <= (rabbit.xLower - 40)) {
    rabbit.x = (rabbit.xUpper + 40)
    }
  if (rabbit.y >= rabbit.yUpper) {
    rabbit.y = rabbit.yUpper
    }
  if (rabbit.y <= rabbit.yLower) {
    rabbit.y = rabbit.yLower
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
    wolf.x = wolf.xLower
    }
  if (wolf.x <= (wolf.xLower - 40)) {
    wolf.x = (wolf.xUpper + 40)
    }
}

function updateBearPosition () {
  bear.x += bear.velocity[0]
  bear.y += bear.velocity[1]

  if (bear.x >= (bear.xUpper + 40)) {
    bear.x = bear.xLower
    }
  if (bear.x <= (bear.xLower - 40)) {
    bear.x = (bear.xUpper + 40)
    }
}


function updateBoarPosition () {
    boar.x += boar.velocity[0]
    boar.y += boar.velocity[1]
  
    if (boar.x >= (boar.xUpper + 40)) {
      boar.x = boar.xLower
      }
    if (boar.x <= (boar.xLower - 40)) {
      boar.x = (boar.xUpper + 40)
      }
  }
  function updateCayotePosition () {
    cayote.x += cayote.velocity[0]
    cayote.y += cayote.velocity[1]
  
    if (cayote.x >= (cayote.xUpper + 40)) {
      cayote.x = cayote.xLower
      }
    if (cayote.x <= (cayote.xLower - 40)) {
      cayote.x = (cayote.xUpper + 40)
      }
  }
  function updateLionPosition () {
    lion.x += lion.velocity[0]
    lion.y += lion.velocity[1]
  
    if (lion.x >= (lion.xUpper + 40)) {
      lion.x = lion.xLower
      }
    if (lion.x <= (lion.xLower - 40)) {
      lion.x = (lion.xUpper + 40)
      }
  }
  function updateFoxPosition () {
    fox.x += fox.velocity[0]
    fox.y += fox.velocity[1]
  
    if (fox.x >= (fox.xUpper + 40)) {
      fox.x = fox.xLower
      }
    if (fox.x <= (fox.xLower - 40)) {
      fox.x = (fox.xUpper + 40)
      }
  }
  
  function updateCatPosition () {
    cat.x += cat.velocity[0]
    cat.y += cat.velocity[1]
  
    if (cat.x >= (cat.xUpper + 40)) {
      cat.x = cat.xLower
      }
    if (cat.x <= (cat.xLower - 40)) {
      cat.x = (cat.xUpper + 40)
      }
  }
//Event Listner to hide menu box and start game
//

// let startButton = document.querySelector("#start-button")
// startButton.addEventListener("click", startGame)

//Event Listener for event handle keypress listener
window.addEventListener("keydown", keyPressListener)

