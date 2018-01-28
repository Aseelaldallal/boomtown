// React
import React, { Component } from 'react';
// Axios
import axios from 'axios';
// Material UI
import Input from '../../components/UI/Input/Input';
import Paper from 'material-ui/Paper';
// Utility
import { updateObject, checkValidity } from '../../shared/utility';
import './styles.css';
// SVG Images
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';


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
                    placeholder: 'Bio: Enter Something Interesting!'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 100,
                    maxLength: 500
                },
                valid: false,
                touched: false,
                validationMessage: 'Your bio must be 50-200 characters long. No less, no more'
            }
        },
        formIsValid: false
    }



    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.registerForm[inputIdentifier], {
            value: event.target.value,
            touched: false
        });
        const updatedRegisterForm = updateObject(this.state.registerForm, {
            [inputIdentifier]: updatedFormElement
        });
        this.setState({
            registerForm: updatedRegisterForm
        })
    }

    inputBlurredHandler = (event, inputIdentifier) => {
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
                    blurred={(event) => this.inputBlurredHandler(event, element[0])}
                    validationMsg={element[1].validationMessage}
                />
            );
        });
        return (
            <div className="page register">
                <div className="logo">
                    <img src={logo} alt="Boomtown Logo" />
                </div>
                <div className="topRight">
                    <img src={topRight} alt="Sky" />
                </div>
                <div className="bottomLeft">
                    <img src={bottomLeft} alt="City" />
                </div>
                <div className="cardContainer">
                    <Paper zDepth={5}>
                        <div className="formContainer">
                            <form onSubmit={this.registerationHandler}>
                                {formElements}
                                <button> Submit </button>
                            </form>

                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default RegisterContainer;
