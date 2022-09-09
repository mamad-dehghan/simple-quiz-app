import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SingleQuestionResult from "../../components/SingleQuestoinResult";

function ResultPage() {
    const navigate = useNavigate()
    const {correctAnswers, answers, score} = useSelector(store => store.answers)
    const {questions} = useSelector(store => store.questionList)
    const {startTime, endTime} = useSelector(store => store.time)

    return (
        <div className='w-full h-screen p-6 flex flex-col items-stretch'>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {correctAnswers.map((question, index) => (
                    <SingleQuestionResult key={index} question={questions[index].question}
                                          userAnswer={answers[index]} correctAnswer={correctAnswers[index]}
                                          difficulty={questions[index].difficulty}
                                          category={questions[index].category}
                                          index={index}/>
                ))}
            </ol>
            <div className='flex flex-col items-center py-4'>
                <div className='flex flex-row gap-4'>
                    <p className='text-base font-normal text-gray-900'>Your Score: {score}</p>
                    <p className='text-base font-normal text-gray-800'>Spend Time:
                        {Math.floor((endTime - startTime) / 1000)}s</p>
                </div>
                <button type="button" onClick={() => navigate('/')}
                        className="text-xl bg-yellow-400 hover:bg-yellow-500 rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 self-end">
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default ResultPage;