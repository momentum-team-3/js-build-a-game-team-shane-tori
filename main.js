let canvas = document.querySelector ("#canvas")

function getContext () {
    return canvas.getContext("2d")
}

// Global Variables
const WIDTH = canvas.width
const HEIGHT = canvas.height
/* 
const rabbitColor = "rgb(255 , 255, 255)"
const wolfColor = "rgb(220, 2220, 220)"
const bearColor = "rgb(165, 42, 42)"
const boarColor = "rgb(120, 50, 50)"
const cayoteColor = "rgb(130, 20, 60)"
const lionColor = "rgb(90, 20, 40)"
const foxColor = "rgb(200, 95, 50)"
const catColor = "rgb(110, 80, 30)"
*/
const wolfImage = new Image()
wolfImage.src= "AnimalsFarmAndPuzzlePack/Characters/Fox_Right.png"

const bearImage = new Image()
bearImage.src = "AnimalsFarmAndPuzzlePack/Characters/Cat_Right.png"

const boarImage = new Image()
boarImage.src = "AnimalsFarmAndPuzzlePack/Characters/Fox_Right.png"

const cayoteImage = new Image()
cayoteImage.src = "AnimalsFarmAndPuzzlePack/Characters/Cat_Right.png"

const lionImage = new Image()
lionImage.src= "AnimalsFarmAndPuzzlePack/Characters/Fox_Right.png"

const foxImage = new Image()
foxImage.src = "AnimalsFarmAndPuzzlePack/Characters/Cat_Right.png"

const catImage = new Image()
catImage.src = "AnimalsFarmAndPuzzlePack/Characters/Fox_Right.png"

const rabbitImage = new Image()
rabbitImage.src = "AnimalsFarmAndPuzzlePack/Characters/Rabbit_Up.png"

const foxyImage = new Image()
foxyImage.src = "AnimalsFarmAndPuzzlePack/Characters/Cat_Right.png"

const rabbitDeadimg= new Image ()
rabbitDeadimg.src = "AnimalsFarmAndPuzzlePack/Characters/Rabbit_Dead.png"

const carrotImage= new Image ()
carrotImage.src = "AnimalsFarmAndPuzzlePack/Characters/Carrot.png"

let animationId
/*
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
function makeCharacter (x,y, width, height, image) {
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    xUpper: WIDTH - width,
    yUpper: HEIGHT - height,
    xLower: 0,
    yLower: 0,
    image: image,
  }
}

// Creation of character objects 
let rabbit = makeCharacter(360, 720, 80, 80, rabbitImage)
let wolf = makeCharacter(300, 640, 125, 80, wolfImage)
wolf.velocity = [3.5,0]
let bear = makeCharacter(200, 560, 160, 80, bearImage)
bear.velocity = [1,0]
let boar = makeCharacter(200, 480, 150, 80, boarImage)
boar.velocity= [3,0]
let cayote = makeCharacter(200, 400, 130, 80, cayoteImage)
cayote.velocity= [3.5,0]
let lion = makeCharacter(200, 320, 140, 80, lionImage)
lion.velocity= [1.5,0]
let fox = makeCharacter(200, 240, 140, 80, foxImage)
fox.velocity= [4,0]
let cat = makeCharacter(200, 160, 110, 80, catImage)
cat.velocity= [3.5,0]
let foxy = makeCharacter(200, 80, 100, 80, foxyImage)
foxy.velocity= [2.5,0]

//victory area
let carrot = makeCharacter(200, 50, 90, 80, carrotImage)
carrot.velocity= [.1,0]

//Array of Enemies
const enemies = [wolf, bear, boar, cayote, lion, fox, cat, foxy]

//Function to draw characters
function drawCharacter (x, y, width, height, image) {
  let ctx = getContext ()
  ctx.drawImage(image, x, y, width, height)
 
}
/* reset game function */

// Function to draw objects on the screen 
function drawScreen() {
    let playerDead= false
  clearScreen()
  updateEnemyPosition()
  if (collision()){
      playerDead= true
    window.clearInterval(animationId)
    alert(("You got eaten!"))
  }
  
if (playerDead) { 
    drawCharacter(rabbit.x,rabbit.y, rabbit.width, rabbit.height, rabbitDeadimg)
    
}  else { drawCharacter(rabbit.x, rabbit.y, rabbit.width, rabbit.height, rabbit.image)

}
endGame()
  
  drawCharacter(wolf.x, wolf.y, wolf.width, wolf.height, wolf.image)
  drawCharacter(bear.x, bear.y, bear.width, bear.height, bear.image)
  drawCharacter(boar.x, boar.y, boar.width, boar.height, boar.image)
  drawCharacter(cayote.x, cayote.y, cayote.width, cayote.height, cayote.image)
  drawCharacter(lion.x, lion.y, lion.width, lion.height, lion.image)
  drawCharacter(fox.x, fox.y, fox.width, fox.height, fox.image)
  drawCharacter(cat.x, cat.y, cat.width, cat.height, cat.image)
  drawCharacter(foxy.x, foxy.y, foxy.width, foxy.height, foxy.image)

  drawCharacter(carrot.x, carrot.y, carrot.width, carrot.height, carrot.image)
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

function collision () {
  for (let enemy of enemies) {
  if (rabbit.x < enemy.x + enemy.width &&
    rabbit.x + rabbit.width > enemy.x &&
    rabbit.y < enemy.y + enemy.height &&
    rabbit.y + rabbit.height > enemy.y) {
        return true
      } else {
        return false
      }
  }
 }

// Update Enemy Position
function updateEnemyPosition () {
  for (let enemy of enemies) {
    enemy.x += enemy.velocity[0]
    enemy.y += enemy.velocity[1]

  if (enemy.x >= (enemy.xUpper + 40)) {
    enemy.x = enemy.xLower
    }
  if (enemy.x <= (enemy.xLower - 40)) {
    enemy.x = (enemy.xUpper + 40)
    }
}
}
/*
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
*/
//Event Listner to hide menu box and start game
//

// let startButton = document.querySelector("#start-button")
// startButton.addEventListener("click", startGame)

//Event Listener for event handle keypress listener
window.addEventListener("keydown", keyPressListener)

