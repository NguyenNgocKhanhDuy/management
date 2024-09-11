import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectState {
	idProject: string;
}

const initialState: ProjectState = {
	idProject: "",
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProjectId: (state, action: PayloadAction<string>) => {
			state.idProject = action.payload;
		},
	},
});

export const { setProjectId } = projectSlice.actions;
export default projectSlice.reducer;
