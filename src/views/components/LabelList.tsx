import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { labelListSelector, focusLabelState, totalMemoListSelector } from "../../recoil/main";
import { postAddLabel } from "services";
import styled from "styled-components";
import { LabelItem, LabelList as TLabelList, MemoList } from "types/data";

type TLabelItem = {
  selected?: boolean,
  onClick?: () => void,
}

const LabelList: React.FC = () => {
  const labelList = useRecoilValue<TLabelList>(labelListSelector);
  const [focusLabel, setFocusLabel] = useRecoilState<LabelItem>(focusLabelState);
  const totalMemoList = useRecoilValue<MemoList>(totalMemoListSelector);
  
  const totalCount = totalMemoList?.length;
  
  const updateLabelList = useResetRecoilState(labelListSelector);

  const addLabel = async () => {
    const title = await window.prompt();
    await postAddLabel(title);
    updateLabelList();
  }

  return (
    <ScLabelList>
      <ScLabelItem selected={!focusLabel} onClick={() => setFocusLabel(null)} className="total-btn">전체메모 ({totalCount})</ScLabelItem>
      {labelList.map(e =>
        <ScLabelItem key={e.id} selected={e.id === focusLabel?.id} onClick={() => setFocusLabel(e)}>
          {e.title} ({e.memoCount})
        </ScLabelItem>
      )}
      <ScLabelItem onClick={addLabel} className="add-btn">추가하기</ScLabelItem>
    </ScLabelList>
  );
};

const ScLabelList = styled.ul`
  width: 100%;
`;

const ScLabelItem = styled.li<TLabelItem>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-top: 1px solid black;
  cursor: pointer;
  font-weight: ${({ selected }) => selected && 'bold'};

  &.total-btn {
    border: none;
  }
`;

export default LabelList;
