import React from 'react'
import styled from 'styled-components';
import LabelList from './components/LabelList';
import MemoList from './components/MemoList';

const MainPage: React.FC = () => {
  return (
    <MainPageStyled>
      <LabelList />
      <MemoList />
      <section className="memo-writer"></section>
    </MainPageStyled>
  )
}

const MainPageStyled = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr 6fr;
  gap: 40px;
  
  > * {
    height: 600px;
    max-height: 600px;
    border: ${({ theme }) => theme.borderBlack};
    border: 1px solid;
    border-top: 0;
    overflow-y: auto;
  }
`;

export default MainPage
