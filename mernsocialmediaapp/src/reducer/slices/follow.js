import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import { setFollowData } from '../followReducer'

import axios from '../../axios'


export const followUser = createAsyncThunk('posts/followUser', async (id) => {
    await axios.post(`/follow/${id}`);
    return id;
  });
  
  export const unfollowUser = createAsyncThunk('posts/unfollowUser', async (id) => {
    await axios.post(`/unfollow/${id}`);
    return id;
  });

  

const followSlice = createSlice({
    name: 'follow',
    initialState: {
        follow: {
            following: [],
            isFollowing: false,
            status: 'loading'
        }
    },
    reducers: {},
    extraReducers: {
        
        [followUser.fulfilled]: (state, action) => {
            state.follow.following.push(action.payload);
            state.follow.isFollowing = true;
            state.follow.status = 'Following'
            localStorage.setItem('followData', JSON.stringify(state.follow))
          },
        [unfollowUser.fulfilled]: (state, action) => {
            state.follow.following = state.follow.following.filter((id) => id !== action.payload);
            state.follow.isFollowing = false;
            state.follow.status = 'Successfully unfollowed'
            localStorage.setItem('followData', JSON.stringify(state.follow))
          },
        [setFollowData]: (state, action) => {
            state.follow = action.payload
        }
    }
})



export const followReducer = followSlice.reducer