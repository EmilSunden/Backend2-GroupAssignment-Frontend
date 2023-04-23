import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Registration from "./components/Register/Register";
import Login from "./components/Login/Login";
import {auth} from "./Action/userAction";
import {useDispatch, useSelector} from "react-redux";
import Profile from "./pages/profile/Profile";
import Home from "./pages/Home/Home";
import Followers from "./pages/follow/Followers";



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
                    {isAuth && 
                        <Routes>
                            <Route exact path="/" element={<Home />}></Route>
                            <Route path="/profile/:username" element={<Profile />}></Route>
                            <Route path="/profile/:username/followers" element={<Followers />}></Route>
                        </Routes>
                    }
                    {!isAuth && 
                    <Routes>
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
