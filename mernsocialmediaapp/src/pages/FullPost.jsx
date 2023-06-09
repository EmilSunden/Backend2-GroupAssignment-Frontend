import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Post} from "../components/Post";
import {CommentsBlock} from "../components/CommentsBlock";
import ReactMarkdown from 'react-markdown'
import axios from '../axios'


export const FullPost = () => {
    const {id} = useParams()
    const [data, setObj] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        axios(`/posts/${id}`)
            .then((res) => {
                setObj(res.data)
                setLoading(false)
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [])
    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }
    return (
        <>
            <Post
                _id={data._id}
                title={data.title}
                text={data.text}
                imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                createdAt={data.createdAt}
                viewsCount={data.views}
                user={{
                    avatarUrl:
                        'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: data.user.username,
                }}
                commentsCount={3}
                tags={['react', 'fun', 'typescript']}
                isFullPost
            >
                <ReactMarkdown children={data.text} />
            </Post>
            <CommentsBlock/>
        </>
    );
};
