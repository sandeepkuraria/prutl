// prutl-frontend-npm6node14/src/redux/slices/organizationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllOrganizations,
  fetchOrganizationById,
  createOrganization,
  updateOrganizationById,
  deleteOrganizationById
} from '../../utils/api';

export const getAllOrganizations = createAsyncThunk('organizations/getAllOrganizations', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllOrganizations();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getOrganizationById = createAsyncThunk('organizations/getOrganizationById', async (orgId, { rejectWithValue }) => {
  try {
    const response = await fetchOrganizationById(orgId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewOrganization = createAsyncThunk('organizations/createNewOrganization', async (data, { rejectWithValue }) => {
  try {
    const response = await createOrganization(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateOrganization = createAsyncThunk('organizations/updateOrganization', async ({ orgId, data }, { rejectWithValue }) => {
  try {
    const response = await updateOrganizationById(orgId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteOrganization = createAsyncThunk('organizations/deleteOrganization', async (orgId, { rejectWithValue }) => {
  try {
    await deleteOrganizationById(orgId);
    return orgId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const organizationSlice = createSlice({
  name: 'organizations',
  initialState: {
    organizations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
      })
      .addCase(getAllOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrganizationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrganizationById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.organizations.findIndex(org => org.org_id === action.payload.org_id);
        if (index >= 0) {
          state.organizations[index] = action.payload;
        } else {
          state.organizations.push(action.payload);
        }
      })
      .addCase(getOrganizationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations.push(action.payload);
      })
      .addCase(createNewOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.organizations.findIndex(org => org.org_id === action.payload.org_id);
        if (index !== -1) {
          state.organizations[index] = action.payload;
        }
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = state.organizations.filter(org => org.org_id !== action.payload);
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default organizationSlice.reducer;
