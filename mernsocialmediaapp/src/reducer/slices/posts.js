import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () =>{
const {data} = await axios.get('/posts')
    return data
})

export const deletePosts = createAsyncThunk('posts/deletePosts', async (id) =>{
    await axios.delete(`/posts/${id}/delete`)
})



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

export const postsReducer = postsSlice.reducer