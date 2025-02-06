// prutl-frontend-npm6node14/src/redux/slices/passionFrameworkDimensionSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllPassionFrameworkDimensions,
  fetchPassionFrameworkDimensionById,
  createPassionFrameworkDimension,
  updatePassionFrameworkDimensionById,
  deletePassionFrameworkDimensionById,
} from '../../utils/api';

export const getAllPassionFrameworkDimensions = createAsyncThunk(
  'passionFrameworkDimensions/getAllPassionFrameworkDimensions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllPassionFrameworkDimensions();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPassionFrameworkDimensionById = createAsyncThunk(
  'passionFrameworkDimensions/getPassionFrameworkDimensionById',
  async (dimensionId, { rejectWithValue }) => {
    try {
      const response = await fetchPassionFrameworkDimensionById(dimensionId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewPassionFrameworkDimension = createAsyncThunk(
  'passionFrameworkDimensions/createNewPassionFrameworkDimension',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createPassionFrameworkDimension(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePassionFrameworkDimension = createAsyncThunk(
  'passionFrameworkDimensions/updatePassionFrameworkDimension',
  async ({ dimensionId, data }, { rejectWithValue }) => {
    try {
      const response = await updatePassionFrameworkDimensionById(dimensionId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePassionFrameworkDimension = createAsyncThunk(
  'passionFrameworkDimensions/deletePassionFrameworkDimension',
  async (dimensionId, { rejectWithValue }) => {
    try {
      await deletePassionFrameworkDimensionById(dimensionId);
      return dimensionId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const passionFrameworkDimensionSlice = createSlice({
  name: 'passionFrameworkDimensions',
  initialState: {
    passionFrameworkDimensions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPassionFrameworkDimensions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPassionFrameworkDimensions.fulfilled, (state, action) => {
        state.loading = false;
        state.passionFrameworkDimensions = action.payload;
      })
      .addCase(getAllPassionFrameworkDimensions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPassionFrameworkDimensionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPassionFrameworkDimensionById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.passionFrameworkDimensions.findIndex(dimension => dimension.dimension_id === action.payload.dimension_id);
        if (index >= 0) {
          state.passionFrameworkDimensions[index] = action.payload;
        } else {
          state.passionFrameworkDimensions.push(action.payload);
        }
      })
      .addCase(getPassionFrameworkDimensionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewPassionFrameworkDimension.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewPassionFrameworkDimension.fulfilled, (state, action) => {
        state.loading = false;
        state.passionFrameworkDimensions.push(action.payload);
      })
      .addCase(createNewPassionFrameworkDimension.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassionFrameworkDimension.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassionFrameworkDimension.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.passionFrameworkDimensions.findIndex(dimension => dimension.dimension_id === action.payload.dimension_id);
        if (index !== -1) {
          state.passionFrameworkDimensions[index] = action.payload;
        }
      })
      .addCase(updatePassionFrameworkDimension.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePassionFrameworkDimension.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePassionFrameworkDimension.fulfilled, (state, action) => {
        state.loading = false;
        state.passionFrameworkDimensions = state.passionFrameworkDimensions.filter(dimension => dimension.dimension_id !== action.payload);
      })
      .addCase(deletePassionFrameworkDimension.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default passionFrameworkDimensionSlice.reducer;
