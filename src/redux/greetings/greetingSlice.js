import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getGreetings = createAsyncThunk('greetings/fetch', async () => {
  const greetings = await fetch('http://localhost:4000/api/greetings');
  const data = await greetings.json();
  console.log(data);
  return data;
});

const initialState = {
  greeting: '',
  error: '',
  loading: false,
};

const greetingSlice = createSlice({
  name: 'greetings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGreetings.pending, (state) => {
        const newState = { ...state, loading: true };
        return newState;
      })
      .addCase(getGreetings.fulfilled, (state, action) => {
        const newState = { ...state, greeting: action.payload, loading: false };
        return newState;
      })
      .addCase(getGreetings.rejected, (state) => {
        const newState = { ...state, error: 'Error 404. Failed to fetch the greeting message', loading: false };
        return newState;
      });
  },
});

export default greetingSlice.reducer;
