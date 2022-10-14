import React from "react";
import styled from "styled-components";

const Form = () => {
  return (
    <STContainer>
      <STWrapper>
        <STForm>
          <STInputForm>
            <STWritter>작성자</STWritter>
            <STInput
              maxLength={5}
              placeholder='작성자의 이름을 입력해주세요.(5자 이내)'
            ></STInput>
            <STWritter>제목</STWritter>
            <STInput
              maxLength={50}
              placeholder='제목을 입력해주세요.(50자 이내)'
            ></STInput>
            <STWritter>내용</STWritter>
            <STTextArea
              maxLength={200}
              placeholder='내용을 입력해주세요.(200자 이내)'
            ></STTextArea>
          </STInputForm>
        </STForm>
      </STWrapper>
    </STContainer>
  );
};

const STContainer = styled.div`
  height: calc(100vh - 45px);
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const STWrapper = styled.div`
  height: 100%;
`;

const STForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: start;
  align-items: start;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
`;

const STInputForm = styled.div`
  width: 100%;
`;

const STWritter = styled.div`
  width: 100%;
  margin: 10px 0px;
  font-size: 24px;
`;

const STInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  padding: 0px 12px;
  font-size: 14px;
  border: 1px solid rgb(238, 238, 238);
`;

const STTextArea = styled.textarea`
  width: 100%;
  height: 140px;
  border: 1px solid rgb(238, 238, 238);
  padding: 12px;
  font-size: 14px;
`;

export default Form;
