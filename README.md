# 항해 5주차 팀과제 1 : Redux, Toolkit 등 활용한 Todo List + 게시판 만들기


목차

## 프로젝트 소개

<p align="justify">
리액트 심화 및 리덕스 기본기를 바탕으로 한 TodoList 만들기<br>
제한 및 공통 사항 : <br>
  <li> 컴포넌트 및 UI는 자유로 한다.</li>
  <li> ducks 패턴 활용한다.</li>
  <li> Redux 등 심화 과정에 필요한 자료를 활용한다.</li>
</p>

## <a href="https://hanghaeteam333.herokuapp.com/">헤로쿠 배포 페이지</a>

## <a href="https://hanghaeweek5.vercel.app/">버셀 배포 페이지</a>

<br>

## 기술 스택

HTML / CSS in JS / JavaScript / React / Redux / Redux Toolkit / git / gitHub / heroku

<br>

## 구현 필수 요소 및 역할 분담

- **동적 라우팅을 사용**하세요.

- 1개 이상의 `Custom Hook`을 구현하세요.

- **Form에 유효성 검증 기능을 적용**하세요. *유효성 검증이란, 아래의 예시들을 의미합니다.*
    - ex: 제목을 10글자 이상 기입하지 않으면, 글을 추가할 수 없도록 제한 → `Alert` 으로 안내
    - ex: Form에서 모든 input에 값을 입력하지 않으면, 버튼이 비활성화

- 버튼 **컴포넌트 1개로 모든 버튼을 구현**하세요. 모든 스타일과 기능을 버튼을 구현할 수 있는 **만능 버튼**을 만들어보는 것 입니다.

- `development` 환경에서만 `redux devtool`이 활성화 되도록 처리합니다.

- 배포된 결과물에서는 `console.log()` 가 보이지 않도록 처리합니다.

- `.env` 를 이용해서 API 서버의 URL 코드상에서 숨기도록 처리합니다.

## 구현 기능


### 기능 1 : react- router-dom 통한 페이지 별 관리

- home화면, 할일 기록하기 화면, TodoList 확인, 상세페이지 등 react-router-dom으로 관리(url params)

- router에서 url 상세 관리

- navigate로 페이지 이동

<br>

### 기능 2 : TodoList CRUD

- 게시물인 TodoList의 생성, 읽기, 수정, 삭제 기능 모두 구현

- CRUD 모두 리덕스 툴킷 + thunk 활용(TodosSlice)

- CRUD 모두 미들웨어 이용한 action Dispatch -> 리듀서 과정 비동기 처리

- 토글 기능 활용한 수정 창 숨기기


<br>

### 기능 3 : 댓글 CRUD

- 게시물의 댓글의 생성, 읽기, 수정, 삭제 기능 모두 구현

- CRUD 모두 리덕스 툴킷 + thunk 활용(commentsSlice)

- CRUD 모두 미들웨어 이용한 action Dispatch -> 리듀서 과정 비동기 처리
 
- 댓글은 필터링 통해 부여해준 게시물과 연관된 id로 걸른 후모든 게시물에서 같은 댓글이 보이지 않게함

- 수정은 토글 식으로 관리


<br>

### 기능 4 : 필수 구현 사항

- 동적 라우팅을 사용 (공통) -> react-router-dom 활용

- 1개 이상의 `Custom Hook`을 구현 (효진) -> todoInput에서 구현

- Form에 유효성 검증 기능을 적용 (다민) -> 게시물 Todo 입력 시 전체 입력이 안 되면 동작이 안 되게 alert 동작

- 버튼 컴포넌트 1개로 모든 버튼을 구현 (다민) -> button.js로 통일하여 버튼 동작

- `development` 환경에서만 `redux devtool`이 활성화 (효진) -> 배포 시 적용

- 배포된 결과물에서는 `console.log()` 가 보이지 않도록 처리 (공통) -> 코드 확인 완료

- `.env` 를 이용해서 API 서버의 URL 코드상에서 숨기도록 처리 (다민) -> env 로 URL 코드상에서 모두 가림

<br>

## 컴포넌트와 나눈 이유

### Ducks 패턴 활용 통한 컴포넌트 나누기

### 1. Components
- Comments.jsx : 댓글 관리
- Form.jsx : 게시물 업로드 관리
- Header.jsx & Layout.jsx : 홈페이지 전반적 레이아웃

<br>

### 2. Pages
- AddTodo.jsx : 게시물 업로드 페이지 관리
- Home.jsx : 홈페이지
- TodoDetail.jsx : 게시물 상세 페이지
- TodoList.jsx : 게시물 상세 가기 전 페이지(게시묾 모음)


<br>

### 3. redux & Router & hooks & element
- modules > todosSlice.js : todo의 Reducer 관리
- modules > CommentsSlice.js : comment의 Reducer 관리
- shared > Router.jsx : react-router-dom 방식에 따라 Home, 상세페이지 이동 위한 설정으로 패턴 관리
- hooks > useInput.js : useInput이라는 커스텀훅을 이용한 todoList input하기.
- element > button.js : 버튼 일원화 관리

<br>


<br>

<p align="justify">

</p>

<br>

## 라이센스

Copyright 2022. hang-hae99 9th W5 team 3. all rights reserved.
