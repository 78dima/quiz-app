import React from 'react';
import './Backdrop.sass';

const Backdrop = (props)=>{
    return(
        <div
            className='Backdrop'
            onClick={props.isClose}
        ></div>
    )
};

export default Backdrop;