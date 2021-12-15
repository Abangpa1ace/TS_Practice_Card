import React from 'react'
import styled from 'styled-components';

const MemoList: React.FC = () => {
  return (
    <MemoListStyled>
      <MemoHeader>라벨3</MemoHeader>
    </MemoListStyled>
  )
}

const MemoListStyled = styled.ul`
  > * {
    border-top: 1px solid black;
  }
`;

const MemoHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 15px;
`;

export default MemoList
