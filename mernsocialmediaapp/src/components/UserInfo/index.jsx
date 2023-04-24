import React from 'react';
import styles from './UserInfo.module.scss';
import { Link } from 'react-router-dom';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Link to={`/profile/${fullName}`}>
        <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      </Link>
      <div className={styles.userDetails}>
        <Link to={`/profile/${fullName}`} className={styles.userName}>{fullName}</Link>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
