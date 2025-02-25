"use client";
import {
  BLACK_PAWN_POSSIBLE_MOVES,
  chessPiece,
  CONSTANT_NUMBER_ONE,
  CONSTANT_NUMBER_SIX,
  KILL_POSSIBLE_COLOR,
  POSSIBLE_COLOR,
  WHITE_COLOR_PIECE,
  WHITE_PAWN_POSSIBLE_MOVES,
} from "@/app/contants";
import { kingPossibleMoves } from "@/app/PossibleMoves/kingPossibleMoves";
import { knightPossibleMoves } from "@/app/PossibleMoves/knightPossibleMoves";
import { pawnPossibleMoves } from "@/app/PossibleMoves/pawnPossibleMovies";
import { possibleMoves } from "@/app/PossibleMoves/possiblemoves";
import {
  addChessBoard,
  addCurrentSelectedPiece,
  setKillablePiece,
  setKilledPiecesList,
  setMovedMovesArray,
} from "@/app/Slice/chessBoardMatrix";
import { useAppSelector } from "@/app/Slice/ReduxStore";
import { useCallback, useMemo, useState } from "react";
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
  const { currentSelectedPiece, killablePiece, countForWhiteOrBlackMove } =
    useAppSelector((store) => store.ChessBoardMatrix);

  const handleKillMove = useCallback(() => {
    const killedPiece = chessObj;
    const killer = killablePiece;
    if (!killedPiece || !killer || !chessBoard) return;
    const updatedMatrix = chessBoard.map((row) => {
      return row.map((column) => ({
        ...column,
        possibleMoveColor: "",
      }));
    });
    dispatch(setKilledPiecesList(chessObj));
    dispatch(setMovedMovesArray(chessObj));

    updatedMatrix[killedPiece.i][killedPiece.j] = {
      ...updatedMatrix[killedPiece.i][killedPiece.j],
      chessPiece: killer.chessPiece || "",
      color: killer.color,
    };

    updatedMatrix[killer.i][killer.j] = {
      ...updatedMatrix[killer.i][killer.j],
      chessPiece: "",
    };
    dispatch(addChessBoard(updatedMatrix));
  }, [chessBoard, chessObj, dispatch, killablePiece]);

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
        dispatch(setMovedMovesArray(chessObj));
        dispatch(addChessBoard(updatedMatrix));
        dispatch(addCurrentSelectedPiece(null));
      }
    }
  }, [chessBoard, chessObj, currentSelectedPiece, dispatch]);

  const PAWN_POSSIBLE_MOVES = useMemo(() => {
    if (chessObj.color === WHITE_COLOR_PIECE) {
      return chessObj.i === CONSTANT_NUMBER_SIX
        ? WHITE_PAWN_POSSIBLE_MOVES
        : WHITE_PAWN_POSSIBLE_MOVES.slice(0, 3);
    } else {
      return chessObj.i === CONSTANT_NUMBER_ONE
        ? BLACK_PAWN_POSSIBLE_MOVES
        : BLACK_PAWN_POSSIBLE_MOVES.slice(0, 3);
    }
  }, [chessObj.color, chessObj.i]);

  const handlPawnPossibleMoves = useCallback(() => {
    const updatedMatrix = pawnPossibleMoves({
      chessBoard,
      chessObj,
      PAWN_POSSIBLE_MOVES,
    });
    dispatch(addChessBoard(updatedMatrix));
  }, [PAWN_POSSIBLE_MOVES, chessBoard, chessObj, dispatch]);

  const isWhiteTurn = countForWhiteOrBlackMove % 2 === 0;
  const isBlackTurn = !isWhiteTurn;

  const handleKingPossibleMoves = useCallback(() => {
    const updatedMatrix = kingPossibleMoves({ chessBoard, chessObj });
    dispatch(addChessBoard(updatedMatrix));
  }, [chessBoard, chessObj, dispatch]);

  const handleQueenPossibleMoves = useCallback(() => {
    const updatedMatrix = possibleMoves({ chessObj, chessBoard });
    dispatch(addChessBoard(updatedMatrix));
  }, [chessBoard, chessObj, dispatch]);

  const handleKnightPossibleMoves = useCallback(() => {
    const updatableMatrix = knightPossibleMoves({ chessObj, chessBoard });
    dispatch(addChessBoard(updatableMatrix));
  }, [chessBoard, chessObj, dispatch]);

  const handlePieceClick = useCallback(() => {
    if (chessObj.possibleMoveColor === POSSIBLE_COLOR) {
      handleMove();
      return;
    }

    if (
      chessObj.possibleMoveColor === KILL_POSSIBLE_COLOR &&
      chessObj.chessPiece
    ) {
      handleKillMove();
      return;
    }

    if (
      (isWhiteTurn && chessObj.color !== "white") ||
      (isBlackTurn && chessObj.color !== "black")
    ) {
      return;
    }

    dispatch(addCurrentSelectedPiece(chessObj));
    dispatch(setKillablePiece(chessObj));

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
        break;
    }
  }, [
    chessObj,
    dispatch,
    handlPawnPossibleMoves,
    handleKillMove,
    handleKingPossibleMoves,
    handleKnightPossibleMoves,
    handleMove,
    handleQueenPossibleMoves,
    isBlackTurn,
    isWhiteTurn,
  ]);

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
    </h1>
  );
};
export default Box;
