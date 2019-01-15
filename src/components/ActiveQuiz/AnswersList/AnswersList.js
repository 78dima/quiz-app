import React from 'react';
import './AnswersList.sass';
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props =>{

    return (
        <ul className='AnswersList'>
            { props.answers.map( (answer, index)=> {
                return(
                    <AnswerItem
                        key={index}
                        answer={answer}
                        clicked={props.clicked}
                        state={props.state ? props.state[answer.id] : null}
                    />
                )
            } )

            }
        </ul>
    )

};

export default AnswersList;