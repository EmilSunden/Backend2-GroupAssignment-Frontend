import React, {useState} from "react";
import {registration} from "../../Action/userAction";
import Input from "../uttils/Input";

const Registration = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='registration'>
            <div className="registration__header">Registration</div>
            <Input value={username} setValue={setUsername} type="text" placeholder="Enter username..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
            <button className="registration__btn" onClick={() => registration(username, password)}>Registration</button>
        </div>
    );
};

export default Registration;