import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {logout} from "../../reducer/userReducer";
import {useDispatch, useSelector} from "react-redux";
import SearchUser from '../SearchUser/SearchUser';
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const username = useSelector(state => state.user.currentUser.user) 
  const dispatch = useDispatch()
  let navigate = useNavigate()

  console.log(username)

  function goToProfile () {
    navigate(`/profile/:${username.username}`)
  }
  function goToFollowing () {
    navigate(`/profile/following/:${username.id}`)
  }

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
                  <Button variant="contained">All Posts</Button>
                </a>
                  <Button onClick={goToFollowing} variant="contained">My Feed</Button>
                <a href="/posts/create">
                  <Button variant="contained">Create Post</Button>
                </a>
                  <Button onClick={goToProfile} variant="contained">Profile</Button>

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


