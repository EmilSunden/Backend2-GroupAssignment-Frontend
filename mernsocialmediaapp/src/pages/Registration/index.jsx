import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {registration} from "../../Action/userAction";

export const Registration = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className={styles.field} label="Username" value={username} onChange={(e)=> setUsername(e.target.value)} fullWidth />
      <TextField className={styles.field} label="Password" value={password} onChange={(e)=> setPassword(e.target.value)} fullWidth />
      <Button size="large" variant="contained" onClick={() => registration(username, password)} fullWidth>
        Register
      </Button>
    </Paper>
  );
};
