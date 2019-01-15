import React from 'react';
import './Quiz.sass';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../Axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends React.Component{
    state = {
        results: {},
        activeQuestion: 0, // Тут мы будем увеличивать число и вставлять в индекс массива this.state.quiz[activeQuestion]
        answerState: null, // Тут мы добавляем классы, при переходе на след. вопрос, класс очищается
        isFinished: false,
        quiz: [],
        loading: true
    };

    clicked = (answerId)=>{

        if(this.state.answerState){ // Функция для избавления двойного клика
            const key = Object.keys(this.state.answerState);// тут мы получаем свойство success или error
            if(this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]; // Создаем переменную для изменения индекса массива this.state.quiz[] и сменять вопрос
        const results = this.state.results;

        if(question.rightAnswerId === answerId){

            if(!results[question.id]){ // Если в results не лежит error, то вставляем класс success
                results[question.id] = 'success';
            }

            this.setState({ // если id правильного ответа совпадает с id ответа, то добавить класс success
                answerState: {
                    [answerId]: 'success',
                    results: results
                }
            });

            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinished()){

                    this.setState({
                        isFinished: true
                    });

                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,  // тут меняем в стейте каунтер для увеличения индекса массива
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        }
        else{
            results[question.id] = 'false';
            this.setState({
                answerState: {
                    [answerId]: 'false'
                },
                results: results
            });
        }

    };

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = ()=>{ // обнуляем результаты опросника и начинаем заново
      this.setState({
          activeQuestion: 0,
          answerState: null,
          isFinished: false,
          results: {}
      });
    };


    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`);
            console.log(response.data);
            const quiz = response.data;
            this.setState({
                quiz,
                loading: false // Если все загрузилось, то перерисовываем обьект прелоадер в состояние false
            });
        }catch (e) {
            console.log(e);
        }
    }


    render(){
        const answers = this.state.quiz;
        return(
            <div className='Quiz'>
                <h1 className='Quiz__title'>Quiz</h1>
                <div className='Quiz__wrapper'>
                    {this.state.loading
                        ? <Loader/>
                        : this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onClick={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={answers[this.state.activeQuestion].answers} // Благодоря activeQuestion увеличиваем на 1 индекс массива и выводим ответы
                                question={answers[this.state.activeQuestion].question} // Благодоря activeQuestion увеличиваем на 1 индекс массива и выводим вопросы
                                clicked={this.clicked}
                                quizLength={answers.length}
                                activeQuestion={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;