import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import Routes from './Routes';

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root'),
);
