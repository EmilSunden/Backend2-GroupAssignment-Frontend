import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import {postsReducer} from "./slices/posts";
import { followReducer } from "./slices/follow";

const rootReducer = combineReducers({
    user: userReducer,
    posts:postsReducer,
    follow: followReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

