import React, { Component } from 'react';

import Register from './Register';

class RegisterContainer extends Component {
    static propTypes = {};

    register = () => {
        console.log('You clicked the register button.');
    };

    render() {
        return <Register register={this.register} />;
    }
}

export default RegisterContainer;
