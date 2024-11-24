import { chessPiece, QUEEN_POSSIBLE_MOVES } from "../contants";
interface IPossibleMoves{
    chessObj:chessPiece
    chessBoard:chessPiece[][]
}
export const possibleMoves=(chessObj,chessBoard:IPossibleMoves)=>{
      const updatedMatrix = chessBoard.map((row) =>
        row.map((column) => ({ ...column, possibleMoveColor: "" }))
      );
      const updatableMatrix = [...updatedMatrix];
      QUEEN_POSSIBLE_MOVES.map(({ dx, dy }) => {
        let x = chessObj?.i;
        let y = chessObj?.j;
  
        while (true) {
          x += dx;
          y += dy;
          if (x < 0 || x >= 8 || y < 0 || y >= 8) break;
          const targetElem = updatedMatrix[x][y];
          if (
            targetElem.possibleMoveColor === "" &&
            targetElem.chessPiece === ""
          ) {
            updatableMatrix[x][y].possibleMoveColor = "#B9CA43";
          } else {
            break;
          }
        }
      });
      return updatableMatrix
}