"use client";
import {
  chessPiece,
  BASE_WHITE_PIECES,
  FRONT_LINE_PIECES,
} from "@/app/contants";
import Box from "../box/Box";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addChessBoard } from "@/app/Slice/chessBoardMatrix";
import Loader from "../Loader/Loader";
import { useAppSelector } from "@/app/Slice/ReduxStore";
const ChessBoard = () => {
  const dispatch = useDispatch();
  const chessBoard: chessPiece[][] = useAppSelector(
    (store) => store.ChessBoardMatrix.chessBoard
  );

  function createChessboardMatrix(): chessPiece[][] {
    const size = 8;
    const chessboard: chessPiece[][] = [];
    for (let i = 0; i < size; i++) {
      const row: chessPiece[] = [];

      for (let j = 0; j < size; j++) {
        let piece = "";
        let color = "";

        if (i === 0) {
          piece = BASE_WHITE_PIECES[j];
          color = "black";
        } else if (i === 1) {
          piece = FRONT_LINE_PIECES[j];
          color = "black";
        } else if (i === 6) {
          piece = FRONT_LINE_PIECES[j];
          color = "white";
        } else if (i === 7) {
          piece = BASE_WHITE_PIECES[j];
          color = "white";
        }

        row.push({
          i,
          j,
          boxcolorNumber: (i + j) % 2,
          chessPiece: piece,
          color: color || "",
          index: `${i}${j}`,
          possibleMoveColor: "",
        });
      }

      chessboard.push(row);
    }

    return chessboard;
  }
  const chessboardMatrix = createChessboardMatrix();

  useEffect(() => {
    if (chessboardMatrix && chessBoard.length === 0) {
      dispatch(addChessBoard(chessboardMatrix));
    }
  }, [chessBoard, chessboardMatrix, dispatch]);

  const updatedMatrix = useMemo(() => {
    return chessBoard;
  }, [chessBoard]);

  if (updatedMatrix.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center ">
      <h1 className=" flex justify-center w-full p-5 ">Chess Game</h1>
      <div className="grid grid-cols-8 w-[48%] border border-[#d7b8a0] ">
        {updatedMatrix.map((row) =>
          row.map((column) => (
            <Box key={column.index} chessObj={column} chessBoard={chessBoard} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
