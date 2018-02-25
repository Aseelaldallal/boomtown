// React
import React, { Component } from 'react';
// React Router
import { Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// Material UI
import Input from '../../components/UI/Input/Input';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

// Utility
import { updateObject, checkValidity } from '../../shared/utility';
// SVG Images
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';
// Components
import Auxillary from '../../hoc/Auxillary/Auxillary';
// Styles
import './styles.css';

class LoginContainer extends Component {
  state = {
    loginForm: {
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
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true,
          isPassword: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter a password'
      }
    },
    formIsValid: false
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.loginForm[inputIdentifier],
      {
        value: event.target.value,
        touched: false
      }
    );
    const updatedLoginForm = updateObject(this.state.loginForm, {
      [inputIdentifier]: updatedFormElement
    });
    this.setState({
      loginForm: updatedLoginForm
    });
  };

  inputBlurredHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.loginForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.loginForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedLoginForm = updateObject(this.state.loginForm, {
      [inputIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      loginForm: updatedLoginForm,
      formIsValid: formIsValid
    });
  };

  loginHandler = event => {
    event.preventDefault();
    const identifiers = [];
    const updatedFields = [];
    for (let inputIdentifier in this.state.loginForm) {
      const updatedFormElement = updateObject(
        this.state.loginForm[inputIdentifier],
        {
          valid: checkValidity(
            this.state.loginForm[inputIdentifier].value,
            this.state.loginForm[inputIdentifier].validation
          ),
          touched: true
        }
      );
      identifiers.push(inputIdentifier);
      updatedFields.push(updatedFormElement);
    }
    const updatedLoginForm = {};
    for (let i = 0; i < identifiers.length; i++) {
      updatedLoginForm[identifiers[i]] = updatedFields[i];
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      loginForm: updatedLoginForm,
      formIsValid: formIsValid
    });
    if (formIsValid) {
      const formData = {
        email: this.state.loginForm['email'].value,
        password: this.state.loginForm['password'].value
      };
      
      this.props.loginUser(formData);
    }
  };

  render() {
    const formElements = Object.entries(this.state.loginForm).map(element => {
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
    });

    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to={`/profile/${this.props.auth_user_id}`} />;
    }

    let errors = null;
    let i = 0;
    if (this.props.auth_errors.length !== 0) {
      errors = this.props.auth_errors.map(err => {
        i++;
        return (
          <p key={i} className="error">
            {err}
          </p>
        );
      });
    }

    return (
      <Auxillary>
        {redirect}
        <div className="page login">
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
                <form onSubmit={this.loginHandler}>
                  {errors}
                  {formElements}
                  <RaisedButton
                    className="enterButton"
                    primary
                    fullWidth
                    type="submit"
                  >
                    Login
                  </RaisedButton>
                </form>
                <hr className="hr-text" data-content="Don't have an account?"/>
                <RaisedButton
                    className="enterButton"
                    primary
                    fullWidth
                    onClick={()=>this.props.history.push('/register')}
                    style={{marginTop:'0.5rem'}}
                  >
                    Switch to Register
                  </RaisedButton>
              </div>
            </Paper>
          </div>
        </div>
      </Auxillary>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.auth_user_token !== null,
    auth_user_id: state.auth.auth_user_id,
    auth_errors: state.auth.auth_error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: userData => dispatch(actions.loginUser(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
