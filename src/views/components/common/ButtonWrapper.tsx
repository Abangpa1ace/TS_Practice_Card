import React from 'react'
import styled from "styled-components";

interface Props {
  children?: React.ReactNode | string,
  margin?: string, 
}

const ButtonWrapper: React.FC<Props> = ({ children, margin }: Props) => {
  return (
    <ScButtonWrapper style={{ margin }}>
      {children}
    </ScButtonWrapper>
  )
}

export const ScButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  
  > button {
    font-size: 12px;
  }
`;

export default ButtonWrapper
