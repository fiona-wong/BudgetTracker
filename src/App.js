import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import BudgetFields from './components/BudgetFields.js';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DocumentsForm from './components/DocumentsForm.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 0,
      savings: 0,
      savingsPercentage: '',
      startingChecking: 0,
      startingSavings: 0,
      numberOfRows: [1]
    }
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
  }

  handleAddClick(amount) {
    this.setState({
      totalAmount: this.state.totalAmount + amount,
      numberOfRows: this.state.numberOfRows.concat(this.state.numberOfRows.length + 1)
    })
  }

  handleSaveChange(event, index, value) {
    this.setState({
      savingsPercentage: value,
      savings: value * this.state.totalAmount
    })
  }

  render() {
    return (
      <div style={{fontFamily: "Roboto"}}>
        <AppBar
          title="Monthly Budget Tracker"
        />
        {this.state.numberOfRows.map(row => (
          <BudgetFields
            key={row}
            handleAddClick={this.handleAddClick}
            />)
        )}
        <Grid>
          <Row>
            <Col>
              <h2>Total Amount: $ {this.state.totalAmount}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectField
                hintText="Save Percentage"
                value={this.state.savingsPercentage}
                onChange={this.handleSaveChange}>
                <MenuItem value={.1} primaryText="10%" />
                <MenuItem value={.25} primaryText="25%" />
                <MenuItem value={.50} primaryText="50%" />
                <MenuItem value={.75} primaryText="75%" />
              </SelectField>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Total Saved: $ {this.state.savings}</h2>
              <DocumentsForm
                savingsAmount={this.state.savings}
              />
             </Col>
          </Row>
          <Row>
            <Col>
              <h2>Excess to Spend: $ {this.state.totalAmount - this.state.savings}</h2>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
