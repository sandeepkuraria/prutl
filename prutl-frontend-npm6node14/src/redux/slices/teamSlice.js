// prutl-frontend-npm6node14/src/redux/slices/teamSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllTeams,
  fetchTeamById,
  createTeam,
  updateTeamById,
  deleteTeamById
} from '../../utils/api';

export const getAllTeams = createAsyncThunk('teams/getAllTeams', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllTeams();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getTeamById = createAsyncThunk('teams/getTeamById', async (teamId, { rejectWithValue }) => {
  try {
    const response = await fetchTeamById(teamId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewTeam = createAsyncThunk('teams/createNewTeam', async (data, { rejectWithValue }) => {
  try {
    const response = await createTeam(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateTeam = createAsyncThunk('teams/updateTeam', async ({ teamId, data }, { rejectWithValue }) => {
  try {
    const response = await updateTeamById(teamId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTeam = createAsyncThunk('teams/deleteTeam', async (teamId, { rejectWithValue }) => {
  try {
    await deleteTeamById(teamId);
    return teamId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    teams: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teams.findIndex(team => team.team_id === action.payload.team_id);
        if (index >= 0) {
          state.teams[index] = action.payload;
        } else {
          state.teams.push(action.payload);
        }
      })
      .addCase(getTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams.push(action.payload);
      })
      .addCase(createNewTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teams.findIndex(team => team.team_id === action.payload.team_id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.filter(team => team.team_id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
