import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<MuiThemeProvider><App/></MuiThemeProvider>, document.getElementById('app'));
});
