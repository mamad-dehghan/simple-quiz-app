import React, {useCallback, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setStateToIdle} from "../../Redux/Slices/APICall";
import {useNavigate} from "react-router-dom";
import {start} from "../../Redux/Slices/HandleActiveQuestionSlice";
import {resetAll} from "../../Redux/Slices/Answers/AnswersSlice";
import {startTime} from "../../Redux/Slices/SpendTime";


function StartQuiz() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {questions} = useSelector(store => store.questionList)

	const getQuestionsInformation = useCallback(() => {
		let categories = new Set(questions.map(question => question.category))
		let difficulties = new Set(questions.map(question => question.difficulty))
		return {
			amount: questions.length,
			'category(s)': (categories.size === 1) ? categories.values().next().value : 'Any Category',
			'difficulty(s)': (difficulties.size === 1) ? difficulties[0] : 'Any Difficulty',
			type: questions[0].type
		}
	}, [])

	useLayoutEffect(() => {
		dispatch(setStateToIdle())
	}, [])

	return (
		<div className='flex flex-col items-center h-screen w-full pt-8'>
			<div
				className="flex flex-col min-w-[20rem] w-1/2 items-start p-6 max-w-xl rounded-lg border border-gray-200 shadow-md bg-gray-800 dark:border-gray-700">
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-200">Are you Ready to start?</p>
				<div className='p-4 bg-gray-600 rounded-lg w-full mb-3'>
					{Object.keys(getQuestionsInformation()).map((key, index) => (
						<p key={index}
						   className="mb-3 font-normal text-gray-700 dark:text-gray-300 capitalize">{key}: {getQuestionsInformation()[key]}</p>
					))}
				</div>
				<button
					className="text-black bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 self-end"
					type="button" onClick={() => {
					dispatch(resetAll())
					dispatch(start());
					dispatch(startTime())
					navigate('/question_page')
				}}>Start Quiz
				</button>
			</div>
		</div>
	);
}

export default StartQuiz;