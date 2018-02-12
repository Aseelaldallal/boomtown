import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, grey100, grey900 } from 'material-ui/styles/colors.js';
import TextField from 'material-ui/TextField';

/**
 * A basic vertical non-linear implementation
 */
class UploadDirections extends Component {
  file = '';
  imagePreviewUrl = '';
  numSteps = 4;
  state = {
    finished: false,
    stepIndex: 0
  };

  // handleImageSelect = () => {
  //   console.log('Handle Image Select');
  //   var event = new Event('change', { bubbles: true });
  //   this.myinput.dispatchEvent(event);
  // };

  handleImageChange = e => {
    e.preventDefault();
    console.log('EVENT: ', e);
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log('ImagePreviewURL: ', reader.result);
    console.log('file: ', file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.uploadImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  handleNext = event => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= this.numSteps - 1
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    const { stepIndex } = this.state;
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === this.numSteps - 1 ? 'Confirm' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          backgroundColor={grey100}
          onClick={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
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
    const { finished, stepIndex } = this.state;
    const styles = {
      imageUploader: {
        marginTop: 12
      },
      white: {
        color: grey50
      }
    };
    // let uploadInput = false;

    return (
      <div style={{ maxWidth: 500, maxHeight: 400, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          {/* ---------------- IMAGE STEP ---------------- */}
          <Step>
            <StepLabel>Add an Image</StepLabel>
            <StepContent>
              <p style={styles.white}>
                We live in a visual culture. Upload an image of the item you're
                sharing.
              </p>

              <RaisedButton
                style={styles.imageUploader}
                label="SELECT AN IMAGE"
                onClick={() => this.myinput.click()}
              />

              <input
                style={styles.imageUploader}
                className="fileInput"
                type="file"
                ref={input => (this.myinput = input)}
                onChange={e => this.handleImageChange(e)}
                hidden
              />

              {this.renderStepActions(0)}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Add a Title & Description</StepLabel>
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
            <StepLabel>Categorize your Item</StepLabel>
            <StepContent>
              <p style={styles.white}>
                To share an item, you'll add it to our list of categories. You
                can select multiple categories.
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirm Things!</StepLabel>
            <StepContent>
              <p style={styles.white}>
                Great! If you're happy with everything, tap the button.
              </p>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <a
            href="#"
            onClick={event => {
              event.preventDefault();
              this.setState({ stepIndex: 0, finished: false });
            }}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: url => dispatch(actions.uploadImage(url))
  };
};

export default connect(null, mapDispatchToProps)(UploadDirections);
