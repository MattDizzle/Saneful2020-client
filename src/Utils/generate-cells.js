import { MAX_COLS, MAX_ROWS } from '../Constants';
import cellData from '../Data/cell-data';

const generateCells = () => {
  let cells = [];
  let count = cellData.length;

  //generate entire map
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        walkable: cellData[count - 1],
      });
      count--;
    }
  }
  return cells;
};

export default generateCells;