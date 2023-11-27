

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import React, { useState, useEffect , useRef} from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { CustomError } from '../../model/CustomError';
import { MessageInfos, Message } from '../../model/common';
import { getMessage } from './getMessagesAPI';
import { newMSGSelector } from '../../features/messageSlice';
import { formatTimestamp } from '../../model/common';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack
} from '@mui/material';

const MessageList: React.FC<{ receiverId: number,receiverName : string }> = ({ receiverId ,receiverName}) => {

 // const receiverId = useSelector(messageReceiverSelector);
  const newMSGcounter = useSelector(newMSGSelector);
  const userInfos = useSelector(userInfosSelector);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [error, setError] = useState({} as CustomError);
  const [messageRecus, setMessageRecus] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
 

  useEffect(() => {
    const messageInfosEnvoyes = { senderId: userInfos.userId, receiverId: receiverId } as MessageInfos;
    const messageInfosRecus = { senderId: receiverId, receiverId: userInfos.userId } as MessageInfos;

    getMessage(
      messageInfosEnvoyes,
      (resultEnvoyes: Message[]) => {
        setError(new CustomError(""));
        setMessageList(resultEnvoyes);
      },
      (loginError: CustomError) => {
        setError(loginError);
      }
    );

    getMessage(
      messageInfosRecus,
      (resultRecus: Message[]) => {
        setError(new CustomError(""));
        setMessageRecus(resultRecus);
      },
      (loginError: CustomError) => {
        setError(loginError);
      }
    );
  }, [userInfos.userId, receiverId, newMSGcounter]);

  // Combinez et triez les messages
  const combinedMessages = [...messageList, ...messageRecus].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
    return 0;
  });
  useEffect(() => {
    // Assurez-vous que scrollRef est défini et qu'il y a des éléments dans la liste
    if (scrollRef.current && combinedMessages.length > 0) {
      // Obtenez la référence du dernier élément dans la liste
      const lastMessage = scrollRef.current.lastChild as HTMLDivElement;

      // Faites défiler jusqu'au dernier élément
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [combinedMessages]);
  

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  return (
    <>
     <Box
      width={800}
      sx={{ backgroundColor: 'green', margin: 'auto', textAlign: 'center', padding: '10px' }}
    >
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
      <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
          <Avatar  alt="k,k" src="https://i.pravatar.cc/" />
        </StyledBadge>
        <Typography variant="h6" component="div" sx={{  color: 'white' }}>
          {receiverName}
        </Typography>
       
      </Stack>
    </Box>
      <Box width={760} bgcolor="grey.200" p={2} sx={{ overflowY: 'auto', maxHeight: '70vh' }} ref={scrollRef}>
        <List>
          {combinedMessages.length > 0 ? (
            combinedMessages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  marginBottom: '8px',
                  display: 'flex',
                  flexDirection: 'column', // Afficher les éléments en colonne
                  alignItems: message.senderId === userInfos.userId ? 'flex-end' : 'flex-start',
                }}
              >
                <ListItemText
                  primary={message.messageContent}
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

export default MessageList;
