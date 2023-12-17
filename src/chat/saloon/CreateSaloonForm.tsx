import React, { useState } from 'react';
import {
  FormControl,
  TextField,
  Button,
  Box,
  FormGroup,
  FormControlLabel,InputLabel,
  Checkbox,
} from '@mui/material';
import {  NewSaloon } from '../../model/common';
import { createSaloon, createSaloonPrivate } from './createSaloonAPI';
import { userInfosSelector } from '../../features/loginSlice';
import { useSelector } from 'react-redux';
import { CustomError } from '../../model/CustomError';
import { userListSelector } from '../../features/userlistSlice';


const CreateSaloonForm: React.FC<{ privateSaloon: boolean }> = ({ privateSaloon }) => {

  const userInfos = useSelector(userInfosSelector);
  const [error, setError] = useState({} as CustomError);
  const usersList = useSelector(userListSelector);

  const [saloonName, setSaloonName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleSaloonNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSaloonName(event.target.value);
  };

  const handleUserCheckboxChange = (
    userId: number,
    checked: boolean
  ) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (checked) {
        return [...prevSelectedUsers, userId];
      } else {
        return prevSelectedUsers.filter((id) => id !== userId);
      }
    });
  };

  const handleSubmit = () => {
    // Vérifier que le nom du salon est renseigné et au moins un utilisateur est sélectionné
    
    if (privateSaloon){
      if (!saloonName.trim() || selectedUsers.length === 0) {
        setError({
          name: 'BAD_REQUEST',
          message:
            'Veuillez renseigner le nom du salon et sélectionner au moins un utilisateur.',
        });
        return;
      }
      const newSaloon: NewSaloon = {
        creatorID: userInfos.userId,
        roomName: saloonName,
        usersList: selectedUsers,
      };
      createSaloonPrivate(
        newSaloon,
        (result: boolean) => {
          if (result === true) {
            setSaloonName('');
            setSelectedUsers([]);
            setError(new CustomError(''));
          } else {
            console.error("La création du salon privé  a échoué.");
          }
        },
        (createAccountError: CustomError) => {
          console.log(createAccountError);
          setError(createAccountError);
        }
      );

    }else {
      if (!saloonName.trim() ) {
        setError({
          name: 'BAD_REQUEST',
          message:
            'Veuillez renseigner le nom du salon et sélectionner au moins un utilisateur.',
        });
        return;
      }
      const newSaloon: NewSaloon = {
        creatorID: userInfos.userId,
        roomName: saloonName,
       
      };
      createSaloon(
        newSaloon,
        (result: boolean) => {
          if (result === true) {
            setSaloonName('');
            setSelectedUsers([]);
            setError(new CustomError(''));
          } else {
            console.error("La création du salon public a échoué.");
          }
        },
        (createAccountError: CustomError) => {
          console.log(createAccountError);
          setError(createAccountError);
        }
      );

    }

    
   
  };

  return (
    <FormControl fullWidth>
      <TextField
        label="Nom du salon"
        variant="outlined"
        value={saloonName}
        onChange={handleSaloonNameChange}
        margin="normal"
      />
      {privateSaloon &&
      
      <FormGroup>
        <InputLabel id="users-select-label">
          Utilisateurs autorisés
        </InputLabel>
        {usersList.map((user) => (
          <FormControlLabel
            key={user.userId}
            control={
              <Checkbox
                checked={selectedUsers.includes(user.userId)}
                onChange={(e) =>
                  handleUserCheckboxChange(user.userId, e.target.checked)
                }
              />
            }
            label={user.username}
          />
        ))}
      </FormGroup>
      }
      
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Créer le salon
        </Button>
        {error.message && <span>{error.message}</span>}
      </Box>
    </FormControl>
  );
};

export default CreateSaloonForm;
