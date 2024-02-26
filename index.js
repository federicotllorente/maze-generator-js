const LOOP_INTERVAL = 100

const GRID_COLS = 20
const GRID_ROWS = 20

const CELL_SIZE = window.innerHeight < window.innerWidth
  ? (window.innerHeight - 16) / GRID_ROWS
  : (window.innerWidth - 16) / GRID_COLS

let int, canvas
const grid = []

class Cell {
  constructor(x, y) {
    // Location
    this.x = x
    this.y = y

    this.show = function() {
      // Print cell walls
      const ctx = canvas.getContext('2d')
      // ctx.fillStyle = 'rgb(255, 0, 255)'
      ctx.strokeStyle = 'rgb(255, 255, 255)'
      ctx.lineWidth = 1
      // ctx.strokeRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      // ctx.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1)

      // Draw top wall
      ctx.beginPath()
      ctx.moveTo(this.x * CELL_SIZE, this.y * CELL_SIZE)
      ctx.lineTo((this.x + 1) * CELL_SIZE, this.y * CELL_SIZE)
      ctx.stroke()

      // Draw bottom wall
      ctx.beginPath()
      ctx.moveTo(this.x * CELL_SIZE, (this.y + 1) * CELL_SIZE)
      ctx.lineTo((this.x + 1) * CELL_SIZE, (this.y + 1) * CELL_SIZE)
      ctx.stroke()

      // Draw left wall
      ctx.beginPath()
      ctx.moveTo(this.x * CELL_SIZE, this.y * CELL_SIZE)
      ctx.lineTo(this.x * CELL_SIZE, (this.y + 1) * CELL_SIZE)
      ctx.stroke()

      // Draw right wall
      ctx.beginPath()
      ctx.moveTo((this.x + 1) * CELL_SIZE, this.y * CELL_SIZE)
      ctx.lineTo((this.x + 1) * CELL_SIZE, (this.y + 1) * CELL_SIZE)
      ctx.stroke()
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
