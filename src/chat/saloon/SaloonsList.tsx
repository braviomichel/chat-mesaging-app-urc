import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { getAllSaloon } from './saloonListsAPI';
import { CustomError } from '../../model/CustomError';
import { SaloonInfos} from '../../model/common';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography, Stack, Button, Modal
  } from '@mui/material';
import CreateSaloonForm from './CreateSaloonForm';
const SaloonsList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (nature : boolean) => {
    setPrivateSaloon(nature);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [privateSaloon,setPrivateSaloon] = useState(false);

  const navigate = useNavigate();

  const userInfos = useSelector(userInfosSelector);

  const [saloonList, setSaloonList] = useState<SaloonInfos[]>([]);
  const [error, setError] = useState({} as CustomError);

  const testprivate = [
    { roomId: 1, roomName: 'Salle de discussion 1' },
    { roomId: 2, roomName: 'Privée 001' },
    { roomId: 3, roomName: 'Famille' },
  ];
  
  useEffect(() => {
    console.log("loading userInfos...");
    console.log(userInfos);

}, [userInfos]);


  useEffect(() => {
    console.log("loading saloonList...");
    getAllSaloon(
      (result: SaloonInfos[]) => {
       
        setError(new CustomError(""));
        console.log("salllo");
        console.log(saloonList);
        setSaloonList(result);
      },
      (loginError: CustomError) => {
        console.log(loginError);
        setError(loginError);
      }
    );
  }, []);

  const handleClick=(id: number, name : string) => {
    navigate(`/home/saloon/${name}/${id}`);    
  }

  const style = {
    position: 'absolute',
    // as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
<Box sx={{ display: 'flex', flexDirection: 'column'  }}>

<Box >
<Stack direction="column" alignItems="center">
  <Typography variant="h6" textAlign="center">Salons textuels</Typography>
  <Button variant="contained" color="primary" 
  onClick={() => handleOpen (false )}
  >
    Créer
  </Button>
</Stack>    <List>
      {saloonList.length > 0 ? (
        saloonList.map((saloon, index) => (
          <ListItemButton key={index} onClick={() => handleClick(saloon.roomId, saloon.roomName)}>
            <ListItemIcon><CameraRoundedIcon/></ListItemIcon>
            <ListItemText primary={saloon.roomName} />
          </ListItemButton>
        ))
      ) : (
        <Typography variant="body2">Pas de salons</Typography>
      )}
    </List>
    {error.message && <span>{error.message}</span>}
  </Box>
  <Box >
<Stack direction="column" alignItems="center"  >
  <Typography variant="h6" textAlign="center">Salons Privés</Typography>
  <Button variant="contained" color="primary" 
  onClick={() => handleOpen (true )}
  >
    Créer
  </Button>
</Stack>    <List>
      {testprivate.length > 0 ? (
        testprivate.map((saloon, index) => (
          <ListItemButton key={index} onClick={() => handleClick(saloon.roomId, saloon.roomName)}>
            <ListItemIcon><CameraRoundedIcon/></ListItemIcon>
            <ListItemText primary={saloon.roomName} />
          </ListItemButton>
        ))
      ) : (
        <Typography variant="body2">Pas de salons</Typography>
      )}
    </List>
    {error.message && <span>{error.message}</span>}
  </Box>
</Box>

  <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
        <Typography variant="h6" noWrap component="div">
        Creer un Salon   {privateSaloon? "Privé" : "Public"}       
  </Typography>
          
          <CreateSaloonForm  privateSaloon={privateSaloon}/>
        </Box>
      </Modal>
    </div>
      
    </>
  );
};

export default SaloonsList;
