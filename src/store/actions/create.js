import {CREATE_QUIZ_ACTION, RESET_QUIZ_CREATION} from "./actionType";
import axios from "../../Axios/axios-quiz";

export function createQuizQuestion(item){
    return{
        type: CREATE_QUIZ_ACTION,
        item
    }
}

export function resetQuizCreation(){
    return{
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz(){
    return async (dispatch, getState) =>{
        await axios.post('quizes.json', getState().create.quiz); // Отправить запрос в первый аргумент URL.json, второй параметр наш стейт
        dispatch(resetQuizCreation());
    }
}