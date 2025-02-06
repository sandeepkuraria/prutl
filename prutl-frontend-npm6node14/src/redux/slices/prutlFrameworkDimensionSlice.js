// prutl-frontend-npm6node14/src/redux/slices/prutlFrameworkDimensionSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllPrutlFrameworkDimensions,
  fetchPrutlFrameworkDimensionById,
  createPrutlFrameworkDimension,
  updatePrutlFrameworkDimensionById,
  deletePrutlFrameworkDimensionById,
} from '../../utils/api';

export const getAllPrutlFrameworkDimensions = createAsyncThunk(
  'prutlFrameworkDimensions/getAllPrutlFrameworkDimensions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllPrutlFrameworkDimensions();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPrutlFrameworkDimensionById = createAsyncThunk(
  'prutlFrameworkDimensions/getPrutlFrameworkDimensionById',
  async (prutlId, { rejectWithValue }) => {
    try {
      const response = await fetchPrutlFrameworkDimensionById(prutlId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewPrutlFrameworkDimension = createAsyncThunk(
  'prutlFrameworkDimensions/createNewPrutlFrameworkDimension',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createPrutlFrameworkDimension(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePrutlFrameworkDimension = createAsyncThunk(
  'prutlFrameworkDimensions/updatePrutlFrameworkDimension',
  async ({ prutlId, data }, { rejectWithValue }) => {
    try {
      const response = await updatePrutlFrameworkDimensionById(prutlId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePrutlFrameworkDimension = createAsyncThunk(
  'prutlFrameworkDimensions/deletePrutlFrameworkDimension',
  async (prutlId, { rejectWithValue }) => {
    try {
      await deletePrutlFrameworkDimensionById(prutlId);
      return prutlId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const prutlFrameworkDimensionSlice = createSlice({
  name: 'prutlFrameworkDimensions',
  initialState: {
    prutlFrameworkDimensions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPrutlFrameworkDimensions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPrutlFrameworkDimensions.fulfilled, (state, action) => {
        state.loading = false;
        state.prutlFrameworkDimensions = action.payload;
      })
      .addCase(getAllPrutlFrameworkDimensions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPrutlFrameworkDimensionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrutlFrameworkDimensionById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.prutlFrameworkDimensions.findIndex(dimension => dimension.prutl_id === action.payload.prutl_id);
        if (index >= 0) {
          state.prutlFrameworkDimensions[index] = action.payload;
        } else {
          state.prutlFrameworkDimensions.push(action.payload);
        }
      })
      .addCase(getPrutlFrameworkDimensionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewPrutlFrameworkDimension.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewPrutlFrameworkDimension.fulfilled, (state, action) => {
        state.loading = false;
        state.prutlFrameworkDimensions.push(action.payload);
      })
      .addCase(createNewPrutlFrameworkDimension.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePrutlFrameworkDimension.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrutlFrameworkDimension.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.prutlFrameworkDimensions.findIndex(dimension => dimension.prutl_id === action.payload.prutl_id);
        if (index !== -1) {
          state.prutlFrameworkDimensions[index] = action.payload;
        }
      })
      .addCase(updatePrutlFrameworkDimension.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePrutlFrameworkDimension.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePrutlFrameworkDimension.fulfilled, (state, action) => {
        state.loading = false;
        state.prutlFrameworkDimensions = state.prutlFrameworkDimensions.filter(dimension => dimension.prutl_id !== action.payload);
      })
      .addCase(deletePrutlFrameworkDimension.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default prutlFrameworkDimensionSlice.reducer;
