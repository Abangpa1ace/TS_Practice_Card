import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { focusLabelSelector } from "../../../recoil";
import styled from "styled-components";
import Button from '../common/Button';
import { putEditLabel } from "services";

const MemoListHeader: React.FC = () => {
  const focusLabel = useRecoilValue(focusLabelSelector);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState(focusLabel.title);

  useEffect(() => {
    setTitle(focusLabel.title)
  }, [focusLabel])

  const toggleEditTitle = () => {
    if (isEditTitle) putEditLabel({ id: focusLabel.id, title })
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
        <Button handleClick={toggleEditTitle}>이름변경</Button>
        <Button handleClick={toggleEditTitle}>수정</Button>
        <Button handleClick={toggleEditTitle}>삭제</Button>
      </div>
    </ScMemoListHeader>
  );
};

const ScMemoListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 15px;

  .buttons {
    display: flex;
    gap: 6px;
  }
`;

export default MemoListHeader;
