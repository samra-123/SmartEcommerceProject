
import { createSlice, nanoid , PayloadAction} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';


interface UserState{
    userdata:object | null;
   // isLoading:boolean
}
const initialState:UserState={
    userdata:null,
   // isLoading:true,
}

export const UserSlice=createSlice({
    name:'userlogin',
    initialState,
    reducers:{

        setUserdata:(state, action:PayloadAction<object>)=>{

            state.userdata=action.payload

            AsyncStorage.setItem("USER_DATA", JSON.stringify(action.payload))
          //  state.isLoading=false;

        },
        // setIsLoading:(state, action:PayloadAction<boolean>)=>{
        //     state.isLoading=action.payload
        // }

    }
})

export const {setUserdata, //setIsLoading

}=UserSlice.actions;
export default UserSlice.reducer;
