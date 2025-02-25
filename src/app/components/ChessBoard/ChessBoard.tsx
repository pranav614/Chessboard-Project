import {
  chessPiece,
  BASE_WHITE_PIECES,
  FRONT_LINE_PIECES,
} from "@/app/contants";
import Box from "../box/Box";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addChessBoard } from "@/app/Slice/chessBoardMatrix";
import Loader from "../Loader/Loader";
import { useAppSelector } from "@/app/Slice/ReduxStore";
// import Timer from "../Timer/Timer";
const ChessBoard = () => {
  const dispatch = useDispatch();
  const chessBoard: chessPiece[][] = useAppSelector(
    (store) => store.ChessBoardMatrix.chessBoard
  );
  // const { killedPiecesList } = useAppSelector(
  //   (store) => store.ChessBoardMatrix
  // );

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
    <div>
      <h1 className="flex justify-center w-full p-5">Chess Game</h1>
      <div
        className="grid grid-cols-2 gap-5"
        style={{
          gridTemplateColumns: "4fr 1fr 1fr",
          justifyContent: "flex-start",
        }}
      >
        <div className="flex  justify-end">
          <div className="grid grid-cols-8 w-[60%] border border-[#d7b8a0] justify-end">
            {updatedMatrix.map((row, rowIndex) =>
              row.map((column, colIndex) => (
                <div style={{ position: "relative" }} key={column.index}>
                  <Box chessObj={column} chessBoard={chessBoard} />
                  {/* <p
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "3px",
                      fontSize: "12px",
                    }}
                  >
                    {colIndex === 0 && <span>{colIndex}</span>}
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      left: "3px",
                      fontSize: "12px",
                    }}
                  >
                    {rowIndex === 7 && <span>{rowIndex}</span>}
                  </p> */}
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col gap-5">
            {/* {killedPiecesList.map((piece, index) => (
              <div key={index}>
                <span style={{ color: piece.color }}>{piece.chessPiece}</span>
              </div>
            ))} */}
          </div>
        </div>
        <div className="border border-1 flex justify-center items-center">
          {/* <Timer /> */}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
