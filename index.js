const LOOP_INTERVAL = 300

const GRID_COLS = 20
const GRID_ROWS = 20

const CELL_SIZE = window.innerHeight < window.innerWidth
  ? (window.innerHeight - 16) / GRID_ROWS
  : (window.innerWidth - 16) / GRID_COLS

const grid = []
const visitedCells = []
const unvisitedCells = []
let int, canvas, current

function drawLine(startX, startY, endX, endY) {
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = 'rgb(255, 255, 255)'
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
}

function getIndex(x, y) {
  if (x < 0 || y < 0 || GRID_COLS < 0) return -1
  return x + y * GRID_COLS
}

class Cell {
  constructor(x, y) {
    // Location
    this.x = x
    this.y = y

    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    }

    this.wasVisited = false
    this.unvisitedNeighbors = []

    this.show = function() {
      if (this.wasVisited) {
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgb(100, 0, 255)'
        ctx.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1)
      }

      // Draw top wall
      if (this.walls.top) {
        drawLine(
          this.x * CELL_SIZE,
          this.y * CELL_SIZE,
          (this.x + 1) * CELL_SIZE,
          this.y * CELL_SIZE
        )
      }

      // Draw right wall
      if (this.walls.right) {
        drawLine(
          (this.x + 1) * CELL_SIZE,
          this.y * CELL_SIZE,
          (this.x + 1) * CELL_SIZE,
          (this.y + 1) * CELL_SIZE
        )
      }

      // Draw bottom wall
      if (this.walls.bottom) {
        drawLine(
          this.x * CELL_SIZE,
          (this.y + 1) * CELL_SIZE,
          (this.x + 1) * CELL_SIZE,
          (this.y + 1) * CELL_SIZE
        )
      }

      // Draw left wall
      if (this.walls.left) {
        drawLine(
          this.x * CELL_SIZE,
          this.y * CELL_SIZE,
          this.x * CELL_SIZE,
          (this.y + 1) * CELL_SIZE
        )
      }
    }

    this.checkNeighbors = function() {
      const top = grid[getIndex(this.x, this.y - 1)]
      const right = grid[getIndex(this.x + 1, this.y)]
      const bottom = grid[getIndex(this.x, this.y + 1)]
      const left = grid[getIndex(this.x - 1, this.y)]

      if (top && !top.wasVisited) {
        this.unvisitedNeighbors.push(top)
      }

      if (right && !right.wasVisited) {
        this.unvisitedNeighbors.push(right)
      }

      if (bottom && !bottom.wasVisited) {
        this.unvisitedNeighbors.push(bottom)
      }

      if (left && !left.wasVisited) {
        this.unvisitedNeighbors.push(left)
      }

      if (this.unvisitedNeighbors.length) {
        return this.unvisitedNeighbors[Math.floor(Math.random() * this.unvisitedNeighbors.length)]
      }
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
  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {
      const cell = new Cell(j, i)
      grid.push(cell)
    }
  }

  current = grid[0]
}

function loop() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }

  current.wasVisited = true
  const next = current.checkNeighbors()
  if (next) {
    next.wasVisited = true
    current = next
  }
}

setup()
int = setInterval(loop, LOOP_INTERVAL)

let isPaused = false

// Start/pause/resume searching when the spacebar is tapped
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (!isPaused) {
      clearInterval(int)
      console.log('PAUSED')
      isPaused = true
    } else {
      int = setInterval(loop, LOOP_INTERVAL)
      console.log('RESUMED')
      isPaused = false
    }
  }
})
