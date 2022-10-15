import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddTodo from "../pages/AddTodo";
import TodoDetail from "../pages/TodoDetail";
import TodoList from "../pages/TodoList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 투두리스트를 추가하는 addtodo로 이동하기 */}
        <Route path='addtodo' element={<AddTodo />} />

        {/* 홈으로 이동하기 */}
        <Route path='/' element={<Home />} />

        {/* 투두리스트 카드가 모인 투두리스트 페이지로 이동하기 */}
        <Route path='todolist' element={<TodoList />} />

        {/* 투두리스트 카드별 상세보기 페이지로 이동하기 */}
        <Route path='/tododetail/:id' element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
