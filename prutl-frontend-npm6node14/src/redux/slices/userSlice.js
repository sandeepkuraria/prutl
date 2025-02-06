//prutl-frontend-npm6node14/src/redux/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllUsers, fetchUserById, updateUserById, deleteUserById } from '../../utils/api';

// Async thunk for fetching all users
export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllUsers();
    // console.log('response in userSlice.js for getAllUsers+++++++', response);
    return response; // Ensure this returns an array of users
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for fetching user by ID
export const getUserById = createAsyncThunk('users/getUserById', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetchUserById(userId);
    // console.log('response in userSlice.js for getUserById +++++++', response);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, data }, { rejectWithValue }) => {
  try {
    const response = await updateUserById(userId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    await deleteUserById(userId);
    return userId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// User slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [], // Use array to store users
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        // console.log('state.users array in userSlice for getAllUsers', state.users)
  
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        // Find and update the specific user or add if not exists
        const userIndex = state.users.findIndex(user => user.user_id === action.payload.user_id);
        if (userIndex >= 0) {
          state.users[userIndex] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   // Find and update the specific user
      //   const userIndex = state.users.findIndex(user => user.user_id === action.payload.user_id);
      //   if (userIndex >= 0) {
      //     state.users[userIndex] = action.payload;
      //   }
      // })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.user_id === action.payload.user_id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the user from the state
        state.users = state.users.filter(user => user.user_id !== action.payload);
        // console.log('state.users delete in userSlice for deleteUser++++++', state.users)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchAllUsers, fetchUserById, updateUserById, deleteUserById } from '../../utils/api';

// // Async thunk for fetching all users
// export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, { rejectWithValue }) => {
//   try {
//     const response = await fetchAllUsers();
//     return response; // Ensure this returns an array of users
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Async thunk for fetching user by ID
// export const getUserById = createAsyncThunk('users/getUserById', async (userId, { rejectWithValue }) => {
//   try {
//     const response = await fetchUserById(userId);
//     return response; // Ensure the response includes profile_picture_url
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Async thunk for updating a user
// export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, data }, { rejectWithValue }) => {
//   try {
//     const response = await updateUserById(userId, data);
//     return response; // Ensure the response includes profile_picture_url
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Async thunk for deleting a user
// export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { rejectWithValue }) => {
//   try {
//     await deleteUserById(userId);
//     return userId;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // User slice
// const userSlice = createSlice({
//   name: 'users',
//   initialState: {
//     users: [], // Use array to store users
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload.users; // Ensure this has profile_picture_url
//       })
//       .addCase(getAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getUserById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserById.fulfilled, (state, action) => {
//         state.loading = false;
//         // Find and update the specific user or add if not exists
//         const userIndex = state.users.findIndex(user => user.user_id === action.payload.user_id);
//         if (userIndex >= 0) {
//           state.users[userIndex] = action.payload; // This should include profile_picture_url
//         } else {
//           state.users.push(action.payload); // This should include profile_picture_url
//         }
//       })
//       .addCase(getUserById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.users.findIndex(user => user.user_id === action.payload.user_id);
//         if (index !== -1) {
//           state.users[index] = action.payload; // This should include profile_picture_url
//         }
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.loading = false;
//         // Remove the user from the state
//         state.users = state.users.filter(user => user.user_id !== action.payload);
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userSlice.reducer;
