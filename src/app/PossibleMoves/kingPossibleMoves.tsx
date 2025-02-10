import {
  chessPiece,
  KING_POSSIBLE_MOVES,
  KNIGHT_POSSIBLE_MOVES,
} from "../contants";
interface IPossibleMoves {
  chessObj: chessPiece;
  chessBoard: chessPiece[][];
}

export const kingPossibleMoves = ({
  chessObj,
  chessBoard,
}: IPossibleMoves): chessPiece[][] => {
  const updatableMatrix = chessBoard.map((row) =>
    row.map((column) => ({ ...column, possibleMoveColor: "" }))
  );
  const updatedMatrix = [...updatableMatrix];
  KING_POSSIBLE_MOVES.forEach(({ dx, dy }) => {
    const x = chessObj.i + dx;
    const y = chessObj.j + dy;
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      const possiblePiece = updatableMatrix[x][y];
      if (
        possiblePiece.chessPiece === "" &&
        possiblePiece.possibleMoveColor === ""
      ) {
        updatableMatrix[x][y].possibleMoveColor = "#B9CA43";
      } else if (
        possiblePiece.chessPiece !== "" &&
        possiblePiece.color !== chessObj?.color
      ) {
        possiblePiece.possibleMoveColor = "#FF6666";
      }
    }
  });
  return updatedMatrix;
};
