/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

// interface UserState {
//   id: string | null;
//   name: string | null;
//   email: string | null;
//   isAuthenticated: boolean;
// }

export const initialState = {
  createUserObj: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
    userType: "",
    isHomeowner: false,
    isServiceProvider: false,
    homeOwner: {
      propertyAddress1: "",
      propertyAddress2: "",
      city: "",
      state: "",
      zip: "",
      propertyId: "",
      howLong: "",
      primary: "",
      walletType: "",
      isCreateWallet: false,
      isLinkWallet: false,
      createWallet: {
        walletName: "",
        email: "",
        authMethod: "",
        useGoogleAuth: false,
        useOtherAuth: false,
        secretWords: "",
        publicKey: "",
        privateKey: "",
      },
      linkWallet: {
        walletPublicKey: "",
        exchangeMedium: "",
        secretWords: "",
      },
    },
    serviceProvider: {
      serviceName: "",
      license: "",
      isCreateWallet: false,
      isLinkWallet: false,
      walletType: "",
      createWallet: {
        walletName: "",
        email: "",
        authMethod: "",
        useGoogleAuth: false,
        useOtherAuth: false,
        secretWords: "",
        publicKey: "",
        privateKey: "",
      },
      linkWallet: {
        walletPublicKey: "",
        exchangeMedium: "",
        secretWords: "",
      },
    }
  }
};

const userRegistrationSlice = createSlice({
  name: 'userRegistration',
  initialState,
  reducers: {
    updateBasicInfo: (state, action) => {
      console.log(action)
      state.createUserObj = {
        ...state.createUserObj,
        ...action.payload
      };
    },
    updateHomeOwnerInfo: (state, action) => {
      console.log(action)
      state.createUserObj.homeOwner = { 
        ...state.createUserObj.homeOwner, 
        ...action.payload 
      };
    },
    updateServiceProviderInfo: (state, action) => {
      state.createUserObj.serviceProvider = {
        ...state.createUserObj.serviceProvider,
        ...action.payload
      };
    },
  },
});

export const { 
  updateBasicInfo, 
  updateHomeOwnerInfo, 
  updateServiceProviderInfo 
} = userRegistrationSlice.actions;
export default userRegistrationSlice.reducer; 
