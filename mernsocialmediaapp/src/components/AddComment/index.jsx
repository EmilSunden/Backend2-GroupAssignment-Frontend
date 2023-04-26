import React from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";

export const Index = () => {

  const {id} = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  const imageUrl = '';
  const [text, setText] = React.useState('');


  const onSubmit = async () => {
    try {
      const fields = {
        text
      }
      const {data} = await axios.post(`/posts/comments/${id}/create`, fields)
    } catch (e) {
      alert('Error with creating comment')
      alert(e)
    }

  }



  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Create comment"
            variant="outlined"
            maxRows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            fullWidth
          />
          <Button  onClick={onSubmit} variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};
