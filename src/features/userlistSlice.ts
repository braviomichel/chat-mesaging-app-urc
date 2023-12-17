import {  createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { UserInfos } from '../model/common';

const initialState = {
     list : [] as UserInfos[],
}

export const userlistSlice = createSlice({
    name: 'userlist',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setList : (state, action: PayloadAction<UserInfos[]> ) =>{
            state.list=action.payload;
        }
    },
    
});

export const { setList} = userlistSlice.actions;

export const userListSelector = (state : RootState)=> state.userlist.list;
export default userlistSlice.reducer;
