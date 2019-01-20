import React from 'react';
import './Quiz.sass';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends React.Component{

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render(){
        const answers = this.props.quiz;

        return(
            <div className='Quiz'>
                <h1 className='Quiz__title'>Quiz</h1>
                <div className='Quiz__wrapper'>
                    {this.props.loading || !this.props.quiz
                        ? <Loader/>
                        : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onClick={this.props.retryQuiz}
                            />
                            : <ActiveQuiz
                                answers={answers[this.props.activeQuestion].answers} // Благодоря activeQuestion увеличиваем на 1 индекс массива и выводим ответы
                                question={answers[this.props.activeQuestion].question} // Благодоря activeQuestion увеличиваем на 1 индекс массива и выводим вопросы
                                clicked={this.props.quizAnswerClick}
                                quizLength={answers.length}
                                activeQuestion={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion, // Тут мы будем увеличивать число и вставлять в индекс массива this.state.quiz[activeQuestion]
        answerState: state.quiz.answerState, // Тут мы добавляем классы, при переходе на след. вопрос, класс очищается
        isFinished: state.quiz.isFinished,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading // Для отображения прелоадера перед загрузкой
    }
}

function mapDispatchToProps(dispatch){
   return{
        fetchQuizById: (id)=> dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: ()=> dispatch(retryQuiz())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);