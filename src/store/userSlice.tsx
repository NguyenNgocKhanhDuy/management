import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	email: string;
}

const initialState: UserState = {
	email: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		saveEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
	},
});

export const { saveEmail } = userSlice.actions;
export default userSlice.reducer;
