// prutl-frontend-npm6node14/src/redux/slices/teamMemberSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllTeamMembers,
  fetchTeamMemberById,
  createTeamMember,
  updateTeamMemberById,
  deleteTeamMemberById,
} from '../../utils/api';

// Thunks
export const getAllTeamMembers = createAsyncThunk('teamMembers/getAllTeamMembers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllTeamMembers();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getTeamMemberById = createAsyncThunk('teamMembers/getTeamMemberById', async (teamMemberId, { rejectWithValue }) => {
  try {
    const response = await fetchTeamMemberById(teamMemberId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewTeamMember = createAsyncThunk('teamMembers/createNewTeamMember', async (data, { rejectWithValue }) => {
  try {
    const response = await createTeamMember(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateTeamMember = createAsyncThunk('teamMembers/updateTeamMember', async ({ teamMemberId, data }, { rejectWithValue }) => {
  try {
    const response = await updateTeamMemberById(teamMemberId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTeamMember = createAsyncThunk('teamMembers/deleteTeamMember', async (teamMemberId, { rejectWithValue }) => {
  try {
    await deleteTeamMemberById(teamMemberId);
    return teamMemberId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const teamMemberSlice = createSlice({
  name: 'teamMembers',
  initialState: {
    teamMembers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = action.payload;
      })
      .addCase(getAllTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeamMemberById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamMemberById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teamMembers.findIndex(
          (teamMember) => teamMember.team_member_id === action.payload.team_member_id
        );
        if (index >= 0) {
          state.teamMembers[index] = action.payload;
        } else {
          state.teamMembers.push(action.payload);
        }
      })
      .addCase(getTeamMemberById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers.push(action.payload);
      })
      .addCase(createNewTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teamMembers.findIndex(
          (teamMember) => teamMember.team_member_id === action.payload.team_member_id
        );
        if (index !== -1) {
          state.teamMembers[index] = action.payload;
        }
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = state.teamMembers.filter(
          (teamMember) => teamMember.team_member_id !== action.payload
        );
      })
      .addCase(deleteTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamMemberSlice.reducer;
