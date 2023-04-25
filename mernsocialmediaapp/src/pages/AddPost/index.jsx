import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "../../axios";
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useNavigate} from "react-router-dom";

export const AddPost = () => {
    const navigate = useNavigate()
    const imageUrl = '';
    const [text, setText] = React.useState('');
    const [isConfirmed, setConfirmed] = React.useState(false);
    const [title, setTitle] = React.useState('');


//for files, if there is a desire to attach them to the backend
    const handleChangeFile = () => {
    };
    const onClickRemoveImage = () => {
    };
////////////////////////////////////


    const onSubmit = async () => {
        try {
            const fields = {
                title,
                text
            }
            const {data} = await axios.post('/posts/create', fields)
            const id = data._id
            console.log(id)
            navigate(`/posts/${id}`)
        } catch (e) {
            console.log(e)
        }

    }



    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: true,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter text...',
            status: false
        }),
        [],
    );

    return (
        <Paper style={{padding: 30}}>
            <Button variant="outlined" size="large">
                Load preview image
            </Button>
            <input type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                    Delete
                </Button>
            )}
            {imageUrl && (
                <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded"/>
            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title..."
                fullWidth
            />
            <TextField classes={{root: styles.tags}} variant="standard" placeholder="Tags" fullWidth/>
            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    Publish
                </Button>
                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
