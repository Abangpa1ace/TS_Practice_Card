import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { flexCenter } from 'styles/theme';

const Button = ({ children, handleClick }) => {
  return (
    <ScButton onClick={handleClick}>
      {children}
    </ScButton>
  )
}

const ScButton = styled.button`
  ${flexCenter};
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 4px;
`;

Button.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.any,
}

export default Button
