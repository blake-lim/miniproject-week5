// src/redux/modules/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, { ...action.payload }];
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todos) => todos.id !== parseInt(action.id),
      );
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addTodo, deleteTodo } = todosSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default todosSlice.reducer;
