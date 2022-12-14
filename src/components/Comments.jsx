import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { __addComments, __getComments, __editComments, __deleteComments } from "../redux/modules/commentsSlice";
import Button from "../elements/Button";

const Comments = (props) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.commentList);

  const getMaxId = () => {
    let stateIdArr = comments.map((element) => {
      return Number(element.id);
    });
    return Math.max(...stateIdArr);
  };

  const [comment, setComment] = useState({
    id: 0,
    writer: "",
    body: "",
  });
  const params = {
    key: process.env.REACT_APP_COMMENT,
  };
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    dispatch(__getComments(props.id));
    //dispatch
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
    if (comment.body.trim() === "" || comment.writer.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    const obj = {
      commentId: props.id,
      id: getMaxId() + 1,
      body: comment.body,
      writer: comment.writer
    };
    dispatch(__addComments(obj))
    setComment({
      writer: "",
      body: "",
    });
  };

  const [toggle, setToggle] = useState(false);

  const editToggleHandler = (index) => {
    setToggle(index);
    // index로 값을 찾아서 넣는다.
  };

  const [editComment, setEditComment] = useState({body : ""});
  const onClickEditButtonHandler = (id) => {
    setCommentList([
      {
        ...commentList      },
    ]);
    dispatch(__editComments({
      id : id,
      editComment: editComment
    }))
  };
  

  const onClickDelButtonHandler = (id) => {
    dispatch(__deleteComments(id))
    };
  
  return (
    <div>
      <StWriterInput
        onChange={onChangeHandler}
        value={comment.writer || ""}
        name='writer'
        maxLength={5}
        placeholder='이름(5글자 이내)'
      ></StWriterInput>

      <StBodyInput
        onChange={onChangeHandler}
        value={comment.body || ""}
        name='body'
        maxLength={100}
        placeholder='댓글을 추가하세요.(100자 이내)'
      ></StBodyInput>
      <Button type='submit' onClick={onSubmitHandler}>
        추가하기
      </Button>

      {comments.map((item, index) => (
        <StComment key={item.id}>
          {/* 타입스크립트가 아닌 이상 문제가 없다. */}
          <p>작성자 : {item.writer}</p>
          <h3>내용 : {item.body}</h3>
          <div>
            <Button
              type='button'
              onClick={() => {
                editToggleHandler(index);
              }}
            >
              수정하시려면 눌러주세요
            </Button>
            {toggle === index ? (
              <StEditContainer>
                <input
                  style={{ width: 300, height: 200 }}
                  type='text'
                  maxLength={200}
                  placeholder='수정댓글 입력'
                  onChange={(event) => {
                    setEditComment({
                      ...editComment,
                      body: event.target.value,
                    });
                  }}
                />
                <Button
                  type='button'
                  onClick={() => {
                    onClickEditButtonHandler(item.id);
                  }}
                >
                  수정
                </Button>
              </StEditContainer>
            ) : null}

            <Button
              type='button'
              onClick={() => {
                const result = window.confirm("이 댓글을 지울까요?");
                if (result) {
                  return onClickDelButtonHandler(item.id);
                } else {
                  return;
                }
              }}
            >
              삭제
            </Button>
          </div>
        </StComment>
      ))}
    </div>
  );
};

export default Comments;

const StComment = styled.div`
  border: 1px solid grey;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StWriterInput = styled.input`
  width: 100px;
  height: 20px;
  margin-bottom: 10px;
  margin-right: 20px;
`;

const StBodyInput = styled.input`
  width: 500px;
  height: 20px;
  margin-bottom: 10px;
`;

// const StButton = styled.button`
// border: none;
// background-color: skyblue;
// height: 25px;
// cursor: pointer;
// width: 120px;
// border-radius: 12px;
// `
const StEditContainer = styled.div`
  margin: auto; ;
`;

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
