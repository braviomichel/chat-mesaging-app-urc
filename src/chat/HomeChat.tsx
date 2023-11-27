import React from 'react';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userInfosSelector } from '../features/loginSlice';
import UserLists from './userlists/UserLists';
//import MessageForm from './messages/MessageForm';
import { messageReceiverSelector } from '../features/messageSlice';
import SaloonsList from './saloon/SaloonsList';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { CssBaseline, AppBar, Typography, Toolbar, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setLogout } from '../features/loginSlice';
const HomeChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const receiverId = useSelector(messageReceiverSelector);
  const userInfos = useSelector(userInfosSelector);

  useEffect(() => {
    //  console.log("loading userInfos...");
    console.log(userInfos);

  }, [userInfos, receiverId]);

  const drawerWidth1 = 300;
  const handleLogout = () => {

    dispatch(setLogout());
    navigate("/");
  }

  return (
    <>


      <Box sx={{
        display: 'flex',
      }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" noWrap component="div">
              Ubo Relay Chat
            </Typography>

            <IconButton color="inherit" onClick={handleLogout}>
              Déconnexion <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth1,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth1,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="bottom"
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem key="s" disablePadding>
              <UserLists />
            </ListItem>

          </List>
          <Divider />
          <List>
            <ListItem key="d" disablePadding>
              <SaloonsList />
            </ListItem>

          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '80vh', // Définir la hauteur à 100vh pour occuper toute la hauteur de la vue
              margin: '5px auto',
              width: '800px',
              padding: '10px'
            }}
          >
            <div>Choisissez une conversation</div>

            <Divider sx={{ width: '100%', }} />

            {/* <MessageForm /> */}
          </Box>


        </Box>

      </Box>

    </>
  );
};

export default HomeChat;
