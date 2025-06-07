let grid;
let rows;
let cols;
let resolution = 20;

function setup() {
  frameRate(10)
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(30);

  // Display the current grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(0, 255, 0); // Alive cells
      } else {
        fill(0); // Dead cells
      }
      noStroke();
      rect(x, y, resolution, resolution);
    }
  }

  let newArr = make2DArray(cols, rows);

  // Calculate the next generation
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbours = countNeighbours(grid, i, j);
      let currentState = grid[i][j];

      // Apply Game of Life rules
      if (currentState == 1 && (neighbours < 2 || neighbours > 3)) {
        newArr[i][j] = 0; // Cell dies
      } else if (currentState == 0 && neighbours == 3) {
        newArr[i][j] = 1; // Cell becomes alive
      } else {
        newArr[i][j] = currentState; // Cell stays the same
      }
    }
  }

  grid = newArr;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}

function countNeighbours(grid, x, y) {
  let sum = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the current cell itself

      let newX = (x + i + cols) % cols;
      let newY = (y + j + rows) % rows;

      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        if (grid[newX] && grid[newX][newY] !== undefined) {
          sum += grid[newX][newY];
        }
      }
    }
  }
  return sum;
}

// Combined function for handling mouse and touch interactions
function handleInteraction(x, y) {
  let col = floor(x / resolution);
  let row = floor(y / resolution);

  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    grid[col][row] = 1; // Set the cell to "alive"
  }
}

function mousePressed() {
  handleInteraction(mouseX, mouseY);
}

function mouseDragged() {
  handleInteraction(mouseX, mouseY);
}

// Touch interaction for mobile
function touchStarted() {
  handleInteraction(mouseX, mouseY);
  return false;
}

function touchMoved() {
  handleInteraction(mouseX, mouseY);
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);
}
