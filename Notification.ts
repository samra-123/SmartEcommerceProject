
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, ToastAndroid } from 'react-native';

// method to grant permission to allow notification
 const requestUserPermission = async () => {

    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    if(granted===PermissionsAndroid.RESULTS.GRANTED){
        console.log("Notification granted");
    }
    else{
        console.log("Notification permission denied");
    }

}
// to get token for specific user 
const getToken=async()=>{
    try{
        const token=await messaging().getToken();
        console.log(token);
    }
    catch(error){
        console.log("error occured",error);
    }
}
// this method we are going to use in our app.tsx file 
export const useNotification=()=>{
    useEffect(() => {
    requestUserPermission();
    getToken();
 }, []);


 useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        const msgTitle=remoteMessage.notification?.title;
        const msgBody=remoteMessage.notification?.body;
      //  const msgTitle=remoteMessage.notification?.title;
     // Alert.alert(msgTitle, msgBody);
       ToastAndroid.showWithGravity(
      msgBody,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    });

    return unsubscribe;
  }, []);

}



