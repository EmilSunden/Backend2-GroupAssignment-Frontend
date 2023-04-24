import {Header} from "./components/Header";
import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";

import Container from "@mui/material/Container";

import {auth} from "./Action/userAction";
import {useDispatch, useSelector} from "react-redux";
import {Home, FullPost, Profile, Login, Registration} from "./pages";




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
                    <Route path="/profile/:username" element={<Profile />}/>
                </Routes>
                }
            </Container>
        </>
    );
}

export default App;
