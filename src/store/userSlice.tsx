import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	email: string;
	isForgotPass: boolean;
	token: string;
}

const initialState: UserState = {
	email: "",
	isForgotPass: false,
	token: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		saveEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setForgotPassword: (state, action: PayloadAction<boolean>) => {
			state.isForgotPass = action.payload;
		},
		saveToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
	},
});

export const { saveEmail, setForgotPassword, saveToken } = userSlice.actions;
export default userSlice.reducer;
