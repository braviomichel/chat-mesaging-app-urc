import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { CustomError } from '../../model/CustomError';
import { Message, SaloonMessage } from '../../model/common';
import { addMessage,addSaloonMessage } from './addMessagesAPI';
import {  Grid, Paper, TextField, IconButton } from '@mui/material';
import { setnewMSG } from '../../features/messageSlice';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import { setCounter } from '../../features/saloonSlice';
import SendIcon from '@mui/icons-material/Send';


const MessageForm : React.FC<{ receiverId: number , saloonId : number, saloonName : string}> = ({ receiverId, saloonId, saloonName }) => {
  const dispatch = useDispatch<AppDispatch>();

  //const receiverId = useSelector(messageReceiverSelector);
  //const choice = useSelector(choiceSelector);
  const userInfos = useSelector(userInfosSelector);
  const [messageSent, setMessageSent] = useState('');
  const [error, setError] = useState({} as CustomError);
  //const saloonId = useSelector(saloonSelector);
  //const saloonName= useSelector(saloonNameSelector);
 

  

  useEffect(() => {
    // console.log('loading userInfos...');
    // console.log(userInfos);
  }, [userInfos,receiverId, saloonId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageSent(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    
if(receiverId !== -1) {
  const message: Message = {
    senderId: userInfos.userId,
    receiverId: receiverId,
    messageContent: messageSent,
    senderName:userInfos.username
  };
  addMessage(
    message,
    (result: boolean) => {
      if (result === true) {
        dispatch(setnewMSG());
        setMessageSent('');
        setError(new CustomError(''));
      } else {
        console.error('La création de message a échoué.');
      }
    },
    (messageError: CustomError) => {
      console.log(messageError);
      setError(messageError);
    }
  );
}else if ( saloonId!==-1){
  const saloonmessage: SaloonMessage = {
    senderId: userInfos.userId,
    roomId: saloonId,
    roomName:saloonName,
    messageContent: messageSent,
    senderName : userInfos.username
  };
  addSaloonMessage(
    saloonmessage,
    (result: boolean) => {
      if (result === true) {
        dispatch(setCounter());
        setMessageSent('');
        setError(new CustomError(''));
      } else {
        console.error('La création de message a échoué.');
      }
    },
    (messageError: CustomError) => {
      console.log(messageError);
      setError(messageError);
    }
  );
}
    
  };

  return (
    <Grid
    container
    direction="row"
    justifyContent="center"
   // sx={{ border:1}}
    
  >
    <Grid item xs={10} sx={{ padding: 3 , height : 100}}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="messageSent"
            label="Message"
            placeholder="Saisissez votre message"
            variant="outlined"
            fullWidth
            margin="normal"
            value={messageSent}
            onChange={handleChange}
            required
            autoComplete='off'
            multiline
          maxRows={2}
          />
        </form>
  
    </Grid>
    <Grid item xs={2}>
    <Paper elevation={0} sx={{ padding: 3, height : 100}}>
      <IconButton
     
        type="submit"
        size="large"
        color="inherit"
        aria-label="send"
        sx={{ mt: 2 , mb:2}}
        onClick={handleSubmit}
      >
        <SendIcon 
        sx={{ fontSize: 40}}
        />
      </IconButton>
      </Paper>
    </Grid>
    {error.message && <span>{error.message}</span>}
  </Grid>
  
  );
};

export default MessageForm;
