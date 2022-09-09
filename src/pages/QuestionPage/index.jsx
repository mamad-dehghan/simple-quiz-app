import React, {useCallback, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleNext} from "../../Redux/Slices/HandleActiveQuestionSlice";
import {setCorrectAnswer, setAnswer, resetAll} from "../../Redux/Slices/Answers/AnswersSlice";
import {useNavigate} from "react-router-dom";
import {endTime} from "../../Redux/Slices/SpendTime";

function QuestionPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {index} = useSelector(store => store.activeQuestionIndex)
	const {questions} = useSelector(store => store.questionList)

	const [question, setQuestion] = React.useState(questions[index] || null);
	const [allAnswers, setAllAnswers] = React.useState([]);
	const [selectedAnswer, setSelectedAnswer] = React.useState(null);
	const [isAnswered, setIsAnswered] = React.useState(false);

	useLayoutEffect(() => {
		if (index === questions.length) {
			dispatch(endTime())
			navigate('/result_page');
		}

		setQuestion(questions[index] || null)
	}, [index])

	useLayoutEffect(() => {
		dispatch(setCorrectAnswer([question.correct_answer, index]))
		setSelectedAnswer(null)
		setIsAnswered(false);
		setAllAnswers([...question.incorrect_answers, question.correct_answer].sort((a, b) => 0.5 - Math.random()));
	}, [question])

	useLayoutEffect(() => {
		if (isAnswered) {
			dispatch(setAnswer([selectedAnswer, index]))
			goNext()
		}
	}, [isAnswered])

	const goNext = useCallback(() => {
		setTimeout(() => {
			dispatch(handleNext())
		}, 1000)
	}, [])

	return (
		<div className='h-screen  pt-12 flex flex-col gap-12 items-center'>
			{/*<input type="range" min={1} max={questions.length} value={index + 1}*/}
			{/*	   className='w-[80%] h-8 bg-gray-200 dark:bg-gray-700'*/}
			{/*/>*/}
			<div
				className="block flex flex-col items-stretch p-8 w-full sm:w-[80%] mx-auto bg-white rounded-lg border border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{question && question['question']}</h5>
				<div className="flex flex-col font-normal text-gray-700 dark:text-gray-400 ">
					{question && allAnswers.map((answer, index) => (
							<div className={`flex items-center mb-4 w-full`} key={index}>

								<input id={`default-radio-${index}`}
									   type="radio" value={answer} name="answer-radio"
									   disabled={isAnswered}
									   checked={selectedAnswer === answer}
									   onChange={() => setSelectedAnswer(answer)}
									   className={'hidden'}/>

								<label htmlFor={`default-radio-${index}`}
									   className={`mx-2 text-base font-medium text-gray-200 leading-relaxed p-2 rounded w-full text-center transition-all duration-300
									     ${selectedAnswer === answer ? 'bg-blue-700 text-white' : ''}
									     ${!isAnswered ? ((selectedAnswer === answer) ? ('cursor-pointer hover:scale-105 bg-blue-500') : 'cursor-pointer hover:scale-105 bg-gray-700') : ''}
									     ${(isAnswered && selectedAnswer === answer) && (question.correct_answer === answer ? '' : ' border-red-600 bg-red-500')}
									     ${isAnswered && (question.correct_answer === answer ? ' border-green-600 bg-green-500' : '')}`}>
									{answer}</label>
							</div>
						)
					)}
				</div>
				<button onClick={() => setIsAnswered(true)} type="button"
						className="text-xl bg-yellow-400 hover:bg-yellow-500 rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 self-end">Next
				</button>
			</div>
		</div>
	);
}

export default QuestionPage;