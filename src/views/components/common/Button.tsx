import React from 'react'
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';

type Props = {
  children: React.ReactNode,
  handleClick: () => void,
}

const Button: React.FC<Props> = ({ children, handleClick }: Props) => {
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

export default Button
