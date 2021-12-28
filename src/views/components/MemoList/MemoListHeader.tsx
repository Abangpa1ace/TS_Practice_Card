import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { labelListSelector, memoListSelector, totalMemoListSelector, focusLabelState, checkedMemoListState } from "../../../recoil";
import styled from "styled-components";
import Button from '../common/Button';
import { deleteLabel, postAddMemo, postAttachLabel, putEditLabel } from "services";
import ButtonWrapper from "../common/ButtonWrapper";


const MemoListHeader: React.FC = () => {
  /* Recoil State */
  const labelList = useRecoilValue(labelListSelector);
  const totalMemoList = useRecoilValue(totalMemoListSelector);
  const memoList = useRecoilValue(memoListSelector);
  const [focusLabel, setFocusLabel] = useRecoilState(focusLabelState);
  const [checkedMemoList, setCheckedMemoList] = useRecoilState(checkedMemoListState);
  
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

  const handleWholeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const newList = checked ? totalMemoList.map(e => e.id) : [];
    setCheckedMemoList(newList);
  }

  const attachLabel = async () => {
    const title = await window.prompt();
    const label = labelList.find(e => e.title === title)
    if (label) await postAttachLabel({ id: label.id, memoIds: checkedMemoList });
    updateLabelList();
    resetCheckedMemoList();
    setFocusLabel(label);
  }

  const detachLabel = async () => {
    const body = {
      id: focusLabel?.id,
      memoIds: checkedMemoList,
      isDetach: true,
    }
    await postAttachLabel(body);
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
        {isTotal
          ? <>
            <Button handleClick={attachLabel}>라벨부여</Button>
          </>
          : <>
            <Button handleClick={detachLabel}>라벨제거</Button>
            <Button handleClick={toggleEditTitle}>이름변경</Button>
            <Button handleClick={removeLabel}>삭제</Button>
          </>
        }
      </ButtonWrapper>
      <ButtonWrapper>
        <h5>메모 : </h5>
        <Button handleClick={addMemo}>새 메모</Button>
        <Button handleClick={toggleEditTitle}>수정</Button>
        <Button handleClick={toggleEditTitle}>삭제</Button>
      </ButtonWrapper>
      {!!memoList.length && <WholeCheck>
        <input type='checkbox' onChange={handleWholeCheck} /><span>전체선택</span>
      </WholeCheck>}
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

const WholeCheck = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  transform: translateX(-5px);

  span {
    display: inline-block;
    margin-left: 8px;
    font-weight: bold;
  }
`;

export default MemoListHeader;
