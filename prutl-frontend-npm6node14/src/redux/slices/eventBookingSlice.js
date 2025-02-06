// prutl-frontend-npm6node14/src/redux/slices/eventBookingSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllEventBookings,
  fetchEventBookingById,
  createEventBooking,
  updateEventBookingById,
  deleteEventBookingById,
} from '../../utils/api';

export const getAllEventBookings = createAsyncThunk(
  'eventBookings/getAllEventBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllEventBookings();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getEventBookingById = createAsyncThunk(
  'eventBookings/getEventBookingById',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await fetchEventBookingById(bookingId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewEventBooking = createAsyncThunk(
  'eventBookings/createNewEventBooking',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createEventBooking(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventBooking = createAsyncThunk(
  'eventBookings/updateEventBooking',
  async ({ bookingId, data }, { rejectWithValue }) => {
    try {
      const response = await updateEventBookingById(bookingId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEventBooking = createAsyncThunk(
  'eventBookings/deleteEventBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      await deleteEventBookingById(bookingId);
      return bookingId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventBookingSlice = createSlice({
  name: 'eventBookings',
  initialState: {
    eventBookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEventBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEventBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.eventBookings = action.payload;
      })
      .addCase(getAllEventBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEventBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventBookingById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.eventBookings.findIndex(
          (booking) => booking.booking_id === action.payload.booking_id
        );
        if (index >= 0) {
          state.eventBookings[index] = action.payload;
        } else {
          state.eventBookings.push(action.payload);
        }
      })
      .addCase(getEventBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewEventBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewEventBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.eventBookings.push(action.payload);
      })
      .addCase(createNewEventBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEventBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEventBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.eventBookings.findIndex(
          (booking) => booking.booking_id === action.payload.booking_id
        );
        if (index !== -1) {
          state.eventBookings[index] = action.payload;
        }
      })
      .addCase(updateEventBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEventBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEventBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.eventBookings = state.eventBookings.filter(
          (booking) => booking.booking_id !== action.payload
        );
      })
      .addCase(deleteEventBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventBookingSlice.reducer;
