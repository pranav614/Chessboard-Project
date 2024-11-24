import { chessPiece, QUEEN_POSSIBLE_MOVES } from "../contants";
interface IPossibleMoves{
    chessObj:chessPiece
    chessBoard:chessPiece[][]
}
export const possibleMoves = ({ chessObj, chessBoard }: IPossibleMoves) => {
    const updatedMatrix = chessBoard.map((row) =>
      row.map((column) => ({ ...column, possibleMoveColor: "" }))
    );
  
    const updatableMatrix = updatedMatrix.map(row =>
      row.map(cell => ({ ...cell }))
    );
  
    QUEEN_POSSIBLE_MOVES.forEach(({ dx, dy }) => {
      let x = chessObj?.i;
      let y = chessObj?.j;
  
      while (true) {
        x += dx;
        y += dy;
  
        // Check boundaries BEFORE accessing matrix
        if (x < 0 || x >= 8 || y < 0 || y >= 8) break;
  
        const targetElem = updatableMatrix[x][y];
  
        if (targetElem.chessPiece === "") {
          targetElem.possibleMoveColor = "#B9CA43";
        } else {
          break;
        }
      }
    });
  
    return updatableMatrix;
  };
  