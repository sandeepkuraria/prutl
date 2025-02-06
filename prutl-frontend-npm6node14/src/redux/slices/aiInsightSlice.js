// prutl-frontend-npm6node14/src/redux/slices/aiInsightSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllAIInsights,
  fetchAIInsightById,
  createAIInsight,
  updateAIInsightById,
  deleteAIInsightById,
} from '../../utils/api';

export const getAllAIInsights = createAsyncThunk(
  'aiInsights/getAllAIInsights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllAIInsights();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAIInsightById = createAsyncThunk(
  'aiInsights/getAIInsightById',
  async (insightId, { rejectWithValue }) => {
    try {
      const response = await fetchAIInsightById(insightId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewAIInsight = createAsyncThunk(
  'aiInsights/createNewAIInsight',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createAIInsight(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAIInsight = createAsyncThunk(
  'aiInsights/updateAIInsight',
  async ({ insightId, data }, { rejectWithValue }) => {
    try {
      const response = await updateAIInsightById(insightId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAIInsight = createAsyncThunk(
  'aiInsights/deleteAIInsight',
  async (insightId, { rejectWithValue }) => {
    try {
      await deleteAIInsightById(insightId);
      return insightId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const aiInsightSlice = createSlice({
  name: 'aiInsights',
  initialState: {
    aiInsights: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAIInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAIInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.aiInsights = action.payload;
      })
      .addCase(getAllAIInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAIInsightById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAIInsightById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.aiInsights.findIndex(
          (insight) => insight.insight_id === action.payload.insight_id
        );
        if (index >= 0) {
          state.aiInsights[index] = action.payload;
        } else {
          state.aiInsights.push(action.payload);
        }
      })
      .addCase(getAIInsightById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewAIInsight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewAIInsight.fulfilled, (state, action) => {
        state.loading = false;
        state.aiInsights.push(action.payload);
      })
      .addCase(createNewAIInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAIInsight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAIInsight.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.aiInsights.findIndex(
          (insight) => insight.insight_id === action.payload.insight_id
        );
        if (index !== -1) {
          state.aiInsights[index] = action.payload;
        }
      })
      .addCase(updateAIInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAIInsight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAIInsight.fulfilled, (state, action) => {
        state.loading = false;
        state.aiInsights = state.aiInsights.filter(
          (insight) => insight.insight_id !== action.payload
        );
      })
      .addCase(deleteAIInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aiInsightSlice.reducer;
