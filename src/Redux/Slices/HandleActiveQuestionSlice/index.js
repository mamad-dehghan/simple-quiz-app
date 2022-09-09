import {createSlice} from "@reduxjs/toolkit";

const HandelActiveQuestionSlice = createSlice({
	name: 'activeQuestion',
	initialState: {
		index: -1,
	},
	reducers: {
		handleNext(state) {
			console.log('handleNext');
			state.index = state.index + 1;
		},
		start(state) {
			state.index = 0;
		},
		reset(state) {
			state.index = -1;
		}
	}

})
export const {handleNext, start, reset} = HandelActiveQuestionSlice.actions;
export default HandelActiveQuestionSlice.reducer;