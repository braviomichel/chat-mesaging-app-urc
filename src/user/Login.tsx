import {useState} from "react";
import {loginUser} from "./loginApi";
import {Session, UserInfos} from "../model/common";
import {CustomError} from "../model/CustomError";
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store";
import { setUserInfos} from "../features/loginSlice";
export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    

    const [error, setError] = useState({} as CustomError);
    const [session, setSession] = useState({} as Session);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        loginUser({user_id: -1, username:  data.get('login') as string, password: data.get('password') as string},
            (result: Session) => {
                console.log(result);
                setSession(result);
                form.reset();
                setError(new CustomError(""));
                const userInfosData = { username: result.username,  userId : result.id} as UserInfos;
                console.log("userInfos");
                console.log(userInfosData);
                dispatch(setUserInfos(userInfosData));
                navigate('/home');
            }, (loginError: CustomError) => {
                console.log(loginError);
                setError(loginError);
                setSession({} as Session);
            });
            
           
    };

    return(<>
        <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: '100vh' }}
    >
      <Grid item>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Connexion
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="login"
              label="Login"
              placeholder="Saisissez votre login"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="Mot de passe"
              type="password"
              placeholder="Saisissez votre mot de passe"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Connexion
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
            { session.token &&
                <span>{session.username} : {session.token}</span>
            }
            { error.message &&
                <span>{error.message}</span>
            }
        </>
    );
}