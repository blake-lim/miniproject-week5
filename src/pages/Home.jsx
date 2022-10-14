import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Form from "../components/Form";
import TodoList from "./TodoList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImPencil } from "react-icons/im";
import AddTodo from "./AddTodo";

// 수정 필요 이슈 :
// 1)할일 기록하기 글자를 눌러야만 AddTodo 페이지로 이동하는 이슈

const Home = () => {
  const navigate = useNavigate();
  return (
    // Layout 컴포넌트
    <Layout>
      {/* Header 컴포넌트 */}
      <Header />
      <STContainer>
        <STWrapper>
          <STAsk>무엇을 할까요?</STAsk>
          <STTodoRecord>
            <STTodoRecordItem
              // 할일 기록하기 글자를 누르면 AddTodo 컴포넌츠로 이동
              onClick={() => {
                navigate("/addtodo");
              }}
              //   title='할일 기록하기'
            >
              할일 기록하기
            </STTodoRecordItem>
            <ImPencil style={{ color: "rgb(254, 83, 31)" }}></ImPencil>
          </STTodoRecord>
          <STTodoRecord>
            <STTodoRecordItem
              onClick={() => {
                navigate("/todolist");
              }}
              //   title='할일 기록하기'
            >
              TODO LIST 확인하기
            </STTodoRecordItem>
            <ImPencil style={{ color: "rgb(254, 83, 31)" }}></ImPencil>
          </STTodoRecord>

          {/* TodoList 컴포넌트 */}
        </STWrapper>
      </STContainer>
    </Layout>
  );
};

//상단 nav하단의 전체 바디를 의미하는 container
const STContainer = styled.div`
  height: calc(100vh - 45px);
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

//STcontainer 영역 안에서 할일 기록하기와 TODO LIST를 감싸는 역할
const STWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  -webkit-box-align: start;
  align-items: start;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
`;
//무엇을 할까요? 텍스트
const STAsk = styled.div`
  font-size: 32px;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  text-decoration: none;
  outline: none;
  font-family: "Noto Sans KR", sans-serif;
`;
//투두를 추가하기 위한 페이지(할일 기록하기)의 container
const STTodoRecord = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
  padding: 0px 20px;
  width: 100%;
  height: 120px;
  border: 1px solid rgb(238, 238, 238);
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  cursor: pointer;
`;

const STTodoRecordItem = styled.div`
  font-size: 24px;
`;
const STTodoRecordIcon = styled.div`
  color: rgb(254, 83, 31);
`;

export default Home;
