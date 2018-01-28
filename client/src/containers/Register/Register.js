import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import ValidatedTextField from '../../components/UI/ValidatedTextField';

import './styles.css';
import logo from '../../images/boomtown-logo.svg';
import bottomLeft from '../../images/home-bl.svg';
import topRight from '../../images/home-tr.svg';

class Register extends Component {


    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit");
    }

    handleEmailChange = (event) => {
        console.log("hi")
        this.setState({
            email: event.target.value,
        });
    };



    render() {
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
                            <form onSubmit={this.handleSubmit} autoComplete="off">
                                <div>
                                    <ValidatedTextField label="Email" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} />
                                </div>
                                <div>
                                    <ValidatedTextField label="Password" />
                                </div>
                                <RaisedButton className="enterButton" primary fullWidth type="submit">
                                    Enter
                        </RaisedButton>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }

};

// Register.propTypes = {
//     register: PropTypes.func.isRequired
// };

export default Register;
