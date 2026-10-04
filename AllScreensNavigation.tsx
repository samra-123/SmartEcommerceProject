import React, { useEffect, useState } from 'react';
import { View, Text , ActivityIndicator, Alert} from 'react-native';

//import {NavigationContainer} from '@react-navigation\native';
import { NavigationContainer } from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation\native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Components/Screens/SignIn';
import SignUpScreen from '../Components/Screens/SignUpScreen';
//import MyCartCheckOutScreen from '../Components/Screens/MyCartCheckOutScreen';

import MyCartCheckOutScreen from '../Components/CardFolder/MyCartCheckOutScreen';
//import { StackFrame } from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import CreateBottomTabNavigation from './CreateBottomTabNavigation';
import MyOrderScreen from '../Components/Screens/MyOrderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
//import { setIsLoading, setUserdata } from '../ReduxFolder/UserSlice';
import { setUserdata } from '../ReduxFolder/UserSlice';
import {RootState} from '../Components/store/store';
import { AppColors } from '../Components/colors/colors';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();


const AllScreensNavigation = () => {

  //  const dispatch=useDispatch();
    const [isLoading, setIsLoading]=useState<boolean>(true);

    const [userData, setUserData]=useState<object|null>(null);

    const dispatch=useDispatch();


    useEffect(()=>{
        auth().onAuthStateChanged(userDatafromFirebase=>{
            if(userDatafromFirebase){
                console.log("user is signed in");
      
                setIsLoading(false);
                setUserData(userDatafromFirebase)

               // console.log("user data all screen file", userData.uid);
                const useralreadysignedinUID={uid:userDatafromFirebase.uid}; // if the user already logged in then keep the userid in some variable obj
             
                console.log("user id from all screen navi", useralreadysignedinUID);
                dispatch(setUserdata(useralreadysignedinUID));// storing user id in userslice redux if user already logged in 
               
            }
            else{
                console.log("user is signed out");
                setIsLoading(false);
            }
        })
    },[])


//     const {userdata, isLoading}=useSelector((state:RootState)=>state.UserSlice)

//     const isUserLoggedIn = async () => {
//         try {

//             const storeduserlogininfo = await AsyncStorage.getItem("USER_DATA");
//             console.log(storeduserlogininfo); // this will display user uid on console
//             if(storeduserlogininfo){
//                 dispatch(setUserdata(JSON.parse(storeduserlogininfo)))
//             }
//             else{
//              dispatch(setIsLoading(false))
//             }
//         }
//         catch (error) {
//             console.log("error", error);
//              dispatch(setIsLoading(false))
//         }

//     }

//    useEffect(()=>{isUserLoggedIn()},[])

   if(isLoading){
    return <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
        <ActivityIndicator size="large" color={AppColors.primaryblack}/>
        </View>
   }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}
             initialRouteName={userData?"CreateBottomTabNavigation":"SignIn"}
            >
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

                <Stack.Screen name="CreateBottomTabNavigation" component={CreateBottomTabNavigation} />

                <Stack.Screen name="MyCartCheckOutScreen" component={MyCartCheckOutScreen} />

                <Stack.Screen name="MyOrderScreen"
                    component={MyOrderScreen} 
                    options={{ headerShown: true, title: 'My Orders', headerTitleAlign: 'center', }} />
            </Stack.Navigator>

        </NavigationContainer>

    )
}

export default AllScreensNavigation;