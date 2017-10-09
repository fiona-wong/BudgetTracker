import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

class BudgetFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      amount: 0,
      type: '',
      description: ''
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleDateClick(event, date) {
    this.setState({
      date: date.toString().split(' ').slice(0, 4).join(' ')
    })
  }

  handleAmountChange(event) {
    this.setState({
      amount: Number(event.target.value)
    })
  }

  handleTypeChange(event, index, value) {
    this.setState({
      type: value
    })
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  handleAdd() {
    if (this.state.type === 'Income') {
      this.props.handleAddClick(this.state.amount)
    } else {
      this.props.handleAddClick( -1 * this.state.amount)
    }
  }

  render() {
    return (
      <Grid style={{padding: '20px'}}>
        <Row>
          <Col>
            <DatePicker autoOk={true} hintText="Date" onChange={this.handleDateClick} container="inline" />
          </Col>
          <Col>
            <TextField
              onChange={this.handleAmountChange}
              hintText="Amount(USD) i.e. 1000"
            />
          </Col>
          <Col>
            <SelectField
              hintText="Income/Expense"
              value={this.state.type}
              onChange={this.handleTypeChange}>
              <MenuItem value={"Income"} primaryText="Income" />
              <MenuItem value={"Expense"} primaryText="Expense" />
            </SelectField>
          </Col>
          <Col>
            <TextField
              onChange={this.handleDescriptionChange}
              hintText="Description"
            />
          </Col>
          <Col>
            <RaisedButton label="Add" disabled={this.state.type.length === 0} onClick={this.handleAdd} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default BudgetFields;
