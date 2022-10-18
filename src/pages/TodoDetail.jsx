import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // axios import 합니다.
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Button from "../elements/Button"

const TodoDetail = () => {
  const {id} = useParams();
  // params로 받으면 String
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  // 왜 초기값이 array인가? : map으로 돌린...
  // 예전 todo find 생각하면...
  const params = {
    key : process.env.REACT_APP_TODO
  }
  const fetchTodos = async () => {
    const { data } = await axios.get(`${params.key}/${id}`);
    // api 사용해서 값 하나만 가져올 수 있다. find filter 필요 없다.
    setDetail(data);
  }
  const [editTodo, setEditTodo] = useState({
    body : ""
  });

const onClickEditButtonHandler = async() => {
  // 위에 변수가 선언되었는데 또 매개변수 넣을 필욘 없다.
const res = await axios.patch(`${params.key}/${id}`, {body : editTodo.body});
// res? : 요청에 대한 응답(response, html) : google.com 쳤을 떄 무슨 일 일어나는지 생각해보기.
setDetail({
  ...detail,
  body : res.data.body
})

// 패치로 변경 했다. 스테이트가 바뀌어야 하는데... 요청만 보내고 끝났다.
// 통신 후 response를 받는다.
// 수정하기를 누르면 json서버로 보내진다. 변한다. => useEffect가 필요하지 않을까?
// 무슨 데이터가 오는지 받아봐야 한다.(리덕스와 엑시오스 유연하게 사용)
// 수정하자마자 클라이언트 단에서 업데이트, 서버로 데이터 직접 보냄
};
useEffect(() => {
  fetchTodos();
}, []);

const [toggle, setToggle] = useState(false)

const editToggleHandler = () => {
  toggle ? setToggle(false) : setToggle(true)
  }
  // 데이터 직접 고치려면 axios 사용해야해서 낭비가 된다.
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
            <Button
              borderColor="#ddd"
              onClick={() => {
                navigate("/todolist");
              }}
            >
              이전으로
            </Button>
          </StDialogHeader>
          {
            <div key={detail.id}>
            <StTitle>{detail.title}</StTitle>
          <StBody>{detail.body}</StBody>
          </div>}
        </div>
        <Button type="button" onClick={editToggleHandler}>
                수정하시려면 눌러주세요
            </Button>
        {toggle ? (<StEditContainer>
        <textarea style={{width:300, height:200 }}
            type="text"
            maxLength={200}
            placeholder="수정본문값 입력"
            onChange={(event) => {
              setEditTodo({
                ...editTodo,
                body: event.target.value,
              });
            }}
          />
        <Button type="button"
              borderColor="#ddd" onClick={onClickEditButtonHandler}>
                본문수정
            </Button>
            </StEditContainer>) : null}
      </StDialog>
    </StContainer>
    <Comments id={id}/>
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

// const StButton = styled.button`
//   border: 1px solid ${({ borderColor }) => borderColor};
//   height: 40px;
//   width: 120px;
//   background-color: #fff;
//   border-radius: 12px;
//   cursor: pointer;
// `;

const StEditContainer = styled.div`
margin: auto;;
`

// const StEditButton = styled.button`
//  border: 1px solid ${({ borderColor }) => borderColor};
//   height: 40px;
//   width: 120px;
//   background-color: #fff;
//   border-radius: 12px;
//   cursor: pointer;
//   text-align: center;
//   margin : 0 auto 10px;
// `;