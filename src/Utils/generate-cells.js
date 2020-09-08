import { MAX_COLS, MAX_ROWS } from '../Constants';

const generateCells = () => {
  let cells = [];

  //generate entire map empty
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      let newTile = new Tile(row, col);
      cells[row].push(newTile);
    }
  }
  return cells;
};

export default generateCells;

class Tile {
  constructor(x = 0, y = 0, name = 'empty', walkable = true, hasPlayer = false) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.hasPlayer = hasPlayer;
    this.walkable = walkable;
  }
};