const puzzleContainer = document.getElementById('puzzle-container');
const shuffleBtn = document.getElementById('shuffle-btn');
const message = document.getElementById('message');

const size = 3; // 3x3 puzzle
let tiles = [];
let emptyIndex = size * size - 1; // last tile is empty

function initTiles() {
  tiles = [];
  for(let i = 1; i < size * size; i++) {
    tiles.push(i);
  }
  tiles.push(null); // empty space
}

function render() {
  puzzleContainer.innerHTML = '';
  tiles.forEach((value, index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if(value === null) {
      tile.classList.add('empty');
    } else {
      tile.textContent = value;
      tile.addEventListener('click', () => moveTile(index));
    }
    puzzleContainer.appendChild(tile);
  });
}

function canMove(index) {
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;
  const tileRow = Math.floor(index / size);
  const tileCol = index % size;

  return (tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) ||
         (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1);
}

function moveTile(index) {
  if(canMove(index)) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    emptyIndex = index;
    render();
    if(checkWin()) {
      message.textContent = "🎉 Congratulations ! You solved it !! 🎉";
    } else {
      message.textContent = "";
    }
  }
}

function getMovableTiles() {
  let movable = [];
  for(let i = 0; i < tiles.length; i++) {
    if(canMove(i)) movable.push(i);
  }
  return movable;
}

function shuffle() {
  // Make 100 random valid moves to shuffle
  for(let i = 0; i < 100; i++) {
    const neighbors = getMovableTiles();
    const randomTile = neighbors[Math.floor(Math.random() * neighbors.length)];
    [tiles[emptyIndex], tiles[randomTile]] = [tiles[randomTile], tiles[emptyIndex]];
    emptyIndex = randomTile;
  }
  render();
  message.textContent = "";
}

function checkWin() {
  for(let i = 0; i < tiles.length - 1; i++) {
    if(tiles[i] !== i + 1) return false;
  }
  return true;
}

// Initialize game
initTiles();
render();

shuffleBtn.addEventListener('click', shuffle);
