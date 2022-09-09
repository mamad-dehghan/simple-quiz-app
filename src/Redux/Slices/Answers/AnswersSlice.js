import {createSlice} from "@reduxjs/toolkit";

const AnswersSlice = createSlice({
	name: 'answers',
	initialState: {
		correctAnswers: [],
		answers: [],
		score: 0,
	},
	reducers: {
		setCorrectAnswer: (state, {payload:[data,index]}) => {
			console.log(data);
			state.correctAnswers[index] = data
		},
		setAnswer: (state, {payload:[data,index]}) => {
			if (state.correctAnswers[index] === data)
				state.score++;

			state.answers[index] = data
		},
		resetAll: (state) => {
			state.answers = [];
			state.correctAnswers = [];
			state.score = 0;
		}
	}
})

export default AnswersSlice.reducer;
export const {setCorrectAnswer, setAnswer, resetAll} = AnswersSlice.actions;