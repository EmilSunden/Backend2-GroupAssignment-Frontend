import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Registration from "./components/Register/Register";
import Login from "./components/Login/Login";
import {auth} from "./Action/userAction";
import {useDispatch, useSelector} from "react-redux";



function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }
    }, [])

    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <BrowserRouter>
            <div className='App'>
                <Navbar/>
                <div className="wrap">
                    {!isAuth && <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
