import React from "react";
import styled from "styled-components";
import MemoListHeader from "./MemoListHeader";
import MemoListItem from "./MemoListItem";

const MemoList: React.FC = () => {
  const list = [
    {
      "title": "memo_01",
      "content": "memo_01_content",
      "id": "uw6GPLgl",
      "createdAt": "2020-03-02T22:58:43.694Z",
      "updatedAt": "2020-03-02T22:58:43.694Z"
    },
    {
      "title": "memo_02",
      "content": "memo_02_content",
      "id": "bYE0BjHs",
      "createdAt": "2020-03-02T22:58:48.135Z",
      "updatedAt": "2020-03-02T22:58:48.135Z"
    }
  ]
  return (
    <MemoListStyled>
      <MemoListHeader />
      <ul className="memo-list">
        {list.map(e => <MemoListItem key={e.id} memo={e}/>)}
      </ul>
    </MemoListStyled>
  );
};

const MemoListStyled = styled.ul`
  > * {
    border-bottom: 1px solid black;
  }
`;

export default MemoList;
