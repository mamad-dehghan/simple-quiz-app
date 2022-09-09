import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const base64Decoder = (base64)=> {
	return base64.map(item => {
		return {
			question: atob(item.question),
			correct_answer: atob(item.correct_answer),
			incorrect_answers: item.incorrect_answers.map(item => atob(item)),
			category: atob(item.category),
			difficulty: atob(item.difficulty),
			type: atob(item.type)
		}
	})
}

export const fetchGetQuestionApi = createAsyncThunk('getQuestionApi', async ({questionCount,questionCategory,questionDifficulty}) => {

	const params = {
		amount: questionCount,
		type : 'multiple',
		encode:'base64'
	}
	if (questionCategory !=='-1') params.category = questionCategory;
	if (questionDifficulty !=='Any Difficulty') params.difficulty = questionDifficulty;

	console.log(params);
	const response = await axios.get(`https://opentdb.com/api.php`, {params} );
	return await base64Decoder(response.data.results);
})

const APICall = createSlice({
	name: 'apiCall',
	initialState: {
		questions: [],
		state: 'idle'
	},
	extraReducers: {
		[fetchGetQuestionApi.fulfilled]: (state, action) => {
			state.questions = action.payload;
			state.state = 'success';
		},
		[fetchGetQuestionApi.pending]: (state, action) => {
			state.state = 'loading';
		},
		[fetchGetQuestionApi.rejected]: (state, action) => {
			state.state = 'error';
		},
	},
	reducers: {
		setStateToIdle: (state) => {
			state.state = 'idle';
		},
	}

})
export const {setStateToIdle} = APICall.actions;
export default APICall.reducer;