// prutl-frontend-npm6node14/src/redux/slices/streamSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllStreams,
  fetchStreamById,
  createStream,
  updateStreamById,
  deleteStreamById
} from '../../utils/api';

export const getAllStreams = createAsyncThunk('streams/getAllStreams', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllStreams();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getStreamById = createAsyncThunk('streams/getStreamById', async (streamId, { rejectWithValue }) => {
  try {
    const response = await fetchStreamById(streamId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewStream = createAsyncThunk('streams/createNewStream', async (data, { rejectWithValue }) => {
  try {
    const response = await createStream(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateStream = createAsyncThunk('streams/updateStream', async ({ streamId, data }, { rejectWithValue }) => {
  try {
    const response = await updateStreamById(streamId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteStream = createAsyncThunk('streams/deleteStream', async (streamId, { rejectWithValue }) => {
  try {
    await deleteStreamById(streamId);
    return streamId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const streamSlice = createSlice({
  name: 'streams',
  initialState: {
    streams: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStreams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStreams.fulfilled, (state, action) => {
        state.loading = false;
        state.streams = action.payload;
      })
      .addCase(getAllStreams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStreamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStreamById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.streams.findIndex(stream => stream.stream_id === action.payload.stream_id);
        if (index >= 0) {
          state.streams[index] = action.payload;
        } else {
          state.streams.push(action.payload);
        }
      })
      .addCase(getStreamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewStream.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewStream.fulfilled, (state, action) => {
        state.loading = false;
        state.streams.push(action.payload);
      })
      .addCase(createNewStream.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStream.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStream.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.streams.findIndex(stream => stream.stream_id === action.payload.stream_id);
        if (index !== -1) {
          state.streams[index] = action.payload;
        }
      })
      .addCase(updateStream.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStream.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStream.fulfilled, (state, action) => {
        state.loading = false;
        state.streams = state.streams.filter(stream => stream.stream_id !== action.payload);
      })
      .addCase(deleteStream.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default streamSlice.reducer;
