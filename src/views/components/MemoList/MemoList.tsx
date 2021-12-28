import React, { useEffect } from "react";
import { memoListSelector, totalMemoListSelector, checkedMemoListState, focusLabelState } from "../../../recoil/main";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import MemoListHeader from "./MemoListHeader";
import MemoListItem from "./MemoListItem";
import { LabelItem, MemoList as TMemoList } from "types/data";

const MemoList: React.FC = () => {
  const focusLabel = useRecoilValue<LabelItem>(focusLabelState);
  const totalMemoList = useRecoilValue<TMemoList>(totalMemoListSelector);
  const memoList = useRecoilValue<TMemoList>(memoListSelector);

  const setCheckedMemoList = useSetRecoilState(checkedMemoListState);

  useEffect(() => {
    setCheckedMemoList([]);
  }, [focusLabel])

  const handleWholeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const newList = checked ? totalMemoList.map(e => e.id) : [];
    setCheckedMemoList(newList);
  }
  
  return (
    <MemoListStyled>
      <MemoListHeader />
      <ul className="memo-list">
        {!!memoList.length && <WholeCheck>
          <input type='checkbox' onChange={handleWholeCheck} /><span>전체 선택하기</span>
        </WholeCheck>}
        {memoList.map(e => <MemoListItem key={e.id} memo={e}/>)}
      </ul>
    </MemoListStyled>
  );
};

const MemoListStyled = styled.ul`
`;

const WholeCheck = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 2px solid black;

  span {
    display: inline-block;
    margin-left: 8px;
    font-weight: bold;
  }
`;

export default MemoList;
