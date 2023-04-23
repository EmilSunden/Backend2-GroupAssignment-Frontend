import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";

import {Post} from '../components/Post/index';

import {fetchPosts} from "../reducer/slices/posts";

export const Home = () => {
    const dispatch = useDispatch()
    const {posts} = useSelector((state) => state.posts)
    const isPostLoading = posts.status === 'loading'

    React.useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="New Posts"/>
                <Tab label="Following Posts"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                        isPostLoading ? (
                            <Post key={index} isLoading={true}/>
                        ) : (
                            <Post
                                _id={obj._id}
                                title={obj.title}
                                imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                                createdAt={obj.createdAt}
                                user={{
                                    avatarUrl:
                                        'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                                    fullName: obj.user.username,
                                }}
                                viewsCount={obj.view}
                                commentsCount={3}
                                tags={['react', 'fun', 'typescript']}
                            />
                        ))}
                </Grid>
            </Grid>
        </>
    );
};
