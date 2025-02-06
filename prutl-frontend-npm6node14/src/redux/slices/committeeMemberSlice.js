// prutl-frontend-npm6node14/src/redux/slices/committeeMemberSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllCommitteeMembers,
  fetchCommitteeMemberById,
  createCommitteeMember,
  updateCommitteeMemberById,
  deleteCommitteeMemberById
} from '../../utils/api';

export const getAllCommitteeMembers = createAsyncThunk('committeeMembers/getAllCommitteeMembers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllCommitteeMembers();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getCommitteeMemberById = createAsyncThunk('committeeMembers/getCommitteeMemberById', async (committeeMemberId, { rejectWithValue }) => {
  try {
    const response = await fetchCommitteeMemberById(committeeMemberId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewCommitteeMember = createAsyncThunk('committeeMembers/createNewCommitteeMember', async (data, { rejectWithValue }) => {
  try {
    const response = await createCommitteeMember(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCommitteeMember = createAsyncThunk('committeeMembers/updateCommitteeMember', async ({ committeeMemberId, data }, { rejectWithValue }) => {
  try {
    const response = await updateCommitteeMemberById(committeeMemberId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCommitteeMember = createAsyncThunk('committeeMembers/deleteCommitteeMember', async (committeeMemberId, { rejectWithValue }) => {
  try {
    await deleteCommitteeMemberById(committeeMemberId);
    return committeeMemberId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const committeeMemberSlice = createSlice({
  name: 'committeeMembers',
  initialState: {
    committeeMembers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommitteeMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCommitteeMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.committeeMembers = action.payload;
      })
      .addCase(getAllCommitteeMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommitteeMemberById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommitteeMemberById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.committeeMembers.findIndex(committeeMember => committeeMember.committee_member_id === action.payload.committee_member_id);
        if (index >= 0) {
          state.committeeMembers[index] = action.payload;
        } else {
          state.committeeMembers.push(action.payload);
        }
      })
      .addCase(getCommitteeMemberById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewCommitteeMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCommitteeMember.fulfilled, (state, action) => {
        state.loading = false;
        state.committeeMembers.push(action.payload);
      })
      .addCase(createNewCommitteeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCommitteeMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCommitteeMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.committeeMembers.findIndex(committeeMember => committeeMember.committee_member_id === action.payload.committee_member_id);
        if (index !== -1) {
          state.committeeMembers[index] = action.payload;
        }
      })
      .addCase(updateCommitteeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCommitteeMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommitteeMember.fulfilled, (state, action) => {
        state.loading = false;
        state.committeeMembers = state.committeeMembers.filter(committeeMember => committeeMember.committee_member_id !== action.payload);
      })
      .addCase(deleteCommitteeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default committeeMemberSlice.reducer;
