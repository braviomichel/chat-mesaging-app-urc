import React from 'react';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userInfosSelector } from '../features/loginSlice';
import UserLists from './userlists/UserLists';
import MessageForm from './messages/MessageForm';
import SaloonsList from './saloon/SaloonsList';
import SaloonMessageList from './messages/SaloonMessageList';
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
import { useParams } from 'react-router-dom';


const SaloonChats = () => {
  const { saloonID, saloonName} = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userInfos = useSelector(userInfosSelector);

  useEffect(() => {
    //  console.log("loading userInfos...");
    console.log(userInfos);

  }, [userInfos, saloonID,saloonName]);

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
             <SaloonMessageList saloonID  ={Number(saloonID)} saloonName = {String(saloonName)}/>

            <Divider sx={{ width: '100%', }} />

            <MessageForm  receiverId={-1} saloonId={Number(saloonID)} saloonName={String(saloonName)}/>
          </Box>


        </Box>

      </Box>

    </>
  );
};

export default SaloonChats;
