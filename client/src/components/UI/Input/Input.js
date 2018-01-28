import React from 'react';


const input = (props) => {

    console.log("VALUE: ", props.value);
    let inputElement = null;
    //const inputClasses = [classes.InputElement];

    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        //inputClasses.push(classes.Invalid);
        validationError = (
            <p >
                {props.validationMsg ? props.validationMsg : "Please enter a valid value!"}
            </p>
        );
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('texarea'):
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <input />
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;