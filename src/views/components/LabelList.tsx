import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { labelListSelector, onLabelIdState } from "../../recoil";
import { getLabelList, postAddLabel } from "services";
import styled from "styled-components";
import { LabelList as TLabelList } from "types/data";

type TLabelItem = {
  on?: boolean,
  onClick?: () => void,
}

const LabelList: React.FC = () => {
  const list = useRecoilValue(labelListSelector);
  const updateList = useResetRecoilState(labelListSelector);
  const [onId, setOnId] = useRecoilState(onLabelIdState);

  const totalCount = list.reduce((acc,cur) => { return acc + cur.memoCount}, 0)

  const addLabel = async () => {
    const title = await window.prompt();
    await postAddLabel(title);
    updateList();
  }

  return (
    <ScLabelList>
      <ScLabelItem>전체메모 ({totalCount})</ScLabelItem>
      {list.map(e => 
        <ScLabelItem key={e.id} on={e.id === onId} onClick={() => setOnId(e.id)}>
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
  font-weight: ${({ on }) => on && 'bold'};

  &.add-btn {
    border-bottom: 1px solid black;
  }
`;

export default LabelList;
