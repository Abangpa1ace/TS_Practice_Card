import React from "react";
import styled from "styled-components";

const LabelList: React.FC = () => {
  return (
    <LabelListStyled>
      <LabelItem>전체메모</LabelItem>
      <LabelItem className="add-btn">추가하기</LabelItem>
    </LabelListStyled>
  );
};

const LabelListStyled = styled.ul`
  width: 100%;
`;

const LabelItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid black;
  cursor: pointer;

  &.add-btn {
    border-bottom: 1px solid black;
  }
`;

export default LabelList;
