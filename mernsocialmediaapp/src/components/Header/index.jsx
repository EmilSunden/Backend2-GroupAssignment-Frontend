import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {logout} from "../../reducer/userReducer";
import {useDispatch, useSelector} from "react-redux";
import SearchUser from '../SearchUser/SearchUser';

export const Header = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const username = useSelector((state) => state.user.currentUser.user) 
  const dispatch = useDispatch()

  const profilePath = `/profile/:${username}` 
  const myFeedPath = `/profile/following/:${username}` 

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>Twisster</div>
          </a>
         
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                 <SearchUser />
                <a href="/">
                  <Button variant="contained">Show Latest Posts</Button>
                </a>
                <a href={profilePath}>
                  <Button variant="contained">Profile</Button>
                </a>
                <a href={myFeedPath}>
                  <Button variant="contained">My Feed</Button>
                </a>
                <a href="/posts/create">
                  <Button variant="contained">Create Post</Button>
                </a>
                <Button onClick={() => dispatch(logout())} variant="contained" color="error">
                  Exit
                </Button>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button variant="outlined">Login</Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Register</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};


