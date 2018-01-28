import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';


class RegisterContainer extends Component {

    state = {
        registerForm: {
            fullname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 120
                },
                valid: false,
                touched: false,
                validationMessage: 'Name cannot be blank'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                validationMessage: 'Please enter a valid email address'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'test',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true,
                    minLength: 7,
                    maxLength: 120
                },
                valid: false,
                touched: false,
                validationMessage: 'Your password must be at least 8 characters long'
            },
            bio: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Enter something interesting!'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 100,
                    maxLength: 500
                },
                valid: false,
                touched: false,
                validationMessage: 'Your bio must be 100-500 characters long. No less, no more'
            }
        },
        formIsValid: false
    }



    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.registerForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.registerForm[inputIdentifier].validation),
            touched: true
        });
        const updatedRegisterForm = updateObject(this.state.registerForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            registerForm: updatedRegisterForm,
            formIsValid: formIsValid
        })
    }

    registerHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElement in this.state.registerForm) {
            formData[formElement] = this.state.registerForm[formElement].value;
        }
    }

    render() {

        const formElements = Object.entries(this.state.registerForm).map(element => {
            return (
                <Input key={element[0]}
                    elementType={element[1].elementType}
                    elementConfig={element[1].elementConfig}
                    value={element[1].value}
                    invalid={!element[1].valid}
                    shouldValidate={element[1].validation}
                    touched={element[1].touched}
                    changed={(event) => this.inputChangedHandler(event, element[0])}
                    validationMsg={element[1].validationMessage} />
            );
        });
        return (
            <div>
                <form onSubmit={this.registerationHandler}>
                    {formElements}
                    <button> Submit </button>
                </form>
            </div>
        );
    }
}

export default RegisterContainer;
