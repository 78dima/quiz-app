import axios from 'axios';
export default axios.create({
   baseURL: 'https://reqct-quiz.firebaseio.com/'
});