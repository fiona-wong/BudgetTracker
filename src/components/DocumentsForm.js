import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import $ from 'jquery';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import CreateUserForm from './CreateUserForm.js';
import CreateNodeForm from './CreateNodeForm.js';

class DocumentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      openDialog: false,
      snackOpen: false,
      savingAcc: '',
      savingRou: '',
      stepIndex: 0
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFirstSubmit = this.handleFirstSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSecondSubmit = this.handleSecondSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClose() {
    this.setState({
      openDialog: false
    })
  }

  handleOpen() {
    this.setState({
      openDialog: true
    })
  }

  handleFirstSubmit() {
    $.post('/createuser',
    {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    },
    (data) => {
      this.setState({
        stepIndex: 1
      })
    })
  }

  handleSecondSubmit() {
    $.post('/createnode',
    {
      name: this.state.name,
      savingAcc: this.state.savingAcc,
      savingRou: this.state.savingRou
    },
    (data) => {
      this.setState({
        stepIndex: 2
      })
    })
  }

  handleSubmit() {
    $.post('/createtransaction',
    {
      amount: this.props.savingsAmount
    },
    (data) => {
      this.setState({
        snackOpen: true,
        openDialog: false,
        stepIndex: 0
      })
    })
  }

  handleRequestClose() {
    this.setState({
      snackOpen: false
    })
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
      ,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.stepIndex !== 2}
        onClick={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <h2>
          <RaisedButton label="Transfer to Savings" onClick={this.handleOpen} />
          <Dialog
            title="Fill out this form to complete transfer:"
            actions={actions}
            modal={true}
            open={this.state.openDialog}
          >
            <Stepper activeStep={this.state.stepIndex}>
              <Step>
                <StepLabel>Create User Account</StepLabel>
              </Step>
              <Step>
                <StepLabel>Create Bank Node</StepLabel>
              </Step>
              <Step>
                <StepLabel>Confirm Transaction</StepLabel>
              </Step>
            </Stepper>
            {this.state.stepIndex === 0 ?
              <CreateUserForm
              handleFirstSubmit={this.handleFirstSubmit}
              handleChange={this.handleChange}
              /> : null}
            {this.state.stepIndex === 1 ?
              <CreateNodeForm
              handleSecondSubmit={this.handleSecondSubmit}
              handleChange={this.handleChange}
              /> : null}
            {this.state.stepIndex === 2 ?
              `Click "Submit" to send $${this.props.savingsAmount} to savings!` : null}
          </Dialog>
          <Snackbar
            open={this.state.snackOpen}
            message="Transaction success!"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
         />
        </h2>
      </div>
    );
  }
}

export default DocumentsForm;
