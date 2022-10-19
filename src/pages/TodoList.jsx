import React from "react";
import axios from "axios"; // axios import 합니다.
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../elements/Button";
import { __deleteTodo } from "../redux/modules/todosSlice";
import { __getTodos } from "../redux/modules/todosSlice";
import { useSelector } from "react-redux";

const TodoList = () => {
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = {
    key: process.env.REACT_APP_TODO,
  };
  const onDeleteHandler = (id) => {
    // await axios.delete(`${params.key}/${id}`);
    // const { data } = await axios.get(params.key);
    // setTodos(data);
    dispatch(__deleteTodo(id));
    // async await로 id 값 추적 후 지우고 나머지는 가져와서 아래서 mapping
  };

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  return (
    <div>
      <STHeader>
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
      {todos.length > 0 ? (
        todos.map((todo) => (
          <STContent
            key={todo.id}
            onClick={() => {
              navigate(`/tododetail/${todo.id}`);
            }}
          >
            {/* 배열이 빈배열일 때를 판단할 때는 length를 사용한다. */}
            <div>
              <h3>{todo.title}</h3>
            </div>
            <div>작성자 : {todo.writer}</div>
            <Button
              backgroundColor='red'
              type='button'
              onClick={(event) => {
                event.stopPropagation();
                // 이벤트 버블링을 막는 법. 삭제, 여백 등 같이 있을 때 이벤트가 퍼질 때 막는 것
                const result = window.confirm("이 할일을 지울까요?");
                if (result) {
                  return onDeleteHandler(todo.id);
                } else {
                  return;
                }
              }}
            >
              삭제
            </Button>
          </STContent>
        ))
      ) : (
        <div>
          <h2>할일이 없네요</h2>
        </div>
      )}
    </div>
  );
};

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

const STContent = styled.div`
  border: 1px solid grey;
  border-radius: 25px;
  margin: 10px;
  padding: 20px;
`;

// const StDelButton = styled.button`
//   border: none;
//   background-color: red;
//   color : white;
//   height: 25px;
//   cursor: pointer;
//   width: 120px;
//   border-radius: 12px;
//   margin: 10px;
// `;

export default TodoList;
