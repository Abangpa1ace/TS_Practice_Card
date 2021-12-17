import React from "react";
import styled from "styled-components";

const LabelList: React.FC = () => {
  const list = [
    {
      "title": "title_01",
      "id": "FGj06YRO",
      "createdAt": "2020-03-02T22:34:15.139Z",
      "updatedAt": "2020-03-02T22:34:15.139Z",
      "memoCount": 5
    },
    {
      "title": "title_02",
      "id": "x36LYo-9",
      "createdAt": "2020-03-02T22:36:55.011Z",
      "updatedAt": "2020-03-02T22:36:55.011Z",
      "memoCount": 3
    }
  ];

  return (
    <LabelListStyled>
      <LabelItem>전체메모</LabelItem>
      {list.map(e => <LabelItem key={e.id}>{e.title} ({e.memoCount})</LabelItem>)}
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
