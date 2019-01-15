import React from 'react';
import './Select.sass';
const Select = (props) => {
    const htmlFor = `${props.label}-${Math.random()}`;
    return (
        <div className={"Select"}>
            <label
                className={"Select__label"}
                htmlFor={htmlFor}
            >{props.label}</label>
            <select
                id={htmlFor}
                className={"Select__select"}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((option, index)=>{
                    return(
                        <option
                            key={option.value + index}
                            value={option.value}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    );
};

export default Select;
