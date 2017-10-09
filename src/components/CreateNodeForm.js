import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const CreateNodeForm = (props) => (
  <div>
    <Row center="xs">
        <Col>
        <TextField
          hintText="12345678910"
          floatingLabelText="Saving Account Number"
          type="text"
          name="savingAcc"
          onChange={props.handleChange}
        /><br />
        <TextField
          hintText="123456789"
          floatingLabelText="Saving Routing Number"
          type="text"
          name="savingRou"
          onChange={props.handleChange}
        /><br />
      </Col>
    </Row>
    <Row center="xs">
      <FlatButton
        label="Next"
        primary={true}
        onClick={props.handleSecondSubmit}
      />
    </Row>
  </div>
);


export default CreateNodeForm;
