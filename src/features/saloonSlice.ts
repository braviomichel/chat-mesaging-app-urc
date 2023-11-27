import {  createSlice} from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState = {
     
     counter : 0 as number,
}

export const saloonSlice = createSlice({
    name: 'saloon',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
       
        setCounter : (state)=>{
            state.counter = state.counter +1;
        }
    },
    
});

export const { setCounter} = saloonSlice.actions;

export const saloonCounter = (state: RootState) => state.saloon.counter;

export default saloonSlice.reducer;
