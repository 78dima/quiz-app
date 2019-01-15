import React from 'react';
import './AnswerItem.sass'

const AnswerItem = (props) => {
    const cls = ['AnswerItem'];

    if(props.state){
        cls.push(props.state);
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={() => props.clicked(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
};

export default AnswerItem;