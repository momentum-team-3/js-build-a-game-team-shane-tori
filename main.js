let canvas = document.querySelector ("#canvas")

function getContext () {
    return canvas.getContext("2d")
}

// Global Variables
const WIDTH = canvas.width
const HEIGHT = canvas.height
let rabbit
let carrot
let enemyOne
let enemyTwo
let enemyThree
let enemyFour
let enemyFive
let enemySix
let enemySeven
let enemyEight
let enemyNine
let enemyTen
let enemyEleven

// Arrays
let characters = []
let enemies = []

// Global Declaration of Animation ID
let animationId

//Image Variables
const rabbitImage = new Image()
rabbitImage.src = "AnimalsFarmAndPuzzlePack/Characters/Rabbit_Up.png"

const foxImage = new Image()
foxImage.src = "AnimalsFarmAndPuzzlePack/Characters/Fox_Right.png"

const catImage = new Image()
catImage.src = "AnimalsFarmAndPuzzlePack/Characters/Cat_Right.png"

const rabbitDeadimg= new Image ()
rabbitDeadimg.src = "AnimalsFarmAndPuzzlePack/Characters/Rabbit_Dead.png"

const carrotImage= new Image ()
carrotImage.src = "AnimalsFarmAndPuzzlePack/Objects/Carrot.png"

// Start Function
function startGame () {

// intialize of character objects 
rabbit = makeCharacter(360, 720, 80, 80, rabbitImage, [0,0])
carrot = makeCharacter(360, 0, 80, 80, carrotImage, [0,0])
enemyOne = makeCharacter(300, 640, 80, 80, catImage, [randomVelocity(-5,5), 0])
enemyTwo = makeCharacter(200, 560, 80, 80, foxImage, [randomVelocity(-5,5), 0])
enemyThree = makeCharacter(200, 480, 80, 80, catImage, [randomVelocity(-5,5), 0])
enemyFour = makeCharacter(200, 400, 80, 80, foxImage, [randomVelocity(-5,5), 0])
enemyFive = makeCharacter(200, 320, 80, 80, catImage, [randomVelocity(-5,5), 0])
enemySix = makeCharacter(200, 240, 80, 80, foxImage, [randomVelocity(-5,5), 0])
enemySeven = makeCharacter(200, 160, 80, 80, catImage, [randomVelocity(-5,5), 0])
enemyEight = makeCharacter(200, 80, 80, 80, foxImage, [randomVelocity(-5,5), 0])
enemyNine = makeCharacter(0, 240, 80, 80, foxImage, [randomVelocity(-5,5), 0])
enemyTen = makeCharacter(0, 160, 80, 80, catImage, [randomVelocity(-5,5), 0])
enemyEleven = makeCharacter(0, 80, 80, 80, foxImage, [randomVelocity(-5,5), 0])

// intialize of character array 
characters = [rabbit, carrot, enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive, enemySix, enemySeven, enemyEight, enemyNine, enemyTen, enemyEleven]

// intialization of enemies
enemies = characters.slice(2)

animationId = window.setInterval(drawScreen, 10)
console.log("Game Started!")
}

//Function to Clear Screen
function clearScreen () {
  let ctx = getContext ()
  ctx.clearRect(0,0, WIDTH, HEIGHT)
}

// Function to prodcue chararacter objects
function makeCharacter (x,y, width, height, image, velocity) {
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
    velocity: velocity,
  }
}

//Creation of random numbers for velocity
function randomVelocity (min, max) {
  let range = max - min + 1
  let randomized = Math.floor(Math.random() * range)
  if (min + randomized === 0) {
  return 3
  } else {
      return min + randomized
  }
}

//Function to draw characters
function drawCharacter () {
  let ctx = getContext ()
  for (let char of characters) {
    ctx.drawImage(char.image, char.x, char.y, char.width, char.height)
  }
}

// Function to draw objects on the screen 
function drawScreen() {
  clearScreen()
  updateEnemyPosition()
  checkforCollisions()
  winningCollision()
  drawCharacter()
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

function detectCollision(o1, o2) {
  if (o1.x < o2.x + o2.width &&
    o1.x + o1.width > o2.x &&
    o1.y < o2.y + o2.height &&
    o1.y + o1.height > o2.y) {
      return true
    } else {
        return false
      }
}

// Rabbit/Enemy Collision 
function checkforCollisions () {
  for (let enemy of enemies) {
    if (detectCollision(rabbit, enemy)) {
        window.clearInterval(animationId)
        rabbit.image = rabbitDeadimg
        alert(("You got eaten!"))
    }
  }
}

// Rabbit/Correct Collision
function winningCollision () {
    if (detectCollision(rabbit, carrot)) {
      window.clearInterval(animationId)
      alert(("You Win!"))
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

//Event Listener for event handle keypress listener
window.addEventListener("keydown", keyPressListener)