import React, { useState } from 'react';
import { FormControl, TextField, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { UserInfos , NewSaloon} from '../../model/common';
import { createSaloon } from './createSaloonAPI';
import { userInfosSelector } from '../../features/loginSlice';
import { useSelector } from 'react-redux';
import { CustomError } from '../../model/CustomError';
import { SelectChangeEvent } from '@mui/material/Select';


const CreateSaloonForm : React.FC<{ usersList: UserInfos[] }> = ({ usersList }) => {
    const userInfos = useSelector(userInfosSelector);
    const [error, setError] = useState({} as CustomError);


  const [saloonName, setSaloonName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Assurez-vous que le type est bien 'number[]'
  const handleSaloonNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaloonName(event.target.value);
  };


  
  const handleUsersChange = (event: SelectChangeEvent<number | number[]>) => {
    setSelectedUsers(Array.isArray(event.target.value) ? event.target.value : []); 
  };
  
  const handleSubmit = () => {
     // Vérifier que le nom du salon est renseigné et au moins un utilisateur est sélectionné
     if (!saloonName.trim() || selectedUsers.length === 0) {
        setError({ name: 'BAD_REQUEST', message: 'Veuillez renseigner le nom du salon et sélectionner au moins un utilisateur.' });
        return;
      }
      
const newsaloon :NewSaloon = { creatorID : userInfos.userId, roomName: saloonName} 
createSaloon (newsaloon, (result: boolean )  => {
    if (result === true) {
        setSaloonName('');
        setSelectedUsers([]);
        setError(new CustomError(""));
       
      } else {
        // Gérer le cas où la création de l'utilisateur a échoué
        console.error("La création du salon a échoué.");
      }
}, (createAccountError: CustomError) => {
  console.log(createAccountError);
  setError(createAccountError);
});
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

      
      <InputLabel id="users-select-label">Utilisateurs autorisés</InputLabel>
      <Select
        labelId="users-select-label"
        id="users-select"
        multiple
        value={selectedUsers}
        onChange={handleUsersChange}
        label="Utilisateurs autorisés"
        variant="outlined"
      >
        {usersList.map((user) => (
          <MenuItem key={user.userId} value={user.userId}>
            {user.username}
          </MenuItem>
        ))}
      </Select>
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
