// prutl-frontend-npm6node14/src/redux/slices/hallSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllHalls,
  fetchHallById,
  createHall,
  updateHallById,
  deleteHallById,
} from '../../utils/api';

export const getAllHalls = createAsyncThunk(
  'halls/getAllHalls',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllHalls();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getHallById = createAsyncThunk(
  'halls/getHallById',
  async (hallId, { rejectWithValue }) => {
    try {
      const response = await fetchHallById(hallId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewHall = createAsyncThunk(
  'halls/createNewHall',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createHall(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHall = createAsyncThunk(
  'halls/updateHall',
  async ({ hallId, data }, { rejectWithValue }) => {
    try {
      const response = await updateHallById(hallId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteHall = createAsyncThunk(
  'halls/deleteHall',
  async (hallId, { rejectWithValue }) => {
    try {
      await deleteHallById(hallId);
      return hallId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hallSlice = createSlice({
  name: 'halls',
  initialState: {
    halls: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHalls.fulfilled, (state, action) => {
        state.loading = false;
        state.halls = action.payload;
      })
      .addCase(getAllHalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getHallById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHallById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.halls.findIndex(
          (hall) => hall.hall_id === action.payload.hall_id
        );
        if (index >= 0) {
          state.halls[index] = action.payload;
        } else {
          state.halls.push(action.payload);
        }
      })
      .addCase(getHallById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewHall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewHall.fulfilled, (state, action) => {
        state.loading = false;
        state.halls.push(action.payload);
      })
      .addCase(createNewHall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateHall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHall.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.halls.findIndex(
          (hall) => hall.hall_id === action.payload.hall_id
        );
        if (index !== -1) {
          state.halls[index] = action.payload;
        }
      })
      .addCase(updateHall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteHall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHall.fulfilled, (state, action) => {
        state.loading = false;
        state.halls = state.halls.filter(
          (hall) => hall.hall_id !== action.payload
        );
      })
      .addCase(deleteHall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hallSlice.reducer;
