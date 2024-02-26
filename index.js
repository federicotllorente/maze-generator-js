const LOOP_INTERVAL = 100

const GRID_COLS = 20
const GRID_ROWS = 20

const CELL_SIZE = window.innerHeight < window.innerWidth
  ? (window.innerHeight - 16) / GRID_ROWS
  : (window.innerWidth - 16) / GRID_COLS

let int, canvas
const grid = []

function drawLine(startX, startY, endX, endY) {
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = 'rgb(255, 255, 255)'
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
}

class Cell {
  constructor(x, y) {
    // Location
    this.x = x
    this.y = y

    this.show = function() {
      // Draw top wall
      drawLine(
        this.x * CELL_SIZE,
        this.y * CELL_SIZE,
        (this.x + 1) * CELL_SIZE,
        this.y * CELL_SIZE
      )

      // Draw bottom wall
      drawLine(
        this.x * CELL_SIZE,
        (this.y + 1) * CELL_SIZE,
        (this.x + 1) * CELL_SIZE,
        (this.y + 1) * CELL_SIZE
      )

      // Draw left wall
      drawLine(
        this.x * CELL_SIZE,
        this.y * CELL_SIZE,
        this.x * CELL_SIZE,
        (this.y + 1) * CELL_SIZE
      )

      // Draw right wall
      drawLine(
        (this.x + 1) * CELL_SIZE,
        this.y * CELL_SIZE,
        (this.x + 1) * CELL_SIZE,
        (this.y + 1) * CELL_SIZE
      )
    }
  }
}

function setup() {
  // Creating the canvas
  const app = document.getElementById('app')
  canvas = document.createElement('canvas')
  canvas.width = GRID_ROWS * CELL_SIZE
  canvas.height = GRID_COLS * CELL_SIZE
  app.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgb(25, 25, 25)'
  ctx.fillRect(0, 0, GRID_ROWS * CELL_SIZE, GRID_COLS * CELL_SIZE)

  // Create cells
  for (let i = 0; i < GRID_COLS; i++) {
    for (let j = 0; j < GRID_ROWS; j++) {
      const cell = new Cell(i, j)
      grid.push(cell)
    }
  }
}

function loop() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }
}

setup()
int = setInterval(loop, LOOP_INTERVAL)
