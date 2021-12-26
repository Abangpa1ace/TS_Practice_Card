import React from "react";
import { memoListSelector } from "../../../recoil";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import MemoListHeader from "./MemoListHeader";
import MemoListItem from "./MemoListItem";

const MemoList: React.FC = () => {
  const memoList = useRecoilValue(memoListSelector);

  return (
    <MemoListStyled>
      <MemoListHeader />
      <ul className="memo-list">
        {memoList.map(e => <MemoListItem key={e.id} memo={e}/>)}
      </ul>
    </MemoListStyled>
  );
};

const MemoListStyled = styled.ul`
`;

export default MemoList;
