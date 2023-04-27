import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () =>{
const {data} = await axios.get('/posts')
    return data
})

export const deletePosts = createAsyncThunk('posts/deletePosts', async (id) =>{
    await axios.delete(`/posts/${id}/delete`)
})

export const followUser = createAsyncThunk('followUser', async (id) => {
    await axios.post(`/follow/${id}`);
    return id;
  });
  
  export const unfollowUser = createAsyncThunk('unfollowUser', async (id) => {
    await axios.post(`/unfollow/${id}`);
    return id;
  });


const initialState = {
    posts: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers:{
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading error'
        },
        [deletePosts.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(item => item._id !== action.payload)
        }
    }
})

const followSlice = createSlice({
    name: 'follow',
    initialState: {
        following: [],
        isFollowing: false
    },
    reducers: {},
    extraReducers: {
        [followUser.fulfilled]: (state, action) => {
            state.following.push(action.payload);
            state.isFollowing = true;
          },
          [unfollowUser.fulfilled]: (state, action) => {
            state.following = state.following.filter((id) => id !== action.payload);
            state.isFollowing = false;
          },
    }
})


export const postsReducer = postsSlice.reducer
export const followReducer = followSlice.reducer