import React, {useEffect, useState} from "react";
import {SideBlock} from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import {useParams} from "react-router-dom";
import axios from "../axios";


export const CommentsBlock = ({children}) => {

    const {id} = useParams()
    const [comments, setComments] = useState()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        axios(`/posts/comments/${id}`)
            .then((res) => {
                setComments(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    if (isLoading) {
        return <List isLoading={isLoading}/>
    }

    return (
        <SideBlock title="Comments">
            <List>
                {(isLoading? [...Array(5)] : comments).map((obj, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {isLoading ? (
                                    <Skeleton variant="circular" width={40} height={40}/>
                                ) : (
                                    <Avatar alt={obj.user.username} src={obj.user.avatarUrl}/>
                                )}
                            </ListItemAvatar>
                            {isLoading ? (
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <Skeleton variant="text" height={25} width={120}/>
                                    <Skeleton variant="text" height={18} width={230}/>
                                </div>
                            ) : (
                                <ListItemText
                                    primary={obj.user.username}
                                    secondary={obj.text}
                                />
                            )}
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </React.Fragment>
                ))}
            </List>
            {children}
        </SideBlock>
    );
};
