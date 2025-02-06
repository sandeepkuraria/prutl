// prutl-frontend-npm6node14/src/redux/slices/competitionSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllCompetitions,
  fetchCompetitionById,
  createCompetition,
  updateCompetitionById,
  deleteCompetitionById
} from '../../utils/api';

export const getAllCompetitions = createAsyncThunk('competitions/getAllCompetitions', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllCompetitions();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getCompetitionById = createAsyncThunk('competitions/getCompetitionById', async (competitionId, { rejectWithValue }) => {
  try {
    const response = await fetchCompetitionById(competitionId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewCompetition = createAsyncThunk('competitions/createNewCompetition', async (data, { rejectWithValue }) => {
  try {
    const response = await createCompetition(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCompetition = createAsyncThunk('competitions/updateCompetition', async ({ competitionId, data }, { rejectWithValue }) => {
  try {
    const response = await updateCompetitionById(competitionId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCompetition = createAsyncThunk('competitions/deleteCompetition', async (competitionId, { rejectWithValue }) => {
  try {
    await deleteCompetitionById(competitionId);
    return competitionId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const competitionSlice = createSlice({
  name: 'competitions',
  initialState: {
    competitions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompetitions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCompetitions.fulfilled, (state, action) => {
        state.loading = false;
        state.competitions = action.payload;
      })
      .addCase(getAllCompetitions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCompetitionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompetitionById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.competitions.findIndex(competition => competition.competition_id === action.payload.competition_id);
        if (index >= 0) {
          state.competitions[index] = action.payload;
        } else {
          state.competitions.push(action.payload);
        }
      })
      .addCase(getCompetitionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewCompetition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCompetition.fulfilled, (state, action) => {
        state.loading = false;
        state.competitions.push(action.payload);
      })
      .addCase(createNewCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCompetition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompetition.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.competitions.findIndex(competition => competition.competition_id === action.payload.competition_id);
        if (index !== -1) {
          state.competitions[index] = action.payload;
        }
      })
      .addCase(updateCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCompetition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompetition.fulfilled, (state, action) => {
        state.loading = false;
        state.competitions = state.competitions.filter(competition => competition.competition_id !== action.payload);
      })
      .addCase(deleteCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default competitionSlice.reducer;
