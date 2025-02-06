// prutl-frontend-npm6node14/src/redux/slices/dimensionScoreSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllDimensionScores,
  fetchDimensionScoreById,
  createDimensionScore,
  updateDimensionScoreById,
  deleteDimensionScoreById,
} from '../../utils/api';

export const getAllDimensionScores = createAsyncThunk(
  'dimensionScores/getAllDimensionScores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllDimensionScores();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDimensionScoreById = createAsyncThunk(
  'dimensionScores/getDimensionScoreById',
  async (dimensionScoreId, { rejectWithValue }) => {
    try {
      const response = await fetchDimensionScoreById(dimensionScoreId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewDimensionScore = createAsyncThunk(
  'dimensionScores/createNewDimensionScore',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createDimensionScore(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDimensionScore = createAsyncThunk(
  'dimensionScores/updateDimensionScore',
  async ({ dimensionScoreId, data }, { rejectWithValue }) => {
    try {
      const response = await updateDimensionScoreById(dimensionScoreId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDimensionScore = createAsyncThunk(
  'dimensionScores/deleteDimensionScore',
  async (dimensionScoreId, { rejectWithValue }) => {
    try {
      await deleteDimensionScoreById(dimensionScoreId);
      return dimensionScoreId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dimensionScoreSlice = createSlice({
  name: 'dimensionScores',
  initialState: {
    dimensionScores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDimensionScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDimensionScores.fulfilled, (state, action) => {
        state.loading = false;
        state.dimensionScores = action.payload;
      })
      .addCase(getAllDimensionScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDimensionScoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDimensionScoreById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dimensionScores.findIndex(score => score.dimension_score_id === action.payload.dimension_score_id);
        if (index >= 0) {
          state.dimensionScores[index] = action.payload;
        } else {
          state.dimensionScores.push(action.payload);
        }
      })
      .addCase(getDimensionScoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewDimensionScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewDimensionScore.fulfilled, (state, action) => {
        state.loading = false;
        state.dimensionScores.push(action.payload);
      })
      .addCase(createNewDimensionScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDimensionScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDimensionScore.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.dimensionScores.findIndex(score => score.dimension_score_id === action.payload.dimension_score_id);
        if (index !== -1) {
          state.dimensionScores[index] = action.payload;
        }
      })
      .addCase(updateDimensionScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDimensionScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDimensionScore.fulfilled, (state, action) => {
        state.loading = false;
        state.dimensionScores = state.dimensionScores.filter(score => score.dimension_score_id !== action.payload);
      })
      .addCase(deleteDimensionScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dimensionScoreSlice.reducer;
