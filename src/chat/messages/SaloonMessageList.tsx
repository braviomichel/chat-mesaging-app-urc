

import React, { useState, useEffect , useRef} from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { CustomError } from '../../model/CustomError';
import { SaloonInfos, SaloonMessage } from '../../model/common';
import { getSaloonMessage } from './getMessagesAPI';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography, Stack, Avatar, AvatarGroup
} from '@mui/material';
import { saloonCounter } from '../../features/saloonSlice';
import { formatTimestamp } from '../../model/common';


const SaloonMessageList : React.FC<{ saloonID: number, saloonName: string }> = ({ saloonID,saloonName }) => {
  //const saloonID = useSelector(saloonSelector);
  //const saloonName = useSelector(saloonNameSelector);
  const userInfos = useSelector(userInfosSelector);
  const [error, setError] = useState({} as CustomError);
  const [message, setMessage] = useState<SaloonMessage[]>([]);
  const counter = useSelector(saloonCounter);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saloonInf = { roomId: saloonID, roomName: saloonName, senderID: userInfos.userId } as SaloonInfos;

    getSaloonMessage(
      saloonInf,
      (result: SaloonMessage[]) => {
        setError(new CustomError(""));

        setMessage(result.reverse());


      },
      (loginError: CustomError) => {
        setError(loginError);
      }
    );


  }, [userInfos.userId, saloonID, saloonName, counter]);

  useEffect(() => {
    // Assurez-vous que scrollRef est défini et qu'il y a des éléments dans la liste
    if (scrollRef.current && message.length > 0) {
      // Obtenez la référence du dernier élément dans la liste
      const lastMessage = scrollRef.current.lastChild as HTMLDivElement;

      // Faites défiler jusqu'au dernier élément
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [message]);

  return (

    <>

      <Box
        width={800}
        sx={{ backgroundColor: 'grey', margin: 'auto', textAlign: 'center', padding: '10px' }}
      >
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <AvatarGroup total={24}>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/" />
            <Avatar alt="Travis Howard" src="https://i.pravatar.cc/50" />
            <Avatar alt="Agnes Walker" src="https://i.pravatar.cc/40" />
            <Avatar alt="Trevor Henderson" src="https://i.pravatar.cc/70" />
          </AvatarGroup>
          <Typography variant="h6" component="div" sx={{ color: 'white' }}>
            {saloonName}
          </Typography>

        </Stack>
      </Box>
      <Box width={750} bgcolor="grey.200" p={2} sx={{ overflowY: 'auto' , maxHeight: '70vh' }} ref={scrollRef}>
        <List>
          {message.length > 0 ? (
            message.map((message, index) => (
              <ListItem key={index}
                sx={{
                  marginBottom: '8px',
                  display: 'flex',
                  flexDirection: 'column', // Afficher les éléments en colonne
                  alignItems: message.senderId === userInfos.userId ? 'flex-end' : 'flex-start',
                }}
              >
                <ListItemText primary={message.messageContent}
                  sx={{
                    display: 'inline-block',
                    maxWidth: '40%',
                    backgroundColor: message.senderId === userInfos.userId ? '#e0e0e0' : '#4CAF50',
                    borderRadius: '8px',
                    padding: '8px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
                {message.timestamp && (
                  <ListItemText
                    secondary={formatTimestamp(message.timestamp)}
                    sx={{
                      fontSize: '0.8rem',
                      color: 'gray',
                      textAlign: message.senderId === userInfos.userId ? 'right' : 'left',
                    }}
                  />
                )}
                <ListItemText
                    secondary={message.senderName}
                    sx={{
                      fontSize: '0.5rem',
                      color: 'gray',
                      textAlign: message.senderId === userInfos.userId ? 'right' : 'left',
                    }}
                  />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">Pas de Messages</Typography>
          )}
        </List>
        {error.message && <span>{error.message}</span>}
      </Box>
    </>

  );
};

export default SaloonMessageList;
