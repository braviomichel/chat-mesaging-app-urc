import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserInfos } from '../model/common';




const initialState = {
    userInfos : {
        userId: -1,
    username: "",
    
    } as UserInfos,
    token : '' as string

}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setUserInfos: (state, action: PayloadAction<UserInfos>) => {
            state.userInfos = action.payload;
        },
        setLogout : (state) => {
            state.userInfos=initialState.userInfos;
            state.token='';
        },
        setToken: (state, action: PayloadAction<string>) => {
           
            state.token= action.payload;
        },
    },
    
});

export const { setUserInfos , setLogout, setToken} = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userInfosSelector = (state: RootState) => state.login.userInfos;

export default loginSlice.reducer;