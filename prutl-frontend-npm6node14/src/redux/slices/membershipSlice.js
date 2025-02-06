//prutl-frontend-npm6node14/src/redux/slices/membershipSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllMemberships,
  fetchMembershipById,
  createMembership,
  updateMembershipById,
  deleteMembershipById
} from '../../utils/api';

export const getAllMemberships = createAsyncThunk('memberships/getAllMemberships', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllMemberships();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getMembershipById = createAsyncThunk('memberships/getMembershipById', async (membershipId, { rejectWithValue }) => {
  try {
    const response = await fetchMembershipById(membershipId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewMembership = createAsyncThunk('memberships/createNewMembership', async (data, { rejectWithValue }) => {
  try {
    const response = await createMembership(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateMembership = createAsyncThunk('memberships/updateMembership', async ({ membershipId, data }, { rejectWithValue }) => {
  try {
    const response = await updateMembershipById(membershipId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteMembership = createAsyncThunk('memberships/deleteMembership', async (membershipId, { rejectWithValue }) => {
  try {
    await deleteMembershipById(membershipId);
    return membershipId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const membershipSlice = createSlice({
  name: 'memberships',
  initialState: {
    memberships: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMemberships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMemberships.fulfilled, (state, action) => {
        state.loading = false;
        state.memberships = action.payload;
      })
      .addCase(getAllMemberships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMembershipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMembershipById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.memberships.findIndex(membership => membership.membership_id === action.payload.membership_id);
        if (index >= 0) {
          state.memberships[index] = action.payload;
        } else {
          state.memberships.push(action.payload);
        }
      })
      .addCase(getMembershipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewMembership.fulfilled, (state, action) => {
        state.loading = false;
        state.memberships.push(action.payload);
      })
      .addCase(createNewMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMembership.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.memberships.findIndex(membership => membership.membership_id === action.payload.membership_id);
        if (index !== -1) {
          state.memberships[index] = action.payload;
        }
      })
      .addCase(updateMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMembership.fulfilled, (state, action) => {
        state.loading = false;
        state.memberships = state.memberships.filter(membership => membership.membership_id !== action.payload);
      })
      .addCase(deleteMembership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default membershipSlice.reducer;
