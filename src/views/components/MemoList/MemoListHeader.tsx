import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { labelListSelector, memoListSelector, focusLabelState, checkedMemoListState } from "../../../recoil/main";
import styled from "styled-components";
import Button from '../common/Button';
import { deleteLabel, postAttachLabel, putEditLabel } from "services";
import ButtonWrapper from "../common/ButtonWrapper";
import { LabelItem, LabelList, MemoList } from "types/data";

0
const MemoListHeader: React.FC = () => {
  /* Recoil State */
  const labelList = useRecoilValue<LabelList>(labelListSelector);
  const memoList = useRecoilValue<MemoList>(memoListSelector);
  const checkedMemoList = useRecoilValue<string[]>(checkedMemoListState);
  const [focusLabel, setFocusLabel] = useRecoilState<LabelItem>(focusLabelState);
  
  /* Computed By Recoil State */
  const isTotal = !focusLabel;

  /* Recoil Reseter */
  const updateLabelList = useResetRecoilState(labelListSelector);
  const updateMemoList = useResetRecoilState(memoListSelector);
  const resetCheckedMemoList = useResetRecoilState(checkedMemoListState);

  /* Comp State */
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setIsEditTitle(false);
    setTitle(focusLabel?.title ?? '라벨을 선택해주세요.')
  }, [focusLabel])

  const attachLabel = async () => {
    if (!checkedMemoList.length) {
      alert('메모를 먼저 선택해주세요!');
      return;
    }
    const title = await window.prompt();
    const label = labelList.find(e => e.title === title)
    if (!label) return;
    await postAttachLabel({ id: label.id, memoIds: checkedMemoList });
    updateLabelList();
    resetCheckedMemoList();
    setFocusLabel(label);
  }

  const detachLabel = async () => {
    if (!checkedMemoList.length) {
      alert('메모를 먼저 선택해주세요!');
      return;
    }
    const body = {
      id: focusLabel?.id,
      memoIds: checkedMemoList,
      isDetach: true,
    }
    await postAttachLabel(body);
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

  const removeLabel = async () => {
    await deleteLabel(focusLabel?.id);

    setFocusLabel(null);
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
        {isTotal
          ? <>
            <Button disabled={!checkedMemoList.length} handleClick={attachLabel}>라벨부여</Button>
          </>
          : <>
            <Button handleClick={toggleEditTitle}>이름변경</Button>
            <Button handleClick={removeLabel}>삭제</Button>
            <Button disabled={!memoList.length || !checkedMemoList.length} handleClick={detachLabel}>라벨제거</Button>
          </>
        }
      </ButtonWrapper>
    </ScMemoListHeader>
  );
};

const ScMemoListHeader = styled.header`
  padding: 10px 15px 15px;

  .title {
    margin-bottom: 15px;
    input {
      padding: 2px 5px;
      border: 1px solid black;
      border-radius: 4px;
    }
  }
`;

export default MemoListHeader;
