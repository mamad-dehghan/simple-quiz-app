import {configureStore} from "@reduxjs/toolkit";
import questionList from "../Slices/APICall";
import activeQuestionIndex from "../Slices/HandleActiveQuestionSlice";
import answers from "../Slices/Answers/AnswersSlice";
import time from "../Slices/SpendTime";

const store = configureStore({
	reducer:{
		questionList,
		activeQuestionIndex,
		answers,
		time,
	}
})

export default store