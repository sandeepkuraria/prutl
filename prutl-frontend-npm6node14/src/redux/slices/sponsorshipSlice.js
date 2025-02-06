// prutl-frontend-npm6node14/src/redux/slices/sponsorshipSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllSponsorships,
  fetchSponsorshipById,
  createSponsorship,
  updateSponsorshipById,
  deleteSponsorshipById,
} from '../../utils/api';

export const getAllSponsorships = createAsyncThunk('sponsorships/getAllSponsorships', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllSponsorships();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getSponsorshipById = createAsyncThunk('sponsorships/getSponsorshipById', async (sponsorshipId, { rejectWithValue }) => {
  try {
    const response = await fetchSponsorshipById(sponsorshipId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewSponsorship = createAsyncThunk('sponsorships/createNewSponsorship', async (data, { rejectWithValue }) => {
  try {
    const response = await createSponsorship(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateSponsorship = createAsyncThunk('sponsorships/updateSponsorship', async ({ sponsorshipId, data }, { rejectWithValue }) => {
  try {
    const response = await updateSponsorshipById(sponsorshipId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteSponsorship = createAsyncThunk('sponsorships/deleteSponsorship', async (sponsorshipId, { rejectWithValue }) => {
  try {
    await deleteSponsorshipById(sponsorshipId);
    return sponsorshipId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const sponsorshipSlice = createSlice({
  name: 'sponsorships',
  initialState: {
    sponsorships: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSponsorships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSponsorships.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsorships = action.payload;
      })
      .addCase(getAllSponsorships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSponsorshipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSponsorshipById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sponsorships.findIndex(sponsorship => sponsorship.sponsorship_id === action.payload.sponsorship_id);
        if (index >= 0) {
          state.sponsorships[index] = action.payload;
        } else {
          state.sponsorships.push(action.payload);
        }
      })
      .addCase(getSponsorshipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewSponsorship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSponsorship.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsorships.push(action.payload);
      })
      .addCase(createNewSponsorship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSponsorship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSponsorship.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sponsorships.findIndex(sponsorship => sponsorship.sponsorship_id === action.payload.sponsorship_id);
        if (index !== -1) {
          state.sponsorships[index] = action.payload;
        }
      })
      .addCase(updateSponsorship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSponsorship.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSponsorship.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsorships = state.sponsorships.filter(sponsorship => sponsorship.sponsorship_id !== action.payload);
      })
      .addCase(deleteSponsorship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sponsorshipSlice.reducer;
