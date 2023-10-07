import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SIGNIN_VALID } from "../constants/auth";
import { authService } from "../Router";

const initialState: AuthSliceState = {
  response: { ok: false, message: "" },
  isLoading: false,
  validation: {
    emailError: "",
    passwordError: "",
  },
};

export const fetchSignin = createAsyncThunk(
  "auth/fetchSignin",
  async (body: RequestBodyType, { rejectWithValue }) => {
    try {
      const response = await authService.signin(body);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "auth/fetchSignup",
  async (body: RequestBodyType) => {
    const response = await authService.signup(body);
    return response;
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<keyof AuthSliceState | "all">
    ) => {
      if (action.payload === "all") {
        state = initialState;
        return state;
      }
      const newState = {
        ...state,
        [action.payload]: initialState[action.payload],
      };
      return newState;
    },
    validate: (state, action: PayloadAction<Partial<RequestBodyType>>) => {
      const { email, password } = action.payload;
      if (email && !email.includes("@")) {
        state.validation.emailError = SIGNIN_VALID.EMAIL_INVALID;
      } else {
        state.validation.emailError = "";
      }
      if (password && password.length < 8) {
        state.validation.passwordError = SIGNIN_VALID.PASSWORD_INVALID;
      } else {
        state.validation.passwordError = "";
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(fetchSignin.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(fetchSignup.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { initialize, validate } = authReducer.actions;

export const selectAuthState = (state: RootState) => state.auth;

export default authReducer.reducer;

type AuthSliceState = {
  response: FetchAuthResponse;
  isLoading: boolean;
  validation: validationState;
};

type FetchAuthResponse = {
  ok: boolean;
  message: string;
};

type validationState = {
  emailError: string;
  passwordError: string;
};

type RequestBodyType = {
  email: string;
  password: string;
};
