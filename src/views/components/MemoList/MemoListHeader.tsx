import React, { useState, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { labelListSelector, memoListSelector, focusLabelState } from "../../../recoil";
import styled from "styled-components";
import Button from '../common/Button';
import { postAddMemo, putEditLabel } from "services";

const MemoListHeader: React.FC = () => {
  const focusLabel = useRecoilValue(focusLabelState);
  const updateLabelList = useResetRecoilState(labelListSelector);
  const updateMemoList = useResetRecoilState(memoListSelector);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(focusLabel?.title ?? '라벨을 선택해주세요.')
  }, [focusLabel])

  const addMemo = async () => {
    await postAddMemo({ title: '테스트 메모', content: Date.now().toString() });
    updateMemoList();
    updateLabelList();
  }

  const toggleEditTitle = async () => {
    if (isEditTitle && focusLabel.title !== title) {
      await putEditLabel({ id: focusLabel.id, title })
      updateLabelList()
    }
    setIsEditTitle(!isEditTitle);
  };

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  return (
    <ScMemoListHeader>
      <div className="title">
        {isEditTitle ? (
          <input value={title} onChange={inputTitle} />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      <div className="buttons">
        <h5>라벨 : </h5>
        <Button disabled={!focusLabel} handleClick={toggleEditTitle}>이름변경</Button>
        <Button handleClick={toggleEditTitle}>삭제</Button>
      </div>
      <div className="buttons">
        <h5>메모 : </h5>
        <Button handleClick={addMemo}>새 메모</Button>
        <Button handleClick={toggleEditTitle}>수정</Button>
        <Button handleClick={toggleEditTitle}>삭제</Button>
      </div>
    </ScMemoListHeader>
  );
};

const ScMemoListHeader = styled.header`
  padding: 10px 15px;

  .title {
    input {
      padding: 2px 5px;
      border: 1px solid black;
      border-radius: 4px;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    
    > button {
      font-size: 12px;
    }
  }
`;

export default MemoListHeader;
