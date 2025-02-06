import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllParkingAreas,
  fetchParkingAreaById,
  createParkingArea,
  updateParkingAreaById,
  deleteParkingAreaById,
} from '../../utils/api';

// Async thunks
export const getAllParkingAreas = createAsyncThunk(
  'parkingAreas/getAllParkingAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllParkingAreas();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getParkingAreaById = createAsyncThunk(
  'parkingAreas/getParkingAreaById',
  async (parkingAreaId, { rejectWithValue }) => {
    try {
      const response = await fetchParkingAreaById(parkingAreaId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewParkingArea = createAsyncThunk(
  'parkingAreas/createNewParkingArea',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createParkingArea(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateParkingArea = createAsyncThunk(
  'parkingAreas/updateParkingArea',
  async ({ parkingAreaId, data }, { rejectWithValue }) => {
    try {
      const response = await updateParkingAreaById(parkingAreaId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteParkingArea = createAsyncThunk(
  'parkingAreas/deleteParkingArea',
  async (parkingAreaId, { rejectWithValue }) => {
    try {
      await deleteParkingAreaById(parkingAreaId);
      return parkingAreaId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Parking area slice
const parkingAreaSlice = createSlice({
  name: 'parkingAreas',
  initialState: {
    parkingAreas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllParkingAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllParkingAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.parkingAreas = action.payload;
      })
      .addCase(getAllParkingAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getParkingAreaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParkingAreaById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.parkingAreas.findIndex(
          (area) => area.parking_area_id === action.payload.parking_area_id
        );
        if (index >= 0) {
          state.parkingAreas[index] = action.payload;
        } else {
          state.parkingAreas.push(action.payload);
        }
      })
      .addCase(getParkingAreaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewParkingArea.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewParkingArea.fulfilled, (state, action) => {
        state.loading = false;
        state.parkingAreas.push(action.payload);
      })
      .addCase(createNewParkingArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateParkingArea.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParkingArea.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.parkingAreas.findIndex(
          (area) => area.parking_area_id === action.payload.parking_area_id
        );
        if (index !== -1) {
          state.parkingAreas[index] = action.payload;
        }
      })
      .addCase(updateParkingArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteParkingArea.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParkingArea.fulfilled, (state, action) => {
        state.loading = false;
        state.parkingAreas = state.parkingAreas.filter(
          (area) => area.parking_area_id !== action.payload
        );
      })
      .addCase(deleteParkingArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default parkingAreaSlice.reducer;