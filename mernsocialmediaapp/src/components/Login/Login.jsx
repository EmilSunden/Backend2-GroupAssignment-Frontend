import React, {useState} from "react";
import {login} from "../../Action/userAction";
import {useDispatch} from "react-redux";
import Input from "../uttils/Input";


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()


  return (
      <div className='login'>
        <div className="login__header">Log In</div>
        <Input value={username} setValue={setUsername} type="text" placeholder="Enter username..."/>
        <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
        <button className="login__btn" onClick={() => dispatch(login(username, password))}>log in</button>
      </div>


  );
};

export default Login;