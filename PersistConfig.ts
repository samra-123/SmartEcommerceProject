import AsyncStorage from "@react-native-async-storage/async-storage";

import { cartSlice } from "../cartSlice";

import {persistReducer} from 'redux-persist';

const PersistConfig={
    key:'cart',
    storage:AsyncStorage,
    whitelist:["items"],

}

export const persistedCartSlice=persistReducer(PersistConfig, cartSlice.reducer);
// as persistReducer expects a reducer function as its second argument,
//  but you are passing the entire cartSlice object. You should pass cartSlice.reducer instead.