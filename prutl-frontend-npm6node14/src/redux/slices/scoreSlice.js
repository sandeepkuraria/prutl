// prutl-frontend-npm6node14/src/redux/slices/scoreSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllScores,
  fetchScoreById,
  createScore,
  updateScoreById,
  deleteScoreById,
} from '../../utils/api';

export const getAllScores = createAsyncThunk('scores/getAllScores', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllScores();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getScoreById = createAsyncThunk('scores/getScoreById', async (scoreId, { rejectWithValue }) => {
  try {
    const response = await fetchScoreById(scoreId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewScore = createAsyncThunk('scores/createNewScore', async (data, { rejectWithValue }) => {
  try {
    const response = await createScore(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateScore = createAsyncThunk('scores/updateScore', async ({ scoreId, data }, { rejectWithValue }) => {
  try {
    const response = await updateScoreById(scoreId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteScore = createAsyncThunk('scores/deleteScore', async (scoreId, { rejectWithValue }) => {
  try {
    await deleteScoreById(scoreId);
    return scoreId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const scoreSlice = createSlice({
  name: 'scores',
  initialState: {
    scores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllScores.fulfilled, (state, action) => {
        state.loading = false;
        state.scores = action.payload;
      })
      .addCase(getAllScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getScoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScoreById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.scores.findIndex(score => score.score_id === action.payload.score_id);
        if (index >= 0) {
          state.scores[index] = action.payload;
        } else {
          state.scores.push(action.payload);
        }
      })
      .addCase(getScoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewScore.fulfilled, (state, action) => {
        state.loading = false;
        state.scores.push(action.payload);
      })
      .addCase(createNewScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.scores.findIndex(score => score.score_id === action.payload.score_id);
        if (index !== -1) {
          state.scores[index] = action.payload;
        }
      })
      .addCase(updateScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteScore.fulfilled, (state, action) => {
        state.loading = false;
        state.scores = state.scores.filter(score => score.score_id !== action.payload);
      })
      .addCase(deleteScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default scoreSlice.reducer;
