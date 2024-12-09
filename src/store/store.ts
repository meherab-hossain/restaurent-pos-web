// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './feature/menuSlice';
import userRegistrationReducer from './feature/userRegistrationSlice';
const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
