// prutl-frontend-npm6node14/src/redux/slices/venueSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllVenues,
  fetchVenueById,
  createVenue,
  updateVenueById,
  deleteVenueById,
} from '../../utils/api';

export const getAllVenues = createAsyncThunk(
  'venues/getAllVenues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllVenues();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVenueById = createAsyncThunk(
  'venues/getVenueById',
  async (venueId, { rejectWithValue }) => {
    try {
      const response = await fetchVenueById(venueId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewVenue = createAsyncThunk(
  'venues/createNewVenue',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createVenue(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVenue = createAsyncThunk(
  'venues/updateVenue',
  async ({ venueId, data }, { rejectWithValue }) => {
    try {
      const response = await updateVenueById(venueId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVenue = createAsyncThunk(
  'venues/deleteVenue',
  async (venueId, { rejectWithValue }) => {
    try {
      await deleteVenueById(venueId);
      return venueId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const venueSlice = createSlice({
  name: 'venues',
  initialState: {
    venues: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVenues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload;
      })
      .addCase(getAllVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getVenueById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVenueById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.venues.findIndex(
          (venue) => venue.venue_id === action.payload.venue_id
        );
        if (index >= 0) {
          state.venues[index] = action.payload;
        } else {
          state.venues.push(action.payload);
        }
      })
      .addCase(getVenueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.venues.push(action.payload);
      })
      .addCase(createNewVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVenue.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.venues.findIndex(
          (venue) => venue.venue_id === action.payload.venue_id
        );
        if (index !== -1) {
          state.venues[index] = action.payload;
        }
      })
      .addCase(updateVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = state.venues.filter(
          (venue) => venue.venue_id !== action.payload
        );
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default venueSlice.reducer;
