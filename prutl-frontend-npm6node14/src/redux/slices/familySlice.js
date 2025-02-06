// prutl-frontend-npm6node14/src/redux/slices/familySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllFamilies,
  fetchFamilyById,
  createFamily,
  updateFamilyById,
  deleteFamilyById,
} from '../../utils/api';

export const getAllFamilies = createAsyncThunk(
  'families/getAllFamilies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllFamilies();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFamilyById = createAsyncThunk(
  'families/getFamilyById',
  async (familyId, { rejectWithValue }) => {
    try {
      const response = await fetchFamilyById(familyId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewFamily = createAsyncThunk(
  'families/createNewFamily',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createFamily(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFamily = createAsyncThunk(
  'families/updateFamily',
  async ({ familyId, data }, { rejectWithValue }) => {
    try {
      const response = await updateFamilyById(familyId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFamily = createAsyncThunk(
  'families/deleteFamily',
  async (familyId, { rejectWithValue }) => {
    try {
      await deleteFamilyById(familyId);
      return familyId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const familySlice = createSlice({
  name: 'families',
  initialState: {
    families: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFamilies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFamilies.fulfilled, (state, action) => {
        state.loading = false;
        state.families = action.payload;
      })
      .addCase(getAllFamilies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFamilyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFamilyById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.families.findIndex(family => family.family_id === action.payload.family_id);
        if (index >= 0) {
          state.families[index] = action.payload;
        } else {
          state.families.push(action.payload);
        }
      })
      .addCase(getFamilyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.families.push(action.payload);
      })
      .addCase(createNewFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFamily.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.families.findIndex(family => family.family_id === action.payload.family_id);
        if (index !== -1) {
          state.families[index] = action.payload;
        }
      })
      .addCase(updateFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.families = state.families.filter(family => family.family_id !== action.payload);
      })
      .addCase(deleteFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default familySlice.reducer;
