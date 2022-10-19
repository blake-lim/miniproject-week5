// src/redux/modules/CommentsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { act } from "react-dom/test-utils";

const initialState = {
  commentList: [],
  isLoading: false,
  error: null,
};
const params = {
  key: process.env.REACT_APP_COMMENT,
};
export const __getComments = createAsyncThunk(
  "comments/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(params.key);
      const selCommentList = data.data.filter((val) => {
        return Number(payload) === Number(val.commentId);
      });
      return thunkAPI.fulfillWithValue(selCommentList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComments = createAsyncThunk(
  "comments/addComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(params.key, payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComments = createAsyncThunk(
  "comments/editComments",
  async (payload, thunkAPI) => {
    try {
      const params = {
        key: process.env.REACT_APP_COMMENT,
      }
      await axios.patch(`${params.key}/${payload.id}`, payload.editComment);
      const data = await axios.get(params.key)
      const filterData = data.data.filter((val) => { return val.id === payload });
      return thunkAPI.fulfillWithValue(filterData.body);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComments = createAsyncThunk(
  "comments/deleteComments",
  async (payload, thunkAPI) => {
    try {
      const params = {
        key: process.env.REACT_APP_COMMENT,
      }
      const data = await axios.delete(`${params.key}/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
      // data.data를 넘겨주는게 아니라 아래서 쓸 id, 즉 payload를 넘겨준다.
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // addComments: (state, action) => {
      // state.comments = [...state.comments, { ...action.payload }];
      // state.comments.push(action.payload); (동기 처리 시 필요)
    // },


  },
  extraReducers : {
  [__addComments.pending]: (state) => {
    state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
  },
  [__addComments.fulfilled]: (state, action) => {
    state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    state.commentList.push(action.payload) // 교체가 아니라 추가하는거다.
  },
  [__addComments.rejected]: (state, action) => {
    state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
  },

  [__getComments.pending]: (state) => {
    state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
  },
  [__getComments.fulfilled]: (state, action) => {
    state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    state.commentList = action.payload; 
  },
  [__getComments.rejected]: (state, action) => {
    state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
  },

  [__editComments.pending]: (state) => {
    state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
  },
  [__getComments.fulfilled]: (state, action) => {
    state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    state.commentList = action.payload; 
  },
  [__editComments.rejected]: (state, action) => {
    state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
  },

  [__deleteComments.pending]: (state) => {
    state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
  },
  [__deleteComments.fulfilled]: (state, action) => {
    state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    state.commentList = state.commentList.filter((item) => item.id !== action.payload);
    // 바로 지워지려면 state.commentList를 설정...
    // 서버 단에서 지우는게 있고 리덕스에서 지우는게 따로 있다.
  },
  [__deleteComments.rejected]: (state, action) => {
    state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
  }

}});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = commentsSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentsSlice.reducer;
