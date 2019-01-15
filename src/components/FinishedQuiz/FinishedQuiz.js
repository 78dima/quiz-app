import React from 'react';
import {Link} from "react-router-dom";
import './FinishedQuiz.sass';
import Button from '../UI/Button/Button';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key)=> {
        if(props.results[key] === 'success'){
            total++
        }
        return total;
    }, 0);

    return(
        <div className='FinishedQuiz'>
            <h1>Finished</h1>
            <ul className='FinishedQuiz__list'>
                {
                    props.quiz.map((quizItem, index)=>{
                        const cls = ['fa', props.results[quizItem.id] === 'false' ? 'fa-times' : 'fa-check'];
                        return(
                            <li
                                key={index}
                            >{quizItem.question} <i className={cls.join(' ')} /></li>
                        )
                    })
                }
            </ul>
            <div className=''>Количество верных ответов: {successCount} из {props.quiz.length}</div>
            <div className={"Button__wrap-btn"}>
                <Button
                    onClick={props.onClick}
                    type="primary"
                >Повторить</Button>
                <Link to={"/"}>
                    <Button
                        type="success"
                    >Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
};

export default FinishedQuiz