// src/redux/modules/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    // {
    //   id: 0,
    //   title: "React",
    //   body: "리액트는 어려워",
    //   isDone: false,
    //   editID: false,
    // },
    // {
    //   id: 1,
    //   title: "Redux",
    //   body: "리덕스는 더 어려워",
    //   isDone: true,
    //   editID: false,
    // },
  ],
};

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, { ...action.payload }];
      console.log("리듀서에 넘어옴", state.todos);
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todos) => todos.id !== parseInt(action.id)
      );
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addTodo, deleteTodo } = todosSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default todosSlice.reducer;
