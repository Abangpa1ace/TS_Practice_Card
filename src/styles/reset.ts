import { createGlobalStyle } from 'styled-components';

const GlobalReset = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  }
  body {
    height: 100vh;
    padding: 80px;
  }
  ul, li {
    list-style: none;
  }
  input {
    background: transparent;
    border: 0;
    outline: 0;
  }
  button {
    background: 0;
    padding: 0;
    border: 0;
    outline: 0;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  
  svg {
    font-size: 20px;
  }
`;

export default GlobalReset;