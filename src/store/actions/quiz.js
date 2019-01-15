import axios from '../../Axios/axios-quiz';
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionType";

export function fetchQuizes() {
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