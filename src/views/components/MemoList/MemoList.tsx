import React from "react";
import styled from "styled-components";
import MemoListHeader from "./MemoListHeader";

const MemoList: React.FC = () => {
  return (
    <MemoListStyled>
      <MemoListHeader />
    </MemoListStyled>
  );
};

const MemoListStyled = styled.ul`
  > * {
    border-bottom: 1px solid black;
  }
`;

export default MemoList;
