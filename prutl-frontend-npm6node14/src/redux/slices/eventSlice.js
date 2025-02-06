//prutl-frontend-npm6node14/src/redux/slices/eventSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllEvents,
  fetchEventById,
  createEvent,
  updateEventById,
  deleteEventById
} from '../../utils/api';

export const getAllEvents = createAsyncThunk('events/getAllEvents', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllEvents();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getEventById = createAsyncThunk('events/getEventById', async (eventId, { rejectWithValue }) => {
  try {
    const response = await fetchEventById(eventId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewEvent = createAsyncThunk('events/createNewEvent', async (data, { rejectWithValue }) => {
  try {
    const response = await createEvent(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ eventId, data }, { rejectWithValue }) => {
  try {
    const response = await updateEventById(eventId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId, { rejectWithValue }) => {
  try {
    await deleteEventById(eventId);
    return eventId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(event => event.event_id === action.payload.event_id);
        if (index >= 0) {
          state.events[index] = action.payload;
        } else {
          state.events.push(action.payload);
        }
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createNewEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(event => event.event_id === action.payload.event_id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(event => event.event_id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
