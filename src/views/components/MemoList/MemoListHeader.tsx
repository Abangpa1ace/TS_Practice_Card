import React, { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { labelListSelector, memoListSelector, focusLabelState } from "../../../recoil";
import styled from "styled-components";
import Button from '../common/Button';
import { deleteLabel, postAddMemo, putEditLabel } from "services";
import ButtonWrapper from "../common/ButtonWrapper";

const MemoListHeader: React.FC = () => {
  const [focusLabel, setFocusLabel] = useRecoilState(focusLabelState);
  const updateLabelList = useResetRecoilState(labelListSelector);
  const updateMemoList = useResetRecoilState(memoListSelector);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState('');

  const isTotal = !focusLabel;

  useEffect(() => {
    setIsEditTitle(false);
    setTitle(focusLabel?.title ?? '라벨을 선택해주세요.')
  }, [focusLabel])

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

  const removeLabel = async () => {
    await deleteLabel(focusLabel?.id);

    setFocusLabel(null);
    updateLabelList();
  }


  const addMemo = async () => {
    await postAddMemo({ title: '테스트 메모', content: Date.now().toString() });
    updateMemoList();
    updateLabelList();
  }


  return (
    <ScMemoListHeader>
      <div className="title">
        {isEditTitle ? (
          <input value={title} onChange={inputTitle} />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      <ButtonWrapper>
        <h5>라벨 : </h5>
        <Button disabled={isTotal} handleClick={toggleEditTitle}>이름변경</Button>
        <Button disabled={isTotal} handleClick={removeLabel}>삭제</Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <h5>메모 : </h5>
        <Button handleClick={addMemo}>새 메모</Button>
        <Button handleClick={toggleEditTitle}>수정</Button>
        <Button handleClick={toggleEditTitle}>삭제</Button>
      </ButtonWrapper>
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

`;

export default MemoListHeader;
