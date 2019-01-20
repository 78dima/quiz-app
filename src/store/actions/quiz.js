import axios from '../../Axios/axios-quiz';
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY
} from "./actionType";

export function fetchQuizes() { // Функционал для подключения к бд дате и сбора данных
    return async (dispatch) =>{
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('quizes.json');

            const quizes = [];
            Object.keys(response.data).forEach((key, index)=>{
                quizes.push({
                    id: key,
                    name: `Test № ${index + 1}`
                });
            });
            dispatch(fetchQuizesSuccess(quizes))
        }catch (e) {
            dispatch(fetchQuizesError())
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizSuccess(quiz){
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz
    }
}

export function fetchQuizesSuccess(quizes) {
    return{
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizesError(e) {
    return {
        FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizById(quizId){
    return async (dispatch) =>{
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        }catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function quizSetState(answerState, results ){
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }

}

export function finishQuiz(){
    return{
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number){
    return{
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz(){
    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) => {
        const state = getState().quiz; // Получаем стейт квиза
        if(state.answerState){ // Функция для избавления двойного клика
            const key = Object.keys(state.answerState);// тут мы получаем свойство success или error
            if(state.answerState[key] === 'success'){
                return
            }
        }

        const question = state.quiz[state.activeQuestion]; // Создаем переменную для изменения индекса массива this.state.quiz[] и сменять вопрос
        const results = state.results;

        if(question.rightAnswerId === answerId){

            if(!results[question.id]){ // Если в results не лежит error, то вставляем класс success
                results[question.id] = 'success';
            }

            dispatch(quizSetState({ [answerId]: 'success'}, results));
            // this.setState({ // если id правильного ответа совпадает с id ответа, то добавить класс success
            //     answerState: {
            //         [answerId]: 'success',
            //         results: results
            //     }
            // });

            const timeout = window.setTimeout(()=>{
                if(isQuizFinished(state)){
                    dispatch(finishQuiz()); // Диспатч для завершения теста
                    // this.setState({
                    //     isFinished: true
                    // });

                }else{
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                    // this.setState({
                    //     activeQuestion: state.activeQuestion + 1,  // тут меняем в стейте каунтер для увеличения индекса массива
                    //     answerState: null
                    // });
                }
                window.clearTimeout(timeout);
            }, 1000);
        }
        else{
            results[question.id] = 'false';
            dispatch(quizSetState({ [answerId]: 'false'}, results));
            // this.setState({
            //     answerState: {
            //         [answerId]: 'false'
            //     },
            //     results: results
            // });
        }
    }
}
function isQuizFinished(state){
    return state.activeQuestion + 1 === state.quiz.length
}
