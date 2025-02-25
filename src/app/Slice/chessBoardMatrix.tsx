import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chessPiece } from "@/app/contants";
interface ChessBoardMatrixState {
  chessBoard: chessPiece[][];
  currentSelectedPiece: chessPiece | null;
  killablePiece: chessPiece | null;
  killedPiecesList: chessPiece[];
  countForWhiteOrBlackMove: number;
  movedMovesArray: chessPiece[];
}

const initialState: ChessBoardMatrixState = {
  chessBoard: [],
  currentSelectedPiece: null,
  killablePiece: null,
  killedPiecesList: [],
  movedMovesArray: [],
  countForWhiteOrBlackMove: 0,
};
const chessBoardMatrix = createSlice({
  name: "Matrix",
  initialState,
  reducers: {
    addChessBoard: (state, action: PayloadAction<chessPiece[][]>) => {
      state.chessBoard = action.payload;
    },
    addCurrentSelectedPiece: (
      state,
      action: PayloadAction<chessPiece | null>
    ) => {
      state.currentSelectedPiece = action.payload;
    },
    setKillablePiece: (state, action: PayloadAction<chessPiece | null>) => {
      state.killablePiece = action.payload;
    },
    setKilledPiecesList: (state, action: PayloadAction<chessPiece>) => {
      state.killedPiecesList = [...state.killedPiecesList, action.payload];
    },
    setMovedMovesArray: (state, action: PayloadAction<chessPiece>) => {
      state.movedMovesArray = [...state.movedMovesArray, action.payload];
      state.countForWhiteOrBlackMove = state.movedMovesArray.length;
    },
  },
});

export const {
  addChessBoard,
  addCurrentSelectedPiece,
  setKillablePiece,
  setKilledPiecesList,
  setMovedMovesArray,
} = chessBoardMatrix.actions;
export default chessBoardMatrix.reducer;
