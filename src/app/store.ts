import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import generationReducer from '../features/generation/generationSlice';
// import speciesReducer from '../features/species/speciesSlice';
import loginReducer from '../features/loginSlice';
import messageReducer from '../features/messageSlice';
import saloonReducer from '../features/saloonSlice';
import userlistReducer from '../features/userlistSlice';


export const store = configureStore({
  reducer: {
    login : loginReducer,
    message : messageReducer,
    saloon : saloonReducer,
    userlist:userlistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
