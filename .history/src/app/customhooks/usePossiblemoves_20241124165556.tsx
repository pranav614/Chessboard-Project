import { useDispatch } from "react-redux";
import { addChessBoard, addCurrentSelectedPiece } from "../Slice/chessBoardMatrix";
import { chessPiece, QUEEN_POSSIBLE_MOVES } from "../contants";
import { useAppSelector } from "../Slice/ReduxStore";
interface IUsePossibleMoves{
    chessObj:chessPiece
}
export const possibleMoves=({chessObj}:IUsePossibleMoves)=>{
    const chessBoard: chessPiece[][] = useAppSelector(
        (store) => store.ChessBoardMatrix.chessBoard
      );
    
    const dispatch=useDispatch();
    dispatch(
        addCurrentSelectedPiece({
          i: chessObj.i,
          j: chessObj.j,
          boxcolorNumber: chessObj.boxcolorNumber,
          chessPiece: chessObj.chessPiece,
          color: chessObj.color,
          index: chessObj.index,
          possibleMoveColor: chessObj.possibleMoveColor,
        })
      );
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
      dispatch(addChessBoard(updatedMatrix));
}