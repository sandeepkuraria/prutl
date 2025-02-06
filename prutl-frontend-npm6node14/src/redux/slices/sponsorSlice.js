// prutl-frontend-npm6node14/src/redux/slices/sponsorSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllSponsors,
  fetchSponsorById,
  createSponsor,
  updateSponsorById,
  deleteSponsorById
} from '../../utils/api';

export const getAllSponsors = createAsyncThunk('sponsors/getAllSponsors', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllSponsors();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getSponsorById = createAsyncThunk('sponsors/getSponsorById', async (sponsorId, { rejectWithValue }) => {
  try {
    const response = await fetchSponsorById(sponsorId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewSponsor = createAsyncThunk('sponsors/createNewSponsor', async (data, { rejectWithValue }) => {
  try {
    const response = await createSponsor(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateSponsor = createAsyncThunk('sponsors/updateSponsor', async ({ sponsorId, data }, { rejectWithValue }) => {
  try {
    const response = await updateSponsorById(sponsorId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteSponsor = createAsyncThunk('sponsors/deleteSponsor', async (sponsorId, { rejectWithValue }) => {
  try {
    await deleteSponsorById(sponsorId);
    return sponsorId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const sponsorSlice = createSlice({
  name: 'sponsors',
  initialState: {
    sponsors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSponsors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSponsors.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsors = action.payload;
      })
      .addCase(getAllSponsors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSponsorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSponsorById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sponsors.findIndex(sponsor => sponsor.sponsor_id === action.payload.sponsor_id);
        if (index >= 0) {
          state.sponsors[index] = action.payload;
        } else {
          state.sponsors.push(action.payload);
        }
      })
      .addCase(getSponsorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewSponsor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSponsor.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsors.push(action.payload);
      })
      .addCase(createNewSponsor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSponsor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSponsor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sponsors.findIndex(sponsor => sponsor.sponsor_id === action.payload.sponsor_id);
        if (index !== -1) {
          state.sponsors[index] = action.payload;
        }
      })
      .addCase(updateSponsor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSponsor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSponsor.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsors = state.sponsors.filter(sponsor => sponsor.sponsor_id !== action.payload);
      })
      .addCase(deleteSponsor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sponsorSlice.reducer;
