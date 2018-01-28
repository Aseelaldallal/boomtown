import React from 'react';
import TextField from 'material-ui/TextField';


const input = (props) => {

    let inputElement = null;
    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        validationError = props.validationMsg ? props.validationMsg : "Please enter a valid value!";
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <TextField
                hintText={props.elementConfig.placeholder}
                floatingLabelText={props.elementConfig.placeholder}
                value={props.value}
                onChange={props.changed}
                errorText={validationError}
                onBlur={props.blurred}

            />
            break;
        case ('textarea'):
            inputElement = <TextField
                hintText={props.elementConfig.placeholder}
                floatingLabelText={props.elementConfig.placeholder}
                value={props.value}
                onChange={props.changed}
                onBlur={props.blurred}
                errorText={validationError}
                multiLine={true}
                rows={8}
            />
            break;
        default:
            inputElement = <input />
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;