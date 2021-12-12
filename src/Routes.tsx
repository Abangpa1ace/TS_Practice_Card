import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalReset from './styles/reset';
import theme from './styles/theme';

function Routes() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalReset />
        <Route path="/" />
      </ThemeProvider>
    </Router>
  );
}
export default Routes;
