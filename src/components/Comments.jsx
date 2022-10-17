import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios"; // axios import 합니다.
import { useEffect } from "react";
import { addComments } from "../redux/modules/commentsSlice";

const Comments = (props) => {
  // id는 상속받자
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments)



  const getMaxId = () => {
    let stateIdArr = comments.map((element) => {
      return Number(element.id);
    });
    return Math.max(...stateIdArr);
  };

  const [comment, setComment] = useState({
    id : 0,
    writer : "",
    body : ""
  })
  const [commentList, setCommentList] = useState([])
    const fetchComments = async () => {
    const { data } = await axios.get("http://localhost:3001/comments");
    const selCommentList = data.filter((val) => {
      return Number(props.id) === Number(val.commentId)})
      // detail id랑 axios id랑 비교
      // 새로고침해야 값 나오는 것 해결? : useEffect로 해결
      setCommentList(selCommentList);
  };
  useEffect(() => {
    fetchComments()
  }, [commentList]);


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      id: getMaxId() + 1,
      [name]: value,
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      comment.body.trim() === "" ||
      comment.writer.trim() === ""
    ) {
      return alert("모든 항목을 입력해주세요.");
    }
    const obj = {
      commentId : props.id,
      id:getMaxId()+1,
      body: comment.body,
      writer: comment.writer,
      };
      // addTodo 더할 때는 형태에 맞게 더하기
      // try-catch문 필요 : 
    axios.post("http://localhost:3001/comments", obj);
    dispatch(addComments(comment));

    // 입력란 공백을 위한 공객체 생성
    setComment({
      writer: "",
      body: "",
    });  
  }

  return (
  <div>
    <div>
      <StWriterInput onChange={onChangeHandler} value={comment.writer || ""} name="writer" maxLength={5} placeholder="이름(5글자 이내)"></StWriterInput>
      <StBodyInput onChange={onChangeHandler} value={comment.body || ""} name="body" maxLength={100} placeholder="댓글을 추가하세요.(100자 이내)"></StBodyInput>
      <StButton type="submit" onClick={onSubmitHandler}>추가하기</StButton>
      {commentList.map((item) => (
      <StComment key={item.id}>
      <p>작성자 : {item.writer}</p>
      <h3>내용 : {item.body}</h3>
    </StComment>  
      ))}
    </div>
  </div>
  );

};

export default Comments;

const StComment = styled.div`
border : 1px solid grey;
border-radius : 15px;
padding: 10px;
margin-bottom : 10px;
`

const StWriterInput = styled.input`
width : 100px;
height : 20px;
margin-bottom : 10px;
margin-right : 20px;
`

const StBodyInput = styled.input`
width : 500px;
height : 20px;
margin-bottom : 10px;
`

const StButton = styled.button`
border: none;
background-color: skyblue;
height: 25px;
cursor: pointer;
width: 120px;
border-radius: 12px;
`