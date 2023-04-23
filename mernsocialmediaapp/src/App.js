import {Header} from "./components/Header";
import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Registration from "./components/Register/Register";
import Login from "./components/Login/Login";
import Container from "@mui/material/Container";

import {auth} from "./Action/userAction";
import {useDispatch, useSelector} from "react-redux";
import {Home, FullPost} from "./pages";




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
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                }
                {isAuth && <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/posts/:id" element={<FullPost/>}/>
                </Routes>
                }
            </Container>
        </>
    );
}

export default App;
