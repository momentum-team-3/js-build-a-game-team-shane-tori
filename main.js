let canvas = document.querySelector ("#canvas")

function getContext () {
    return canvas.getContext("2d")
}

// Global Variables
const WIDTH = canvas.width
const HEIGHT = canvas.height

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

// Global Declaration of Animation ID
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

// Creation of character objects 
let rabbit = makeCharacter(360, 720, 80, 80, rabbitImage)
let carrot = makeCharacter(360, 0, 80, 80, carrotImage)
let wolf = makeCharacter(300, 640, 80, 80, catImage)
wolf.velocity = [randomVelocity(-5,5) ,0]
let bear = makeCharacter(200, 560, 80, 80, foxImage)
bear.velocity = [randomVelocity(-5,5) ,0]
let boar = makeCharacter(200, 480, 80, 80, catImage)
boar.velocity= [randomVelocity(-5,5) ,0]
let cayote = makeCharacter(200, 400, 80, 80, foxImage)
cayote.velocity= [randomVelocity(-5,5) ,0]
let lion = makeCharacter(200, 320, 80, 80, catImage)
lion.velocity = [randomVelocity(-5,5) ,0]
let fox = makeCharacter(200, 240, 80, 80, foxImage)
fox.velocity = [randomVelocity(-5,5) ,0]
let cat = makeCharacter(200, 160, 80, 80, catImage)
cat.velocity = [randomVelocity(-5,5) ,0]
let foxy = makeCharacter(200, 80, 80, 80, foxImage)
foxy.velocity = [randomVelocity(-5,5) ,0]
let foxTwo = makeCharacter(0, 240, 80, 80, foxImage)
foxTwo.velocity = [randomVelocity(-5,5) ,0]
let catTwo = makeCharacter(0, 160, 80, 80, catImage)
catTwo.velocity = [randomVelocity(-5,5) ,0]
let foxyTwo = makeCharacter(0, 80, 80, 80, foxImage)
foxyTwo.velocity = [randomVelocity(-5,5) ,0]

// Array of characters to be drawn
const characters = [rabbit, carrot, wolf, bear, boar, cayote, lion, fox, cat, foxy, foxTwo, catTwo, foxyTwo]

// Array of Enemies
const enemies = [wolf, bear, boar, cayote, lion, fox, cat, foxy, foxTwo, catTwo, foxyTwo]

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

