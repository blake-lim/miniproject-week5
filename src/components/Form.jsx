import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios"; // axios import 합니다.
import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";
import useInput from "../hooks/useInput";
import { __addTodos } from "../redux/modules/todosSlice";

// ⭐️필요 기능 구현 사항
// 1)할일을 생성하면 자동으로 투두리스트 페이지로 리다이렉션(완료 - line 67)
// 2)할일을 생성하지 않고 투두리스트 페이지 진입 시, 할일이 없네요 메시지 표시

const Form = () => {
  //커스텀 훅
  const [title, onChangeTitleHandler] = useInput();
  const [body, onChangeBodyHandler] = useInput();
  const [writer, onChangeWriterHandler] = useInput();

  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const navigate = useNavigate();
  //id최대값
  const getMaxId = () => {
    let stateIdArr = todos.map((element) => {
      return Number(element.id);
    });
    return Math.max(...stateIdArr);
  };

  const [todo, setTodo] = useState({
    writer: "",
    title: "",
    body: "",
  });
  // const fetchTodos = async () => {
  //   const { data } = await axios.get("http://localhost:3001/todos");
  //   setTodo(data);
  // };
  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  //기존 방식
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      id: getMaxId() + 1,
      [name]: value,
      // [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // 기존 처리 방식
    // if (
    //   todo.body.trim() === "" ||
    //   todo.writer.trim() === "" ||
    //   todo.title.trim() === ""
    // ) {
    //   return alert("모든 항목을 입력해주세요.");
    // }

    //새로운 방식

    // 유지보수 디벨롭 : 쪼갠다면?
    const params = {
      key: process.env.REACT_APP_TODO,
    };

    // addTodo 더할 때는 형태에 맞게 더하기
    // try-catch문 필요 :

    if (
      title.title.trim() === "" ||
      title.title.trim() === undefined ||
      body.body.trim() === "" ||
      body.body.trim() === undefined ||
      writer.writer.trim() === "" ||
      writer.writer.trim() === undefined
    ) {
      return alert("모든 항목을 입력해주세요.");
    }
    //기존방식
    // const obj = {
    //   id: getMaxId() + 1,
    //   title: todo.title,
    //   body: todo.body,
    //   writer: todo.writer,
    // };

    //새로운방식
    const obj = {
      id: getMaxId() + 1,
      title: title.title,
      body: body.body,
      writer: writer.writer,
      paramkey: params,
    };
    // addTodo 더할 때는 형태에 맞게 더하기
    // try-catch문 필요 :

    // axios.post(params.key, obj);
    dispatch(__addTodos(obj));

    if (todo.writer.trim() !== "" || todo.body.trim() == "")
      // 입력란 공백을 위한 공객체 생성
      setTodo({
        id: "",
        body: "",
      });
    //리스트 생성 시, 투두리스트 페이지로 리다이렉션
    navigate("/todolist");
  };
  // useEffect가 fetchTodo가 받은 get 데이터를 (setTodo) 이상한 데이터를 받았기 때문. 수정완료
  return (
    <STContainer>
      <STWrapper>
        <STForm onSubmit={onSubmitHandler}>
          <STInputForm>
            <STWritter>작성자</STWritter>
            <STInput
              // onChange={onChangeHandler}
              // value={todo.writer || ""}
              // name='writer'
              name='writer'
              value={writer.writer || ""}
              onChange={onChangeWriterHandler}
              maxLength={5}
              placeholder='작성자의 이름을 입력해주세요.(5자 이내)'
            ></STInput>
            <STWritter>제목</STWritter>
            <STInput
              // onChange={onChangeHandler}
              // value={todo.title || ""}
              // name='title'
              name='title'
              value={title.title || ""}
              onChange={onChangeTitleHandler}
              maxLength={50}
              placeholder='제목을 입력해주세요.(50자 이내)'
            ></STInput>
            <STWritter>내용</STWritter>
            <STTextArea
              // onChange={onChangeHandler}
              // value={todo.body || ""}
              // name='body'
              name='body'
              value={body.body || ""}
              onChange={onChangeBodyHandler}
              maxLength={200}
              placeholder='내용을 입력해주세요.(200자 이내)'
            ></STTextArea>
            <Button size='large'>추가하기</Button>
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

// const STSubmitBtn = styled.button`
//   display: flex;
//   -webkit-box-align: center;
//   align-items: center;
//   -webkit-box-pack: center;
//   justify-content: center;
//   flex-direction: row;
//   border: 1px solid rgb(238, 238, 238);
//   background-color: rgb(255, 255, 255);
//   height: 46px;
//   border-radius: 8px;
//   cursor: pointer;
//   width: 100%;
// `;

export default Form;
