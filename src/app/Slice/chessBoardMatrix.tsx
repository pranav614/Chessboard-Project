import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chessPiece } from "@/app/contants";
interface ChessBoardMatrixState {
  chessBoard: chessPiece[][];
  currentSelectedPiece: chessPiece | null;
  killedPieces: chessPiece[];
  killablePiece: chessPiece | null;
  killedList: chessPiece[];
}

const initialState: ChessBoardMatrixState = {
  chessBoard: [],
  currentSelectedPiece: null,
  killedPieces: [],
  killablePiece: null,
  killedList: [],
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
    addKilledPieces: (state, action: PayloadAction<chessPiece>) => {
      state.killedPieces = [...state.killedPieces, action.payload];
    },
    setKillablePiece: (state, action: PayloadAction<chessPiece | null>) => {
      state.killablePiece = action.payload;
    },
    setKilledList: (state, action: PayloadAction<chessPiece>) => {
      state.killedList = [...state.killedList, action.payload];
    },
  },
});

export const {
  addChessBoard,
  addCurrentSelectedPiece,
  setKillablePiece,
  addKilledPieces,
  setKilledList,
} = chessBoardMatrix.actions;
export default chessBoardMatrix.reducer;
