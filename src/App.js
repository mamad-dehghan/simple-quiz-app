import {Route, Routes} from "react-router-dom";
import Home from './pages/Home'
import StartQuiz from "./pages/StartQuiz";
import ResultPage from "./pages/ResultPage";
import QuestionPage from "./pages/QuestionPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/start_question_page" element={<StartQuiz/>}/>
            <Route path="/question_page" element={<QuestionPage/>}/>
            <Route path="/result_page" element={<ResultPage/>}/>
        </Routes>
    );
}

export default App;
