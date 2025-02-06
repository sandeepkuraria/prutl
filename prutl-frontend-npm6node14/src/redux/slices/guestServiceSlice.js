// prutl-frontend-npm6node14/src/redux/slices/guestServiceSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllGuestServices,
  fetchGuestServiceById,
  createGuestService,
  updateGuestServiceById,
  deleteGuestServiceById,
} from '../../utils/api';

export const getAllGuestServices = createAsyncThunk(
  'guestServices/getAllGuestServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllGuestServices();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGuestServiceById = createAsyncThunk(
  'guestServices/getGuestServiceById',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await fetchGuestServiceById(serviceId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewGuestService = createAsyncThunk(
  'guestServices/createNewGuestService',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createGuestService(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGuestService = createAsyncThunk(
  'guestServices/updateGuestService',
  async ({ serviceId, data }, { rejectWithValue }) => {
    try {
      const response = await updateGuestServiceById(serviceId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGuestService = createAsyncThunk(
  'guestServices/deleteGuestService',
  async (serviceId, { rejectWithValue }) => {
    try {
      await deleteGuestServiceById(serviceId);
      return serviceId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const guestServiceSlice = createSlice({
  name: 'guestServices',
  initialState: {
    guestServices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGuestServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGuestServices.fulfilled, (state, action) => {
        state.loading = false;
        state.guestServices = action.payload;
      })
      .addCase(getAllGuestServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getGuestServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGuestServiceById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.guestServices.findIndex(
          (service) => service.service_id === action.payload.service_id
        );
        if (index >= 0) {
          state.guestServices[index] = action.payload;
        } else {
          state.guestServices.push(action.payload);
        }
      })
      .addCase(getGuestServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewGuestService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewGuestService.fulfilled, (state, action) => {
        state.loading = false;
        state.guestServices.push(action.payload);
      })
      .addCase(createNewGuestService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGuestService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGuestService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.guestServices.findIndex(
          (service) => service.service_id === action.payload.service_id
        );
        if (index !== -1) {
          state.guestServices[index] = action.payload;
        }
      })
      .addCase(updateGuestService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGuestService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGuestService.fulfilled, (state, action) => {
        state.loading = false;
        state.guestServices = state.guestServices.filter(
          (service) => service.service_id !== action.payload
        );
      })
      .addCase(deleteGuestService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default guestServiceSlice.reducer;
