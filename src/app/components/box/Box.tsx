"use client";
import {
  chessPiece,
  KING_POSSIBLE_MOVES,
  KNIGHT_POSSIBLE_MOVES,
} from "@/app/contants";
import { possibleMoves } from "@/app/customhooks/usePossiblemoves";
import {
  addChessBoard,
  addCurrentSelectedPiece,
} from "@/app/Slice/chessBoardMatrix";
import { useAppSelector } from "@/app/Slice/ReduxStore";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
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
    chessObj.color === "white" ? "text-[#CA5143] " : "text-black";
  const dispatch = useDispatch();
  const currentSelectedPiece = useAppSelector(
    (store) => store.ChessBoardMatrix.currentSelectedPiece
  );
  const handleMove = useCallback(() => {
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
  }, [chessBoard, chessObj, currentSelectedPiece, dispatch]);
  const handlPawnPossibleMoves = useCallback(() => {
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
  }, [
    chessBoard,
    chessObj.boxcolorNumber,
    chessObj.chessPiece,
    chessObj.color,
    chessObj.i,
    chessObj.index,
    chessObj.j,
    chessObj.possibleMoveColor,
    dispatch,
  ]);
  const handleKingPossibleMoves = useCallback(() => {
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
    KING_POSSIBLE_MOVES.forEach(({ dx, dy }) => {
      const x = chessObj.i + dx;
      const y = chessObj.j + dy;
      if ((x <= 0 || x <= 7) && (y <= 0 || y <= 7)) {
        const possiblePiece = updatableMatrix[x][y];
        if (
          possiblePiece.chessPiece === "" &&
          possiblePiece.possibleMoveColor === ""
        ) {
          updatableMatrix[x][y].possibleMoveColor = "#B9CA43";
        }
      }
    });
    dispatch(addChessBoard(updatableMatrix));
  }, [
    chessBoard,
    chessObj.boxcolorNumber,
    chessObj.chessPiece,
    chessObj.color,
    chessObj.i,
    chessObj.index,
    chessObj.j,
    chessObj.possibleMoveColor,
    dispatch,
  ]);
  const handleQueenPossibleMoves = useCallback(() => {
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
    const updatedMatrix = possibleMoves({ chessObj, chessBoard });
    dispatch(addChessBoard(updatedMatrix));
  }, [chessBoard, chessObj, dispatch]);
  const handleKnightPossibleMoves = useCallback(() => {
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
    KNIGHT_POSSIBLE_MOVES.forEach(({ dx, dy }) => {
      const x = chessObj.i + dx;
      const y = chessObj.j + dy;
      if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        const possiblePiece = updatableMatrix[x][y];
        if (possiblePiece.chessPiece === "") {
          updatableMatrix[x][y].possibleMoveColor = "#B9CA43";
        }
      }
    });
    dispatch(addChessBoard(updatableMatrix));
  }, [chessBoard, chessObj, dispatch]);
  const handlePieceClick = () => {
    switch (chessObj.chessPiece) {
      case "P":
        handlPawnPossibleMoves();
        break;
      case "K":
        handleKingPossibleMoves();
        break;
      case "Q":
      case "B":
      case "R":
        handleQueenPossibleMoves();
        break;
      case "N":
        handleKnightPossibleMoves();
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
      {/* <span>
        {chessObj.i}
        {chessObj.j}
      </span> */}
    </h1>
  );
};
export default Box;