// prutl-frontend-npm6node14/src/redux/slices/vehicleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllVehicles,
  fetchVehicleById,
  createVehicle,
  updateVehicleById,
  deleteVehicleById,
} from '../../utils/api';

// Async thunks
export const getAllVehicles = createAsyncThunk('vehicles/getAllVehicles', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllVehicles();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getVehicleById = createAsyncThunk('vehicles/getVehicleById', async (vehicleId, { rejectWithValue }) => {
  try {
    const response = await fetchVehicleById(vehicleId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewVehicle = createAsyncThunk('vehicles/createNewVehicle', async (data, { rejectWithValue }) => {
  try {
    const response = await createVehicle(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateVehicle = createAsyncThunk('vehicles/updateVehicle', async ({ vehicleId, data }, { rejectWithValue }) => {
  try {
    const response = await updateVehicleById(vehicleId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteVehicle = createAsyncThunk('vehicles/deleteVehicle', async (vehicleId, { rejectWithValue }) => {
  try {
    await deleteVehicleById(vehicleId);
    return vehicleId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Vehicle slice
const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vehicles.findIndex(vehicle => vehicle.vehicle_id === action.payload.vehicle_id);
        if (index >= 0) {
          state.vehicles[index] = action.payload;
        } else {
          state.vehicles.push(action.payload);
        }
      })
      .addCase(getVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles.push(action.payload);
      })
      .addCase(createNewVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vehicles.findIndex(vehicle => vehicle.vehicle_id === action.payload.vehicle_id);
        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.filter(vehicle => vehicle.vehicle_id !== action.payload);
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vehicleSlice.reducer;
