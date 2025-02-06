// prutl-frontend-npm6node14/src/redux/slices/roleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllRoles,
  fetchRoleById,
  createRole,
  updateRoleById,
  deleteRoleById
} from '../../utils/api';

export const getAllRoles = createAsyncThunk('roles/getAllRoles', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllRoles();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getRoleById = createAsyncThunk('roles/getRoleById', async (roleId, { rejectWithValue }) => {
  try {
    const response = await fetchRoleById(roleId);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewRole = createAsyncThunk('roles/createNewRole', async (data, { rejectWithValue }) => {
  try {
    const response = await createRole(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateRole = createAsyncThunk('roles/updateRole', async ({ roleId, data }, { rejectWithValue }) => {
  try {
    const response = await updateRoleById(roleId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (roleId, { rejectWithValue }) => {
  try {
    await deleteRoleById(roleId);
    return roleId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex(role => role.role_id === action.payload.role_id);
        if (index >= 0) {
          state.roles[index] = action.payload;
        } else {
          state.roles.push(action.payload);
        }
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createNewRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex(role => role.role_id === action.payload.role_id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter(role => role.role_id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roleSlice.reducer;
