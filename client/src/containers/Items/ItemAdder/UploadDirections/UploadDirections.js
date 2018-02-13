// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/';
// Material UI
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, grey100, grey900 } from 'material-ui/styles/colors.js';
import TextField from 'material-ui/TextField';
// Components and Containers
import ItemSelectField from '../../ItemSelectField/ItemSelectField';
//axios
import axios from 'axios';

class UploadDirections extends Component {
  numSteps = 4;
  state = {
    finished: false,
    stepIndex: 0
  };

  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.props.uploadImage(reader.result, file);
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

  submitItem = () => {
    const formData = new FormData();
    formData.append('title', this.props.title);
    formData.append('description', this.props.description);
    formData.append('tags', this.props.tags);
    formData.append('image', this.props.file);
    formData.append('userID', this.props.authUser);

    this.props.addItem(formData, this.props.token);
  };

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
              <RaisedButton
                label="Next"
                disableTouchRipple={true}
                disableFocusRipple={true}
                backgroundColor={grey100}
                onClick={this.handleNext}
                style={{ marginLeft: '1rem' }}
                disabled={this.props.imageURL === '' ? true : false}
              />
            </StepContent>
          </Step>
          {/* ---------------- TITLE, DESC ---------------- */}
          <Step>
            <StepLabel>Add a Title & Description</StepLabel>
            <StepContent>
              <p style={styles.white}>
                Folks need to know what you're sharing. Give them a clue by
                adding a title & description.
              </p>
              <TextField
                defaultValue={this.props.title}
                floatingLabelText="Title"
                floatingLabelFocusStyle={{ color: grey50 }}
                underlineFocusStyle={{ border: '1px solid #212121' }}
                onChange={(e, newValue) => this.props.updateTitle(newValue)}
              />
              <TextField
                defaultValue={this.props.description}
                floatingLabelText="Description"
                onChange={(e, newValue) =>
                  this.props.updateDescription(newValue)
                }
              />
              <br />
              <div style={{ margin: '12px 0' }}>
                <RaisedButton
                  label="Next"
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  backgroundColor={grey100}
                  onClick={this.handleNext}
                  disabled={
                    this.props.title === '' || this.props.description === ''
                  }
                  style={{ marginRight: 12 }}
                />
                <FlatButton
                  label="Back"
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  backgroundColor={grey900}
                  labelStyle={{ color: grey50 }}
                  onClick={this.handlePrev}
                />
              </div>
            </StepContent>
          </Step>
          {/* ---------------- TAGS ---------------- */}
          <Step>
            <StepLabel>Categorize your Item</StepLabel>
            <StepContent>
              <p style={styles.white}>
                To share an item, you'll add it to our list of categories. You
                can select multiple categories.
              </p>
              <ItemSelectField
                onSelectTags={tags => this.props.updateTags(tags)}
                values={this.props.tags}
              />
              <div style={{ margin: '12px 0' }}>
                <RaisedButton
                  label="Next"
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  backgroundColor={grey100}
                  onClick={this.handleNext}
                  disabled={this.props.tags.length === 0}
                  style={{ marginRight: 12 }}
                />
                <FlatButton
                  label="Back"
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  backgroundColor={grey900}
                  labelStyle={{ color: grey50 }}
                  onClick={this.handlePrev}
                />
              </div>
            </StepContent>
          </Step>
          {/* ---------------- CONFIRM ---------------- */}
          <Step>
            <StepLabel>Confirm Things!</StepLabel>
            <StepContent>
              <p style={styles.white}>
                Great! If you're happy with everything, tap the button.
              </p>
              <div style={{ margin: '12px 0' }}>
                <RaisedButton
                  label="Confirm"
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  backgroundColor={grey100}
                  onClick={this.submitItem}
                  style={{ marginRight: 12 }}
                />
                <FlatButton
                  label="Back"
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  backgroundColor={grey900}
                  labelStyle={{ color: grey50 }}
                  onClick={this.handlePrev}
                />
              </div>
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

const mapStateToProps = state => {
  return {
    imageURL: state.itemAdder.imageURL,
    title: state.itemAdder.title,
    description: state.itemAdder.description,
    tags: state.itemAdder.tags,
    file: state.itemAdder.file,
    token: state.auth.auth_user_token,
    authUser: state.auth.auth_user_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (url, file) => dispatch(actions.uploadImage(url, file)),
    updateTitle: title => dispatch(actions.updateTitle(title)),
    updateDescription: desc => dispatch(actions.updateDescription(desc)),
    updateTags: tags => dispatch(actions.updateTags(tags)),
    addItem: (formData, token) => dispatch(actions.addItem(formData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDirections);
