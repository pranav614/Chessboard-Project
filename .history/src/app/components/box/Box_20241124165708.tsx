"use client";

import { BISHOB_POSSIBLE_MOVES, chessPiece, QUEEN_POSSIBLE_MOVES, ROOK_POSSIBLE_MOVES } from "@/app/contants";
import { possibleMoves, usePossibleMoves } from "@/app/customhooks/usePossiblemoves";
import {
  addChessBoard,
  addCurrentSelectedPiece,
} from "@/app/Slice/chessBoardMatrix";
import { useAppSelector } from "@/app/Slice/ReduxStore";
import { useCallback } from "react";
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

  const handleKingPossibleMoves = useCallback(() => {}, []);
  const handleQueenPossibleMoves = () => {
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
    possibleMoves(chessObj,chessBoard)
  };
  const handleBishopPossibleMoves = useCallback(() => {
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
    BISHOB_POSSIBLE_MOVES.map(({ dx, dy }) => {
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
  }, [chessBoard, chessObj.boxcolorNumber, chessObj.chessPiece, chessObj.color, chessObj.i, chessObj.index, chessObj.j, chessObj.possibleMoveColor, dispatch]);
  const handleKnightPossibleMoves = useCallback(() => {}, []);


  const handleRookPossibleMoves = useCallback(() => {
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
    ROOK_POSSIBLE_MOVES.map(({ dx, dy }) => {
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
  }, [chessBoard, chessObj.boxcolorNumber, chessObj.chessPiece, chessObj.color, chessObj.i, chessObj.index, chessObj.j, chessObj.possibleMoveColor, dispatch]);

  const handlePieceClick = () => {
    console.log(chessObj.chessPiece);
    switch (chessObj.chessPiece) {
      case "P":
        handlPawnPossibleMoves();
        break;
      case "K":
        handleKingPossibleMoves();
        break;
      case "Q":
        handleQueenPossibleMoves();
        break;
      case "B":
        handleBishopPossibleMoves();
        break;
        case "R":
          handleRookPossibleMoves();
      case "N":
        handleKnightPossibleMoves();
        break;
        break;
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