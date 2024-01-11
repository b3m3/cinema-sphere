import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: []
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    getHistory: (state) => {
      const history = localStorage.getItem('history');

      if (history){
        state.history = JSON.parse(history);
      }
    },
    setHistory: (state, {payload}) => {
      state.history = [payload, ...state.history.filter(el => el.id !== payload.id)];
      localStorage.setItem('history', JSON.stringify(state.history));
    },
    clearHistory: (state) => {
      localStorage.removeItem('history');
      state.history = [];
    }
  }
})

export default historySlice.reducer;
export const {setHistory, getHistory, clearHistory} = historySlice.actions;