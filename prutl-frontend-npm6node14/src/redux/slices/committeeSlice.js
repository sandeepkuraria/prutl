// prutl-frontend-npm6node14/src/redux/slices/committeeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllCommittees,
  fetchCommitteeById,
  createCommittee,
  updateCommitteeById,
  deleteCommitteeById
} from '../../utils/api';

export const getAllCommittees = createAsyncThunk('committees/getAllCommittees', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllCommittees();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getCommitteeById = createAsyncThunk('committees/getCommitteeById', async (committeeId, { rejectWithValue }) => {
  try {
    const response = await fetchCommitteeById(committeeId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewCommittee = createAsyncThunk('committees/createNewCommittee', async (data, { rejectWithValue }) => {
  try {
    const response = await createCommittee(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCommittee = createAsyncThunk('committees/updateCommittee', async ({ committeeId, data }, { rejectWithValue }) => {
  try {
    const response = await updateCommitteeById(committeeId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCommittee = createAsyncThunk('committees/deleteCommittee', async (committeeId, { rejectWithValue }) => {
  try {
    await deleteCommitteeById(committeeId);
    return committeeId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const committeeSlice = createSlice({
  name: 'committees',
  initialState: {
    committees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommittees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCommittees.fulfilled, (state, action) => {
        state.loading = false;
        state.committees = action.payload;
      })
      .addCase(getAllCommittees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommitteeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommitteeById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.committees.findIndex(committee => committee.committee_id === action.payload.committee_id);
        if (index >= 0) {
          state.committees[index] = action.payload;
        } else {
          state.committees.push(action.payload);
        }
      })
      .addCase(getCommitteeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewCommittee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCommittee.fulfilled, (state, action) => {
        state.loading = false;
        state.committees.push(action.payload);
      })
      .addCase(createNewCommittee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCommittee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCommittee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.committees.findIndex(committee => committee.committee_id === action.payload.committee_id);
        if (index !== -1) {
          state.committees[index] = action.payload;
        }
      })
      .addCase(updateCommittee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCommittee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommittee.fulfilled, (state, action) => {
        state.loading = false;
        state.committees = state.committees.filter(committee => committee.committee_id !== action.payload);
      })
      .addCase(deleteCommittee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default committeeSlice.reducer;
