// prutl-frontend-npm6node14/src/redux/slices/awardSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllAwards,
  fetchAwardById,
  createAward,
  updateAwardById,
  deleteAwardById
} from '../../utils/api';

export const getAllAwards = createAsyncThunk('awards/getAllAwards', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllAwards();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getAwardById = createAsyncThunk('awards/getAwardById', async (awardId, { rejectWithValue }) => {
  try {
    const response = await fetchAwardById(awardId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewAward = createAsyncThunk('awards/createNewAward', async (data, { rejectWithValue }) => {
  try {
    const response = await createAward(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateAward = createAsyncThunk('awards/updateAward', async ({ awardId, data }, { rejectWithValue }) => {
  try {
    const response = await updateAwardById(awardId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteAward = createAsyncThunk('awards/deleteAward', async (awardId, { rejectWithValue }) => {
  try {
    await deleteAwardById(awardId);
    return awardId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const awardSlice = createSlice({
  name: 'awards',
  initialState: {
    awards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAwards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAwards.fulfilled, (state, action) => {
        state.loading = false;
        state.awards = action.payload;
      })
      .addCase(getAllAwards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAwardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAwardById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.awards.findIndex(award => award.award_id === action.payload.award_id);
        if (index >= 0) {
          state.awards[index] = action.payload;
        } else {
          state.awards.push(action.payload);
        }
      })
      .addCase(getAwardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewAward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewAward.fulfilled, (state, action) => {
        state.loading = false;
        state.awards.push(action.payload);
      })
      .addCase(createNewAward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAward.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.awards.findIndex(award => award.award_id === action.payload.award_id);
        if (index !== -1) {
          state.awards[index] = action.payload;
        }
      })
      .addCase(updateAward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAward.fulfilled, (state, action) => {
        state.loading = false;
        state.awards = state.awards.filter(award => award.award_id !== action.payload);
      })
      .addCase(deleteAward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default awardSlice.reducer;
