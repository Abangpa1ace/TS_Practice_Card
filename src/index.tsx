import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading... </div>}>
        <App />
      </React.Suspense>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root'),
);
