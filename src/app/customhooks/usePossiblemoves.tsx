import {
  chessPiece,
  POSSIBLE_PIECE_MOVE,
} from "../contants";
interface IPossibleMoves {
  chessObj: chessPiece;
  chessBoard: chessPiece[][];
  currentSelectedPiece: chessPiece | null;
}
type ChessPiece = "Q" | "B" | "R" | "K";
export const possibleMoves = ({
  chessObj,
  chessBoard,
  // currentSelectedPiece,
}: IPossibleMoves) => {
  const updatedMatrix = chessBoard.map((row) =>
    row.map((column) => ({ ...column, possibleMoveColor: "" }))
  );
  const updatableMatrix = [...updatedMatrix];
  POSSIBLE_PIECE_MOVE[chessObj.chessPiece as ChessPiece]?.map(({ dx, dy }) => {
    let x = chessObj?.i;
    let y = chessObj?.j;
    while (true) {
      x += dx;
      y += dy;
      if (x < 0 || x >= 8 || y < 0 || y >= 8) break;
      const targetElem = updatedMatrix[x][y];
      if (targetElem.possibleMoveColor === "" && targetElem.chessPiece === "") {
        updatableMatrix[x][y].possibleMoveColor = "#B9CA43";
      } else {
        if (
          targetElem.chessPiece !== "" &&
          targetElem.color !== chessObj.color
        ) {
          updatableMatrix[x][y].possibleMoveColor = "#FF6666";
          break;
        }
        break;
      }
    }
  });
  return updatableMatrix;
};