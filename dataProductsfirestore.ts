import firestore, { collection, getDocs, getFirestore } from '@react-native-firebase/firestore';

import { store } from '../store/store';

import { View, Text, StyleSheet, FlatList, Alert, ToastAndroid } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

//const usersCollection = firestore().collection('Users');

export const getProductData = async () => {
  try {
    const list = [];

    const querySnapshot = await firestore().collection('products').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.id, doc.data());
        list.push(doc.data())
      });
    });

    return list;

  } catch (error) {
    console.log("An error while fetching data", error);
  }
}



export const fetchUserOders = async (userID:string) => {

  try {
    
    // Alert.alert("fetchuserorder method", userID);

      
    // ToastAndroid.showWithGravity(
    //   'All Your Base Are Belong To Us',
    //   ToastAndroid.SHORT,
    //   ToastAndroid.CENTER,
    // );

 //   Alert.alert("uid",userID);

    const userOrderRef =  firestore().collection('users').doc(userID).collection('orders');

    const querySnapshot = await userOrderRef.get();

    const orderlist = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

  //  Alert.alert("order data", JSON.stringify(orderlist));

    return orderlist;

  }
  catch (error) {
    console.log("error while fetching order details", error);

  }
}