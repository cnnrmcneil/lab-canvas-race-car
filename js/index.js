const canvas = document.querySelector('canvas')

//canvas size
canvas.width=window.innerWidth
canvas.height=window.innerHeight

//background img
let background = new Image()
  background.src = '/images/road.png'

  //music
  var mySound;
  var myMusic;
//necessary
const ctx = canvas.getContext("2d")
var audio = document.getElementById("lifeinthefastlane");
  audio.volume=0.3;
//load background
background.onload=function(){
ctx.drawImage(background,0,0,canvas.width,canvas.height);
}

//vehicle w, h, starting location
let vehicle = {
  x:290,
  y:680,
  w:200,
  h:150,
}

// car image, replaces vehicle with car img
var car = new Image()
  car.src = '/images/car.png';
  car.onload = () => {
  ctx.drawImage(car, 0, 0,66,100)
  }
//what to do when key is pressed
window.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowUp':
      vehicle.y -=50
      break;

    case 'ArrowDown':
      vehicle.y += 50
            break;

    case 'ArrowLeft':
      vehicle.x -= 470
            break;

    case 'ArrowRight':
      vehicle.x += 470
            break;
  }
}
//roadblocks
const roadblocks= []
let speed = 0
//add roadblock to array
setInterval(() => {
  let random =Math.round(Math.random())
  console.log(roadblocks)
  roadblocks.push({
    x: 160 +(500*random),
    y:0,
    w:500,
    h:25,
    speed: speed
  })
  speed++;
}, 2000)
let pointcounter = 0
let int
//what happens each animation cycle
function animate(){
  int=window.requestAnimationFrame(animate)
  ctx.clearRect(0,0, canvas.width,canvas.height)

  //refresh background, car
  pointcounter++
  ctx.drawImage(background,0,0,canvas.width,canvas.height)
  ctx.drawImage(car,vehicle.x,vehicle.y,vehicle.w,vehicle.h)
  //draw roadblocks
  ctx.fillStyle = 'yellow'
  for (let roadblock of roadblocks){
    ctx.fillRect(roadblock.x, roadblock.y ++, roadblock.w, roadblock.h)
    detectCollision(vehicle,roadblock)
  }
  document.querySelector('body p').innerHTML = pointcounter
}
animate()

function detectCollision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.h + rect1.y > rect2.y) {
      console.log('collision')
      window.cancelAnimationFrame(int)
      // window.location.reload()
  }
  // collision detected!
}