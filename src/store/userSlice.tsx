import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	email: string;
	isForgotPass: boolean;
}

const initialState: UserState = {
	email: "",
	isForgotPass: false,
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
	},
});

export const { saveEmail, setForgotPassword } = userSlice.actions;
export default userSlice.reducer;
