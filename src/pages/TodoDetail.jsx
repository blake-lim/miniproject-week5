import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // axios import 합니다.
import { useNavigate, useParams } from "react-router-dom";
 
const TodoDetail = () => {
  const {id} = useParams();
  // params로 받으면 String
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setDetail(data);
  }
useEffect(() => {
  fetchTodos();
}, []);

  return (<div><STHeader>
  <svg
    onClick={() => {
      navigate("/");
    }}
    stroke='currentColor'
    fill='currentColor'
    strokeWidth='0'
    viewBox='0 0 20 20'
    height='24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
  </svg>
  <STHeaderTitle>3조의 투두리스트</STHeaderTitle>
  {/* 폼 태그 컴포넌츠 */}
</STHeader>
<StContainer>
      <StDialog>
        <div>
          <StDialogHeader >
            <div>ID :{id}</div>
            <StButton
              borderColor="#ddd"
              onClick={() => {
                navigate("/todolist");
              }}
            >
              이전으로
            </StButton>
          </StDialogHeader>
          {detail.map((item) => {if(item.id == id){
            return(
              // return을 꼭 해줘야한다.
            <div key={item.id}>
            <StTitle>{item.title}</StTitle>
          <StBody>{item.body}</StBody>
          </div>)}})}
          
        </div>
      </StDialog>
    </StContainer>





</div>)
};

export default TodoDetail;

//Header Container
const STHeader = styled.header`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: row;
  height: 45px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(221, 221, 221);
  padding: 0px 12px;
`;
// Header 모두의 투두리스트 타이틀 목적
const STHeaderTitle = styled.div`
  font-size: 24px;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  text-decoration: none;
  outline: none;
  font-family: "Noto Sans KR", sans-serif;
`;

const StContainer = styled.div`
  border: 2px solid #eee;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDialog = styled.div`
  width: 600px;
  height: 400px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StDialogHeader = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

const StTitle = styled.h1`
  padding: 0 24px;
`;

const StBody = styled.main`
  padding: 0 24px;
`;

const StButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;