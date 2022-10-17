// src/redux/modules/CommentsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComments: (state, action) => {
      state.comments = [...state.comments, { ...action.payload }];
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addComments } = commentsSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentsSlice.reducer;