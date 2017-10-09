import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const CreateUserForm = (props) => (
  <Row center="xs">
    <Col>
      <TextField
        hintText="test@test.com"
        floatingLabelText="E-mail"
        type="text"
        name="email"
        onChange={props.handleChange}
      /><br />
      <TextField
        hintText="Test McTest"
        floatingLabelText="Full Legal Name"
        type="text"
        name="name"
        onChange={props.handleChange}
      /><br />
      <TextField
        hintText="888.111.1111"
        floatingLabelText="Phone Number"
        type="text"
        name="phone"
        onChange={props.handleChange}
      /><br />
      <TextField
        hintText="Password12345"
        floatingLabelText="Password"
        type="password"
        name="password"
        onChange={props.handleChange}
      /><br />
      <FlatButton
        label="Next"
        primary={true}
        onClick={props.handleFirstSubmit}
      />
    </Col>
  </Row>
);


export default CreateUserForm;
