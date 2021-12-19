import React from "react";
import { useRecoilState } from "recoil";
import { labelListSelector } from "../../recoil";
import { postAddLabel } from "services";
import styled from "styled-components";

const LabelList: React.FC = () => {
  const [list, setList] = useRecoilState(labelListSelector);

  const addLabel = async () => {
    const title = await window.prompt();
    postAddLabel(title);
  }

  return (
    <LabelListStyled>
      <LabelItem>전체메모</LabelItem>
      {list.map(e => <LabelItem key={e.id}>{e.title} ({e.memoCount})</LabelItem>)}
      <LabelItem onClick={addLabel} className="add-btn">추가하기</LabelItem>
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
