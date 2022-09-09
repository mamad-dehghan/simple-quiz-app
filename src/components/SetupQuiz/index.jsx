import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchGetQuestionApi} from "../../Redux/Slices/APICall";
import Modal from "../Modal";

function Index() {
	const [quizCategories, setQuizCategories] = useState([]);
	const dispatch = useDispatch()
	const {state:apiStatus} = useSelector(store => store.questionList)
	const navigate = useNavigate();


	useEffect(() => {
		axios.get('https://opentdb.com/api_category.php')
			.then(res => {
				setQuizCategories(res.data['trivia_categories']);
				console.log(res.data['trivia_categories']);
			});
	}, [])


	useEffect(() => {
		console.log(apiStatus);
		if (apiStatus === 'success') {
			navigate('/start_question_page');
		}
	},[apiStatus])

	const formik = useFormik({
		initialValues: {
			questionCount: '',
			questionCategory: '-1',
			questionDifficulty: 'Any Difficulty',
		},
		validationSchema: Yup.object().shape({
			questionCount: Yup.number().required('fill question count'),
			questionCategory: Yup.string().required('Required'),
			questionDifficulty: Yup.string().required('Required'),
		}),
		onSubmit: async values => {
			dispatch(fetchGetQuestionApi(values))
		},
	});

	return (
		<div className='w-1/2 m-auto bg-white p-6 rounded-xl'>
			<form className='flex flex-col items-stretch gap-6' onSubmit={formik.handleSubmit}>
				<legend className='text-3xl font-bold'>Setup Quiz</legend>
				<label className='flex flex-col block mb-2 text-sm font-medium text-gray-900 text-left'>
					Question count
					<input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' id="questionCount"
						   name="questionCount" type='text' onChange={formik.handleChange}
						   value={formik.values.questionCount}/>

					{formik.errors.questionCount && <p className='text-red-500 text-sm'>{formik.errors.questionCount}</p>}
				</label>

				<label className='flex flex-col  text-gray-900 text-sm rounded-lg  block w-full text-left'>
					Category
					<select className='w-full bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500  p-2.5' onChange={formik.handleChange}
							value={formik.values.questionCategory}
							id='questionCategory' name='questionCategory'>
						<option key={'-1'} value='Any Category' className=''>Any Category</option>

						{quizCategories.map((item, index) => (
								<option key={index} value={item.id} className=''>{item.name}</option>
							)
						)}
					</select>
				</label>
				<label className='flex flex-col text-gray-900 text-sm rounded-lg block w-full text-left'>
					Difficulty
					<select className='w-full bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2.5' onChange={formik.handleChange}
							value={formik.values.questionDifficulty}
							id='questionDifficulty' name='questionDifficulty'>
						<option  value='Any Difficulty'>Any Difficulty</option>
						<option value='easy'>Easy</option>
						<option value='medium'>Medium</option>
						<option value='hard'>Hard</option>
					</select>
				</label>
				<button type="submit"
						className="text-xl bg-yellow-400 hover:bg-yellow-500 rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300">Start
				</button>
			</form>

			{apiStatus === 'loading' && <Modal open={true} text={'Please wait a moment...'} />}
		</div>
	);
}

export default Index;