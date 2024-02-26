const LOOP_INTERVAL = 100

const CANVAS_SIZE = window.innerHeight < window.innerWidth
  ? window.innerHeight - 16
  : window.innerWidth - 16

let int

function setup() {
  // Creating the canvas
  const app = document.getElementById('app')
  canvas = document.createElement('canvas')
  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE
  app.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgb(25, 25, 25)'
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
}

function loop() {
  // Do stuff...
}

setup()
int = setInterval(loop, LOOP_INTERVAL)
