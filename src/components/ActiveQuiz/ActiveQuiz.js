import React from 'react';
import './ActiveQuiz.sass';
import AnswersList from './AnswersList/AnswersList';


const ActiveQuiz = props => {

    return(
        <div className='ActiveQuiz'>
            <div className='ActiveQuiz__question-wrapper'>
                <div className='ActiveQuiz__question'>{props.question}</div>
                <small className='ActiveQuiz__question-of'>{props.activeQuestion} из {props.quizLength}</small>
            </div>
            <AnswersList
                state={props.state}
                answers={props.answers}
                clicked={props.clicked}
            />
        </div>
    )

};

export default ActiveQuiz;