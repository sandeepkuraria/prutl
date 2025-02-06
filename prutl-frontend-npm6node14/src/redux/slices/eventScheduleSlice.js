// prutl-frontend-npm6node14/src/redux/slices/eventScheduleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllEventSchedules,
  fetchEventScheduleById,
  createEventSchedule,
  updateEventScheduleById,
  deleteEventScheduleById
} from '../../utils/api';

export const getAllEventSchedules = createAsyncThunk('eventSchedules/getAllEventSchedules', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllEventSchedules();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getEventScheduleById = createAsyncThunk('eventSchedules/getEventScheduleById', async (scheduleId, { rejectWithValue }) => {
  try {
    const response = await fetchEventScheduleById(scheduleId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewEventSchedule = createAsyncThunk('eventSchedules/createNewEventSchedule', async (data, { rejectWithValue }) => {
  try {
    const response = await createEventSchedule(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateEventSchedule = createAsyncThunk('eventSchedules/updateEventSchedule', async ({ scheduleId, data }, { rejectWithValue }) => {
  try {
    const response = await updateEventScheduleById(scheduleId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteEventSchedule = createAsyncThunk('eventSchedules/deleteEventSchedule', async (scheduleId, { rejectWithValue }) => {
  try {
    await deleteEventScheduleById(scheduleId);
    return scheduleId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const eventScheduleSlice = createSlice({
  name: 'eventSchedules',
  initialState: {
    eventSchedules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEventSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEventSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.eventSchedules = action.payload;
      })
      .addCase(getAllEventSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEventScheduleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventScheduleById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.eventSchedules.findIndex(schedule => schedule.schedule_id === action.payload.schedule_id);
        if (index >= 0) {
          state.eventSchedules[index] = action.payload;
        } else {
          state.eventSchedules.push(action.payload);
        }
      })
      .addCase(getEventScheduleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewEventSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewEventSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.eventSchedules.push(action.payload);
      })
      .addCase(createNewEventSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEventSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEventSchedule.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.eventSchedules.findIndex(schedule => schedule.schedule_id === action.payload.schedule_id);
        if (index !== -1) {
          state.eventSchedules[index] = action.payload;
        }
      })
      .addCase(updateEventSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEventSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEventSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.eventSchedules = state.eventSchedules.filter(schedule => schedule.schedule_id !== action.payload);
      })
      .addCase(deleteEventSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventScheduleSlice.reducer;
