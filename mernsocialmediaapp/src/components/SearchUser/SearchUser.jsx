import React, { useState, useEffect } from "react";
import axios from "../../axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Link from '@mui/material/Link';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("/users");
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <List sx={{ width: "fit-content", maxWidth: 360, display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <TextField
          type="text"
          placeholder="search by username"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      {searchTerm &&
        filteredUsers.map((user, i) => (
          <>
            
            <ListItem key={i}  >
              <ListItemAvatar>
                <Avatar alt={user.username} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
          
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        display: "flex",
                        justifyContent: "flex-start",
                        m: 1.3    
                    }}
                        
                    >
                        <Link href={`/profile/${user.username}`} 
                        underline="none"
                        color="navyblue"
                        
                        >{user.username}
                        </Link>
                      </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </>
        ))}
    </List>
  );
};

export default SearchUser;


