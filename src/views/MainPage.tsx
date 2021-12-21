import React from "react";
import styled from "styled-components";
import LabelList from "./components/LabelList";
import MemoList from "./components/MemoList/MemoList";

const MainPage: React.FC = () => {
  return (
    <ScMainPage>
      <LabelList />
      <MemoList />
      <section className="memo-writer"></section>
    </ScMainPage>
  );
};

const ScMainPage = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 5fr;
  gap: 40px;

  > * {
    height: 600px;
    max-height: 600px;
    border: ${({ theme }) => theme.borderBlack};
    border: 1px solid;
    overflow-y: auto;
  }
`;

export default MainPage;
