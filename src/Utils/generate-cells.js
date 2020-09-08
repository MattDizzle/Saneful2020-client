import { MAX_COLS, MAX_ROWS } from '../Constants';

const generateCells = () => {
  let cells = [];

  //generate entire map empty
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      let newTile = new Tile(row, col, 'empty', true, false);
      cells[row].push(newTile);
    }
  }
  return cells;
};

export default generateCells;


class Tile {
  constructor(x, y, name, walkable, hasPlayer) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.hasPlayer = hasPlayer;
    this.walkable = walkable;

  }
};