import { MAX_COLS, MAX_ROWS } from '../Constants';
import { mainRoomData } from '../Data/cell-data';

const generateCells = () => {
  let cells = [];

  //generate entire map empty
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      let newTile = new Tile(row, col);

      mainRoomData.forEach(object => {
        if (object.row === row && object.col === col) {
          newTile = object;
        }
      });

      cells[row].push(newTile);
    }
  }
  return cells;

};

export default generateCells;

class Tile {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.name = 'empty';
    this.hasPlayer = false;
    this.walkable = true;
    this.hasAction = false;
    this.actions = [];
  }
};