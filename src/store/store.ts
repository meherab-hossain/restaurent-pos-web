// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userRegistrationReducer from './feature/userRegistrationSlice';

const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
