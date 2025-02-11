import { chessPiece } from "../contants";
interface IMoves {
  dx: number;
  dy: number;
}
interface IPossibleMoves {
  chessObj: chessPiece;
  chessBoard: chessPiece[][];
  PAWN_POSSIBLE_MOVES: IMoves[];
}

export const pawnPossibleMoves = ({
  chessObj,
  chessBoard,
  PAWN_POSSIBLE_MOVES,
}: IPossibleMoves): chessPiece[][] => {
  const updatableMatrix = chessBoard.map((row) =>
    row.map((column) => ({ ...column, possibleMoveColor: "" }))
  );

  const updatedMatrix = [...updatableMatrix];

  PAWN_POSSIBLE_MOVES.forEach(({ dx, dy }, index) => {
    const x = chessObj.i + dx;
    const y = chessObj.j + dy;
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      const piece = updatableMatrix[x][y];

      if (
        piece.chessPiece === "" &&
        piece.possibleMoveColor === "" &&
        (index === 0 || index === 3)
      ) {
        piece.possibleMoveColor = "#B9CA43";
      } else if (
        piece.chessPiece !== "" &&
        piece.color !== chessObj?.color &&
        (index === 1 || index === 2)
      ) {
        piece.possibleMoveColor = "#FF6666";
      }
    }
  });
  return updatableMatrix;
};
