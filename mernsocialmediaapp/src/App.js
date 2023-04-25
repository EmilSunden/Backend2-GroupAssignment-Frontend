import {Header} from "./components/Header";
import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";

import Container from "@mui/material/Container";

import {auth} from "./Action/userAction";
import {useDispatch, useSelector} from "react-redux";
import {Home, FullPost, Profile, Login, Registration, FollowingPostsFeed, AddPost} from "./pages";




function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }
    }, [])

    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                {!isAuth && <Routes>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                }
                {isAuth && <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/posts/:id" element={<FullPost/>}/>
                    <Route path="/posts/create" element={<AddPost/>}/>
                    <Route path="/posts/:id/edit" element={<AddPost/>}/>
                    <Route path="/profile/:username" element={<Profile />}/>
                    <Route path="/profile/following/:username" element={<FollowingPostsFeed />}/>
                </Routes>
                }
            </Container>
        </>
    );
}

export default App;
