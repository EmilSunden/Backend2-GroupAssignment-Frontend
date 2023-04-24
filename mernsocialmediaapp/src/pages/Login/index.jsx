import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useDispatch} from "react-redux";
import {login} from "../../Action/userAction";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <TextField
        className={styles.field}
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        label="Username"
        fullWidth
      />
      <TextField className={styles.field} label="Password" value={password}  onChange={(e)=> setPassword(e.target.value)} fullWidth />
      <Button size="large" variant="contained" onClick={() => dispatch(login(username, password))} fullWidth>
        Log In
      </Button>
    </Paper>
  );
};
