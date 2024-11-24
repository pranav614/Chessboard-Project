"use client";

import { chessPiece } from "@/app/contants";
import {
  addChessBoard,
  addCurrentSelectedPiece,
} from "@/app/Slice/chessBoardMatrix";
import { useAppSelector } from "@/app/Slice/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
interface BoxProps {
  chessObj: chessPiece;
  chessBoard: chessPiece[][];
}
const boxSize = "w-full";
const Box: React.FC<BoxProps> = ({ chessObj, chessBoard }) => {
  const chessBgColor = chessObj.boxcolorNumber === 0 ? "#EBECD0" : "#6D8D4D";
  const piecePossibleMoves = chessObj.possibleMoveColor
    ? chessObj.possibleMoveColor
    : "";
  const chessColor =
    chessObj.color === "white" ? "text-[#ca5143] " : "text-black";
  const dispatch = useDispatch();

  const currentSelectedPiece = useAppSelector(
    (store) => store.ChessBoardMatrix.currentSelectedPiece
  );

  const handleMove = () => {
    const currentBox = chessObj;
    if (currentSelectedPiece && currentBox.possibleMoveColor !== "") {
      const updatedMatrix = chessBoard.map((row) => {
        const updatedColumn = row.map((column) => {
          if (
            currentBox.i === column.i &&
            currentBox.j === column.j &&
            column.possibleMoveColor !== ""
          ) {
            return {
              ...column,
              chessPiece: currentSelectedPiece.chessPiece,
              color: currentSelectedPiece.color,
              possibleMoveColor: "",
            };
          } else if (
            currentSelectedPiece &&
            currentSelectedPiece.i === column.i &&
            currentSelectedPiece.j === column.j
          ) {
            return {
              ...column,
              chessPiece: "",
              possibleMoveColor: "",
            };
          } else {
            return {
              ...column,
              possibleMoveColor: "",
            };
          }
        });
        return updatedColumn;
      });

      if (currentSelectedPiece && currentBox.possibleMoveColor !== " ") {
        dispatch(addChessBoard(updatedMatrix));
        dispatch(addCurrentSelectedPiece(null));
      }
    }
  };

  const handlPawnPossibleMoves = () => {
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

    const twoMoves = {
      i:
        chessObj.color === "white"
          ? Number(chessObj.i) - 2
          : Number(chessObj.i) + 2,
      j: Number(chessObj.j),
    };
    const oneMove = {
      i:
        chessObj.color === "white"
          ? Number(chessObj.i) - 1
          : Number(chessObj.i) + 1,
      j: Number(chessObj.j),
    };

    const updatedArray = chessBoard.map((row, _rowIndex) => {
      // if (rowIndex !== twoMoves.i && rowIndex !== oneMove.i) {
      //   return row;
      // }
      const updatedColumn = row.map((col) => {
        if (
          ((twoMoves.i === col.i && twoMoves.j === col.j) ||
            (oneMove.i === col.i && oneMove.j === col.j)) &&
          col.chessPiece === ""
        ) {
          return {
            ...col,
            possibleMoveColor: "#B9CA43",
          };
        } else {
          return {
            ...col,
            possibleMoveColor: "",
          };
        }
      });
      return updatedColumn;
    });
    dispatch(addChessBoard(updatedArray));
  };

  const handleKingPossibleMoves = () => {};
  const handleQueenPossibleMoves = () => {};
  const handleBishopPossibleMoves = () => {};
  const handleKnightPossibleMoves = () => {};

  const handleRookPossibleMoves = () => {
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

    const updatedMatrix = chessBoard.map((row, index) => {
      let chessPieceEncounterd = false;
      const updatedRow = row.map((column, _index) => {
        // if (chessPieceEncounterd) {
        //   return column;
        // }
        if (
          (chessObj.j === column.j || chessObj.i === column.i) &&
          column.chessPiece === ""
        ) {
          return {
            ...column,
            possibleMoveColor: "#B9CA43",
          };
        } else {
          if (chessObj.chessPiece !== "") {
            chessPieceEncounterd = true;
          }
          return {
            ...column,
            possibleMoveColor: "",
          };
        }
      });
      if (index === 0) {
        chessPieceEncounterd = false;
      }
      return updatedRow
    })
    console.log(updatedMatrix)
    dispatch(addChessBoard(updatedMatrix))
  };

  const handlePieceClick = () => {
    console.log(chessObj.chessPiece)
    switch (chessObj.chessPiece) {
      case "P":
        handlPawnPossibleMoves();
        break;
      case "K":
        handleKingPossibleMoves();
      case "Q":
        handleQueenPossibleMoves();
      case "B":
        handleBishopPossibleMoves();
        break
      case "N":
        handleKnightPossibleMoves();
      case "R":
        handleRookPossibleMoves();
        break
      default:
        handleMove();
    }
  };

  return (
    <h1
      className={`h-[70px] ${boxSize} bg-[${chessBgColor}] ${chessColor} flex justify-center items-center cursor-pointer`}
      onClick={handlePieceClick}
      style={{
        background: chessBgColor,
        borderWidth: piecePossibleMoves !== "" ? "3px" : "",
        borderColor:
          piecePossibleMoves !== "" ? piecePossibleMoves : "transparent",
      }}
    >
      <span>{chessObj.chessPiece}</span>
      {/* <span>{chessObj.i}{chessObj.j}</span>  */}
    </h1>
  );
};
export default Box;
