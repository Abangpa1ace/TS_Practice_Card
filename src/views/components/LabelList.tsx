import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { labelListSelector, focusLabelIdState } from "../../recoil";
import { getLabelList, postAddLabel } from "services";
import styled from "styled-components";
import { LabelList as TLabelList } from "types/data";

type TLabelItem = {
  selected?: boolean,
  onClick?: () => void,
}

const LabelList: React.FC = () => {
  const [labelList, setLabelList] = useState([]);
  const [focusLabel, setFocusLabel] = useRecoilState(focusLabelIdState);

  const totalCount = labelList.reduce((acc,cur) => { return acc + cur.memoCount}, 0)

  const updateList = async () => {
    const list = await getLabelList();
    setLabelList(list);
  }

  const addLabel = async () => {
    const title = await window.prompt();
    await postAddLabel(title);
    updateList();
  }

  useEffect(() => {
    updateList();
  }, [])

  return (
    <ScLabelList>
      <ScLabelItem onClick={() => setOnId('')}>전체메모 ({totalCount})</ScLabelItem>
      {labelList.map(e => 
        <ScLabelItem key={e.id} selected={e.id === onId} onClick={() => setOnId(e.id)}>
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
  border-bottom: 1px solid black;
  cursor: pointer;
  font-weight: ${({ selected }) => selected && 'bold'};

  &.add-btn {
    border-bottom: 1px solid black;
  }
`;

export default LabelList;
