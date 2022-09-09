import React from 'react';
import Badge from "./Badge";

function SingleQuestionResult({question, userAnswer, correctAnswer, index, difficulty, category}) {
	return (
		<li className="mb-2 ml-6 border-b-2">
        <span
			className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-700 rounded-full ring-8 ring-white dark:ring-gray-700 dark:bg-yellow-300">
			{index + 1}
        </span>
			<div className='flex flex-row items-center justify-between'>
				<h3 className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-100 dark:text-gray-800 ">{question}</h3>
				<div className='flex flex-row items-center'>
					<Badge text={difficulty}/>
					<Badge text={category}/>
				</div>
			</div>
			<div className='relative flex flex-col'>
				<p className={`mb-4 py-0.5 px-1 rounded w-full text-base font-normal text-gray-500 dark:text-gray-400 relative top-0 bg-yellow-100 z-10 hover:bg-transparent hover:text-transparent transition-all
				${correctAnswer === userAnswer ? 'dark:bg-green-200 dark:text-green-800' : 'dark:bg-red-200 dark:text-red-800'}`}>
					{userAnswer || 'NOT ANSWERED'}</p>
				<p className={`mb-4 py-0.5 px-1 rounded w-full text-base font-normal text-gray-500 dark:text-gray-600 absolute top-0 bg-yellow-100 `}>
					{correctAnswer}</p>
			</div>

		</li>
	);
}

export default SingleQuestionResult;