import React, { Component } from 'react';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

/**
 * A basic vertical non-linear implementation
 */
class UploadDirections extends Component {
  state = {
    stepIndex: 0
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
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
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
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
              <p>
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
              <p>
                Folks need to know what you're sharing. Give them a clue by
                adding a title & description.
              </p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              Categorize your Item
            </StepButton>
            <StepContent>
              <p>
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
              <p>Great! If you're happy with everything, tap the button.</p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default UploadDirections;
