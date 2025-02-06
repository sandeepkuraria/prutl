// prutl-frontend-npm6node14/src/redux/slices/familyMemberSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllFamilyMembers,
  fetchFamilyMemberById,
  createFamilyMember,
  updateFamilyMemberById,
  deleteFamilyMemberById,
} from '../../utils/api';

export const getAllFamilyMembers = createAsyncThunk(
  'familyMembers/getAllFamilyMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllFamilyMembers();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFamilyMemberById = createAsyncThunk(
  'familyMembers/getFamilyMemberById',
  async (familyMemberId, { rejectWithValue }) => {
    try {
      const response = await fetchFamilyMemberById(familyMemberId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewFamilyMember = createAsyncThunk(
  'familyMembers/createNewFamilyMember',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createFamilyMember(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFamilyMember = createAsyncThunk(
  'familyMembers/updateFamilyMember',
  async ({ familyMemberId, data }, { rejectWithValue }) => {
    try {
      const response = await updateFamilyMemberById(familyMemberId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFamilyMember = createAsyncThunk(
  'familyMembers/deleteFamilyMember',
  async (familyMemberId, { rejectWithValue }) => {
    try {
      await deleteFamilyMemberById(familyMemberId);
      return familyMemberId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const familyMemberSlice = createSlice({
  name: 'familyMembers',
  initialState: {
    familyMembers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFamilyMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFamilyMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.familyMembers = action.payload;
      })
      .addCase(getAllFamilyMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFamilyMemberById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFamilyMemberById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.familyMembers.findIndex(
          (member) => member.family_member_id === action.payload.family_member_id
        );
        if (index >= 0) {
          state.familyMembers[index] = action.payload;
        } else {
          state.familyMembers.push(action.payload);
        }
      })
      .addCase(getFamilyMemberById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewFamilyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        state.familyMembers.push(action.payload);
      })
      .addCase(createNewFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFamilyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.familyMembers.findIndex(
          (member) => member.family_member_id === action.payload.family_member_id
        );
        if (index !== -1) {
          state.familyMembers[index] = action.payload;
        }
      })
      .addCase(updateFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFamilyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFamilyMember.fulfilled, (state, action) => {
        state.loading = false;
        state.familyMembers = state.familyMembers.filter(
          (member) => member.family_member_id !== action.payload
        );
      })
      .addCase(deleteFamilyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default familyMemberSlice.reducer;
