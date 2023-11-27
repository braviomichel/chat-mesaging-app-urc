import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';





const initialState = {
    receiverID :  -1 as number,
    newMSG : 0 as number,
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setMessageReceiver: (state, action: PayloadAction<number>) => {
            state.receiverID = action.payload;
        },
        setnewMSG: (state) => {
            state.newMSG = state.newMSG+1;
        },
    },
    
});

export const { setMessageReceiver, setnewMSG} = messageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const messageReceiverSelector = (state: RootState) => state.message.receiverID;
export const newMSGSelector = (state: RootState) => state.message.newMSG;

export default messageSlice.reducer;