import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#772CE8',
      contrastText: '#000000',
    },
    error: {
      main: '#d32f2f',
    },
    divider: '#000000',
    info: {
      main: '#2196f3',
    },
    background: {
      default: '#121212',
      paper: '#1b1b1b',
    },
  },
  typography: {
    fontFamily: 'Oswald',
    fontWeightRegular: 300,
  },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
