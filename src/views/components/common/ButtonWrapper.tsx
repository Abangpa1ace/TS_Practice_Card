import React from 'react'
import styled from "styled-components";

type Props = {
  children?: React.ReactNode,
}

const ButtonWrapper: React.FC<Props> = ({ children }: Props) => {
  return (
    <ScButtonWrapper>
      {children}
    </ScButtonWrapper>
  )
}

const ScButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  
  > button {
    font-size: 12px;
  }
`;

export default ButtonWrapper
