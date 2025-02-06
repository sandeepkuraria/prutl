// prutl-frontend-npm6node14/src/redux/slices/userGroupSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllUserGroups,
  fetchUserGroupById,
  createUserGroup,
  updateUserGroupById,
  deleteUserGroupById,
} from '../../utils/api';

export const getAllUserGroups = createAsyncThunk(
  'userGroups/getAllUserGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllUserGroups();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserGroupById = createAsyncThunk(
  'userGroups/getUserGroupById',
  async (userGroupId, { rejectWithValue }) => {
    try {
      const response = await fetchUserGroupById(userGroupId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewUserGroup = createAsyncThunk(
  'userGroups/createNewUserGroup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createUserGroup(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserGroup = createAsyncThunk(
  'userGroups/updateUserGroup',
  async ({ userGroupId, data }, { rejectWithValue }) => {
    try {
      const response = await updateUserGroupById(userGroupId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserGroup = createAsyncThunk(
  'userGroups/deleteUserGroup',
  async (userGroupId, { rejectWithValue }) => {
    try {
      await deleteUserGroupById(userGroupId);
      return userGroupId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userGroupSlice = createSlice({
  name: 'userGroups',
  initialState: {
    userGroups: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.userGroups = action.payload;
      })
      .addCase(getAllUserGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserGroupById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userGroups.findIndex(group => group.usergroup_id === action.payload.usergroup_id);
        if (index >= 0) {
          state.userGroups[index] = action.payload;
        } else {
          state.userGroups.push(action.payload);
        }
      })
      .addCase(getUserGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewUserGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewUserGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.userGroups.push(action.payload);
      })
      .addCase(createNewUserGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserGroup.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userGroups.findIndex(group => group.usergroup_id === action.payload.usergroup_id);
        if (index !== -1) {
          state.userGroups[index] = action.payload;
        }
      })
      .addCase(updateUserGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.userGroups = state.userGroups.filter(group => group.usergroup_id !== action.payload);
      })
      .addCase(deleteUserGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userGroupSlice.reducer;
