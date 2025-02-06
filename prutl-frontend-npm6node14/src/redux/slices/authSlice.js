//prutl-frontend-npm6node14/src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, registerByAdmin } from "../../utils/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, keepSignedIn }, { rejectWithValue }) => {
    try {
      const response = await login(email, password,keepSignedIn);

      if (keepSignedIn) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("user_id", JSON.stringify(response.user.user_id));
        localStorage.setItem("token", response.token);
        localStorage.setItem("profile_picture_url", response.user.profile_picture_url); // Store profile picture URL
        // console.log("localStorage setting up profile picture url response++++++++++",response.user.profile_picture_url)

      } else {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        sessionStorage.setItem(
          "user_id",
          JSON.stringify(response.user.user_id)
        );
        
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("profile_picture_url", response.user.profile_picture_url); // Store profile picture URL
        // console.log("sessionStorage setting up profile picture url response++++++++++",response.user.profile_picture_url)
      }
      console.log("Login response++++++++++",response)
      return response;
    } catch (error) {
      // console.log("error if errorin login:++++++++++++", error)
      return rejectWithValue(error.message);
    }
  }
);
//registration by user without login
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//registration by admin when logged in, not by user
export const registerUserByAdmin = createAsyncThunk(
  "auth/registerUserByAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerByAdmin(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user")) ||
      null,
    user_id:
      localStorage.getItem("user_id") ||
      sessionStorage.getItem("user_id") ||
      null,
    token:
      localStorage.getItem("token") || sessionStorage.getItem("token") || null,
    profile_picture_url:
      localStorage.getItem("profile_picture_url") || sessionStorage.getItem("profile_picture_url"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      sessionStorage.clear();
      state.user = null;
      state.user_id = null;
      state.token = null;
      state.profile_picture_url = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUser_Id: (state, action) => {
      state.user_id = action.payload.user.user_id;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setProfilePictureUrl: (state, action)=>{
      state.profile_picture_url = action.payload.profile_picture_url;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.user_id = action.payload.user.user_id;
        state.loggedinuser = action.payload.user;
        state.token = action.payload.token;
        state.profile_picture_url = action.payload.profile_picture_url;
      
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        // console.log("state.error+++++++",state.error);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUserByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, setToken, setUser_Id, setProfilePictureUrl } = authSlice.actions;
// export const { logout, setUser, setToken, setUser_Id } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { login, register, registerByAdmin } from "../../utils/api";

// // Utility function for storing user
// const storeUser = (user, token, keepSignedIn) => {
//   const storage = keepSignedIn ? localStorage : sessionStorage;
//   storage.setItem("user", JSON.stringify(user));
//   storage.setItem("user_id", JSON.stringify(user.user_id));
//   storage.setItem("token", token);
//   storage.setItem("profile_picture_url", JSON.stringify(user.profile_picture_url)); // Store profile picture URL
// };

// // Thunks
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password, keepSignedIn }, { rejectWithValue }) => {
//     try {
//       const response = await login(email, password, keepSignedIn);
//       storeUser(response.user, response.token, keepSignedIn);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await register(data);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const registerUserByAdmin = createAsyncThunk(
//   "auth/registerUserByAdmin",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await registerByAdmin(data);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user")) || null,
//     user_id: localStorage.getItem("user_id") || sessionStorage.getItem("user_id") || null,
//     token: localStorage.getItem("token") || sessionStorage.getItem("token") || null,
//     profile_picture_url: JSON.parse(localStorage.getItem("profile_picture_url")) || JSON.parse(sessionStorage.getItem("profile_picture_url")) || null, // Add this line

//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       localStorage.clear();
//       sessionStorage.clear();
//       state.user = null;
//       state.token = null;
//       state.profile_picture_url = null; // Clear profile picture URL

//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setUser_Id: (state, action) => {
//       state.user_id = action.payload.user.user_id;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload.token;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.user_id = action.payload.user.user_id;
//         state.token = action.payload.token;
//         state.profile_picture_url = action.payload.user.profile_picture_url; // Set profile picture URL

//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Login failed";
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.profile_picture_url = action.payload.user.profile_picture_url; // Set profile picture URL

//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(registerUserByAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUserByAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(registerUserByAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout, clearError, setUser, setUser_Id, setToken } = authSlice.actions;
// export default authSlice.reducer;
