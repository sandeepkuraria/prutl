// prutl-frontend-npm6node14/src/redux/slices/participantSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllParticipants,
  fetchParticipantById,
  createParticipant,
  updateParticipantById,
  deleteParticipantById
} from '../../utils/api';

export const getAllParticipants = createAsyncThunk('participants/getAllParticipants', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllParticipants();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getParticipantById = createAsyncThunk('participants/getParticipantById', async (participantId, { rejectWithValue }) => {
  try {
    const response = await fetchParticipantById(participantId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewParticipant = createAsyncThunk('participants/createNewParticipant', async (data, { rejectWithValue }) => {
  try {
    const response = await createParticipant(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateParticipant = createAsyncThunk('participants/updateParticipant', async ({ participantId, data }, { rejectWithValue }) => {
  try {
    const response = await updateParticipantById(participantId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteParticipant = createAsyncThunk('participants/deleteParticipant', async (participantId, { rejectWithValue }) => {
  try {
    await deleteParticipantById(participantId);
    return participantId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const participantSlice = createSlice({
  name: 'participants',
  initialState: {
    participants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
      })
      .addCase(getAllParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getParticipantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParticipantById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.participants.findIndex(participant => participant.participant_id === action.payload.participant_id);
        if (index >= 0) {
          state.participants[index] = action.payload;
        } else {
          state.participants.push(action.payload);
        }
      })
      .addCase(getParticipantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.participants.push(action.payload);
      })
      .addCase(createNewParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParticipant.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.participants.findIndex(participant => participant.participant_id === action.payload.participant_id);
        if (index !== -1) {
          state.participants[index] = action.payload;
        }
      })
      .addCase(updateParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = state.participants.filter(participant => participant.participant_id !== action.payload);
      })
      .addCase(deleteParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default participantSlice.reducer;
