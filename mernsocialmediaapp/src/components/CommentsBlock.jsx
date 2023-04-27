import React, { useEffect, useState } from "react";
import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useHref, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import styles from "./AddComment/AddComment.module.scss";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export const CommentsBlock = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser.user);
  const [text, setText] = React.useState("");
  const [isEdit, setEdit] = useState(false);
  const { id } = useParams();
  const postId = useParams();
  const [comments, setComments] = useState();
  const [setComment, setEditComment] = useState();
  const [isLoading, setLoading] = useState(true);

  const commentDelete = async ({ id }) => {
    await axios.delete(`/posts/comments/${id}/delete`);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== id)
    );
  };

  const onSubmit = async () => {
    try {
      const fields = { text };
      const { data } = isEdit
        ? await axios.patch(`/posts/comments/${setComment}/edit`, fields)
        : await axios.post(`/posts/comments/${id}/create`, fields);
      // const _id = isEdit ? id : data._id
      if (isEdit) {
        setComments((prevComments) => {
            console.log(prevComments)
          return prevComments.map((comment) => {
            if (comment._id === setComment) {    
              return data;
            } else {
              return comment;
            }
          });
        });
      } else {
        setComments((prevComments) => [...prevComments, data]);
      }
      setEdit(false);
      setText("");
    } catch (e) {
      alert("Error with creating comment");
    }
  };

  useEffect(() => {
    axios(`/posts/comments/${id}`)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (isLoading) {
    return <List isLoading={isLoading} />;
  }

  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(5)] : comments).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.username} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.username}
                  secondary={obj.text}
                />
              )}
              {currentUser?.id === obj.user._id && (
                <div>
                  <IconButton color="primary">
                    <EditIcon
                      onClick={() => {
                        setText(obj.text);
                        setEdit(true);
                        setEditComment(obj._id);
                      }}
                    />
                  </IconButton>
                  <IconButton color="secondary">
                    <DeleteIcon
                      onClick={() => commentDelete({ id: obj._id })}
                    />
                  </IconButton>
                </div>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
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

            <Button onClick={onSubmit} variant="contained">
              {isEdit ? "Save Changes" : "Publish"}
            </Button>
          </div>
        </div>
      </>
    </SideBlock>
  );
};
