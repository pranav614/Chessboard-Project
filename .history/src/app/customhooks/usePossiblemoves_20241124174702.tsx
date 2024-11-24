import {
  chessPiece,
  POSSIBLE_PIECE_MOVE,
  QUEEN_POSSIBLE_MOVES,
} from "../contants";
interface IPossibleMoves {
  chessObj: chessPiece;
  chessBoard: chessPiece[][];
}
type ChessPiece = "Q" | "B" | "R" | "K";
export const possibleMoves = ({ chessObj, chessBoard }: IPossibleMoves) => {
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
      if (targetElem.possibleMoveColor === "" && (targetElem.chessPiece === "" && targetElem)) {
        updatableMatrix[x][y].possibleMoveColor = "#B9CA43";
      } else {
        break;
      }
    }
  });
  return updatableMatrix;
};
