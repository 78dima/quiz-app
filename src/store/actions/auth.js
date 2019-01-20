import axios from 'axios';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionType";

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type: AUTH_LOGOUT

    }
}

export function autoLogout(time){
    return (dispatch) => {
        setTimeout(()=>{
            dispatch(logout());
        }, time * 1000);
    }
}

export function autoLogin(){
    return (dispatch) =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export function auth(email, password, isLogin){
    return async (dispatch) => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCuQhzOaJ3pZ4BHkhjdntZuygLGSqHM_sk'; //Либо регистрация
        if(isLogin){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCuQhzOaJ3pZ4BHkhjdntZuygLGSqHM_sk"; //Либо авторизация
        }
        const response = await axios.post(url, authData); // Обращаемся по rest для авторизации
        const data = response.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate); // Обновляем сессию

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
    }
}