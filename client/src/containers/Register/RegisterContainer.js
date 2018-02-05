// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// Material UI
import Input from '../../components/UI/Input/Input';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
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
        validationMessage: 'Your password must be at least 7 characters long'
      },
      bio: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Bio: Enter Something Interesting!'
        },
        value: '',
        validation: {
          required: true,
          minLength: 50,
          maxLength: 200
        },
        valid: false,
        touched: false,
        validationMessage:
          'Your bio must be 50-200 characters long. No less, no more'
      }
    },
    formIsValid: false
  };

  componentWillReceiveProps = nextProps => {

    if (nextProps.auth_user) {
      this.props.history.push('./profile/' + nextProps.auth_user._id);
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.registerForm[inputIdentifier],
      {
        value: event.target.value,
        touched: false
      }
    );
    const updatedRegisterForm = updateObject(this.state.registerForm, {
      [inputIdentifier]: updatedFormElement
    });
    this.setState({
      registerForm: updatedRegisterForm
    });
  };

  inputBlurredHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.registerForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.registerForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
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
    });
  };

  registerHandler = event => {
    event.preventDefault();
    const identifiers = [];
    const updatedFields = [];
    for (let inputIdentifier in this.state.registerForm) {
      const updatedFormElement = updateObject(
        this.state.registerForm[inputIdentifier],
        {
          valid: checkValidity(
            this.state.registerForm[inputIdentifier].value,
            this.state.registerForm[inputIdentifier].validation
          ),
          touched: true
        }
      );
      identifiers.push(inputIdentifier);
      updatedFields.push(updatedFormElement);
    }
    const updatedRegisterForm = {};
    for (let i = 0; i < identifiers.length; i++) {
      updatedRegisterForm[identifiers[i]] = updatedFields[i];
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedRegisterForm) {
      formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      registerForm: updatedRegisterForm,
      formIsValid: formIsValid
    });
    if (formIsValid) {
      const formData = {
        fullname: this.state.registerForm['fullname'].value,
        email: this.state.registerForm['email'].value,
        password: this.state.registerForm['password'].value,
        bio: this.state.registerForm['bio'].value
      };
      alert("Will submit formData: ", formData);
      this.props.registerUser(formData);
    }


  };

  render() {
    const formElements = Object.entries(this.state.registerForm).map(
      element => {
        return (
          <Input
            key={element[0]}
            elementType={element[1].elementType}
            elementConfig={element[1].elementConfig}
            value={element[1].value}
            invalid={!element[1].valid}
            shouldValidate={element[1].validation}
            touched={element[1].touched}
            changed={event => this.inputChangedHandler(event, element[0])}
            blurred={event => this.inputBlurredHandler(event, element[0])}
            validationMsg={element[1].validationMessage}
          />
        );
      }
    );
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
              <form onSubmit={this.registerHandler}>
                {formElements}
                <RaisedButton
                  className="enterButton"
                  primary
                  fullWidth
                  type="submit"
                >
                  Register
                </RaisedButton>
              </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    auth_user: state.auth.auth_user
  };

}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (userData) => dispatch(actions.registerUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
