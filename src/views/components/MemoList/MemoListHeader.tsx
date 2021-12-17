import React, { useState } from "react";
import styled from "styled-components";

const MemoListHeader: React.FC = () => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState("라벨");

  const toggleEditTitle = () => {
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
        <button onClick={toggleEditTitle}>수정</button>
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
`;

export default MemoListHeader;
