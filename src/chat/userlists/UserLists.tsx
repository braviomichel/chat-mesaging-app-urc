import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { getAllUser } from './userListsAPI';
import { CustomError } from '../../model/CustomError';
import { UserInfos } from '../../model/common';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import { useNavigate } from 'react-router-dom';
import { formatTimestamp } from '../../model/common';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
const UserLists = () => {
  const navigate = useNavigate();
  const userInfos = useSelector(userInfosSelector);
  const [usersList, setUsersList] = useState<UserInfos[]>([]);
  const [error, setError] = useState({} as CustomError);


  useEffect(() => {
    console.log("loading userInfos...");
    console.log(userInfos);

  }, [userInfos]);


  useEffect(() => {
    console.log("loading usersList...");
    getAllUser(
      userInfos.userId,
      (result: UserInfos[]) => {

        setError(new CustomError(""));
        setUsersList(result);
      },
      (loginError: CustomError) => {
        console.log(loginError);
        setError(loginError);
      }
    ); 
  }, [navigate, userInfos]);

  const handleClick = (id: number, name : string) => {

    navigate(`/home/user/${name}/${id}`);    



  }
  return (
    <>

      <Box >
        <Typography variant="h6" textAlign='center'>Liste des Utilisateurs</Typography>
        <List>
          {usersList.length > 0 ? (
            usersList.map((user, index) => (
              <ListItemButton key={index} onClick={() => handleClick(user.userId,user.username)}>
                <ListItemIcon><PersonPinOutlinedIcon /></ListItemIcon>
                <ListItemText
            primary={
              <Typography variant="subtitle1" component="div">
                {user.username}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="textSecondary">
                {user.last_login && formatTimestamp(user.last_login)}
              </Typography>
            }
          />
              </ListItemButton>
            ))
          ) : (
            <Typography variant="body2">Pas de users</Typography>
          )}
        </List>
        {error.message && <span>{error.message}</span>}
      </Box>

    </>
  );
};

export default UserLists;
