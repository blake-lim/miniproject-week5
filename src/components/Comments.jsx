import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios"; // axios import 합니다.
import { useEffect } from "react";
import { addComments } from "../redux/modules/commentsSlice";

const Comments = (props) => {
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
      // 새로고침해야 값 나오는 것 해결? : 
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
      <input onChange={onChangeHandler} value={comment.writer || ""} name="writer" maxLength={5} placeholder="이름(5글자 이내)"></input>
      <input onChange={onChangeHandler} value={comment.body || ""} name="body" maxLength={100} placeholder="댓글을 추가하세요.(100자 이내)"></input>
      <button type="submit" onClick={onSubmitHandler}>추가하기</button>
      {commentList.map((item) => (
      <div key={item.id}>
      <p>{item.writer}</p>
      <h3>{item.body}</h3>
    </div>  
      ))}
    </div>
  </div>
  );

};

export default Comments;
