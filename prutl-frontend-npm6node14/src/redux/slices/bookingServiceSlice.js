// src/redux/slices/bookingServiceSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllBookingServices,
  fetchBookingServiceById,
  createBookingService,
  updateBookingServiceById,
  deleteBookingServiceById,
} from '../../utils/api';

export const getAllBookingServices = createAsyncThunk(
  'bookingServices/getAllBookingServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllBookingServices();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBookingServiceById = createAsyncThunk(
  'bookingServices/getBookingServiceById',
  async (bookingServiceId, { rejectWithValue }) => {
    try {
      const response = await fetchBookingServiceById(bookingServiceId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewBookingService = createAsyncThunk(
  'bookingServices/createNewBookingService',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createBookingService(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBookingService = createAsyncThunk(
  'bookingServices/updateBookingService',
  async ({ bookingServiceId, data }, { rejectWithValue }) => {
    try {
      const response = await updateBookingServiceById(bookingServiceId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBookingService = createAsyncThunk(
  'bookingServices/deleteBookingService',
  async (bookingServiceId, { rejectWithValue }) => {
    try {
      await deleteBookingServiceById(bookingServiceId);
      return bookingServiceId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingServiceSlice = createSlice({
  name: 'bookingServices',
  initialState: {
    bookingServices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookingServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookingServices.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingServices = action.payload;
      })
      .addCase(getAllBookingServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookingServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingServiceById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookingServices.findIndex(
          (service) => service.booking_service_id === action.payload.booking_service_id
        );
        if (index >= 0) {
          state.bookingServices[index] = action.payload;
        } else {
          state.bookingServices.push(action.payload);
        }
      })
      .addCase(getBookingServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewBookingService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewBookingService.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingServices.push(action.payload);
      })
      .addCase(createNewBookingService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookingServices.findIndex(
          (service) => service.booking_service_id === action.payload.booking_service_id
        );
        if (index !== -1) {
          state.bookingServices[index] = action.payload;
        }
      })
      .addCase(updateBookingService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBookingService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookingService.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingServices = state.bookingServices.filter(
          (service) => service.booking_service_id !== action.payload
        );
      })
      .addCase(deleteBookingService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingServiceSlice.reducer;
