import { chessPiece, KNIGHT_POSSIBLE_MOVES } from "../contants";
interface IPossibleMoves {
  chessObj: chessPiece;
  chessBoard: chessPiece[][];
}

export const knightPossibleMoves = ({
  chessObj,
  chessBoard,
}: IPossibleMoves): chessPiece[][] => {
  const updatedMatrix = chessBoard.map((row) =>
    row.map((column) => ({ ...column, possibleMoveColor: "" }))
  );

  const updatableMatrix = [...updatedMatrix];

  KNIGHT_POSSIBLE_MOVES.forEach(({ dx, dy }) => {
    const x = chessObj.i + dx;
    const y = chessObj.j + dy;
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      const possiblePiece = updatableMatrix[x][y];
      if (possiblePiece.chessPiece === "") {
        updatableMatrix[x][y].possibleMoveColor = "#B9CA43";
      } else if (
        possiblePiece.chessPiece !== "" &&
        possiblePiece.color !== chessObj?.color
      ) {
        possiblePiece.possibleMoveColor = "#FF6666";
      }
    }
  });
  return updatableMatrix;
};
