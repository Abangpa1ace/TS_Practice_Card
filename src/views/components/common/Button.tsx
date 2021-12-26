import React from 'react'
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';

type Props = {
  children?: React.ReactNode,
  disabled?: boolean,
  handleClick?: () => void,
}

const Button: React.FC<Props> = ({ children, disabled, handleClick }: Props) => {
  return (
    <ScButton disabled={disabled} onClick={handleClick}>
      {children ?? '클릭'}
    </ScButton>
  )
}

const ScButton = styled.button`
  ${flexCenter};
  padding: 3px 6px;
  border: 1px solid black;
  border-radius: 4px;

  &:disabled {
    color: black;
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default Button
