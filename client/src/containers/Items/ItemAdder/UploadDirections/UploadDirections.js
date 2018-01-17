import React, { Component } from 'react';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, grey100, grey900 } from 'material-ui/styles/colors.js';
import TextField from 'material-ui/TextField';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

/**
 * A basic vertical non-linear implementation
 */
class UploadDirections extends Component {
  numSteps = 4;
  state = {
    stepIndex: 0
    // loading: false,
    // finished: false
  };

  // dummyAsync = (cb) => {
  //   this.setState({loading: true}, () => {
  //     this.asyncTimer = setTimeout(cb, 500);
  //   });
  // };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < this.numSteps - 1) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    let buttonLabel = 'Next';
    if (this.state.stepIndex === this.numSteps - 1) {
      buttonLabel = 'Confirm';
    }
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={buttonLabel}
          disableTouchRipple={true}
          disableFocusRipple={true}
          backgroundColor={grey100}
          onClick={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            backgroundColor={grey900}
            labelStyle={{ color: grey50 }}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { stepIndex } = this.state;
    const styles = {
      imageUploader: {
        marginTop: 12
      },
      white: {
        color: grey50
      }
    };
    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
              Add an Image
            </StepButton>
            <StepContent>
              <p style={styles.white}>
                We live in a visual culture. Upload an image of the item you're
                sharing.
              </p>
              <RaisedButton
                style={styles.imageUploader}
                label="SELECT AN IMAGE"
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              Add a Title & Description
            </StepButton>
            <StepContent>
              <p style={styles.white}>
                Folks need to know what you're sharing. Give them a clue by
                adding a title & description.
              </p>
              <TextField
                defaultValue=""
                floatingLabelText="Title"
                floatingLabelFocusStyle={{ color: grey50 }}
                underlineFocusStyle={{ border: '1px solid #212121' }}
              />
              <TextField defaultValue="" floatingLabelText="Description" />
              <br />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              Categorize your Item
            </StepButton>
            <StepContent>
              <p style={styles.white}>
                To share an item, you'll add it to our list of categories. You
                can select multiple categories.
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              Confirm Things!
            </StepButton>
            <StepContent>
              <p style={styles.white}>
                Great! If you're happy with everything, tap the button.
              </p>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default UploadDirections;
