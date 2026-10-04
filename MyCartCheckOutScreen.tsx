import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AppColors } from '../colors/colors';
import AppButton from '../Screens/AppButton';
import AppInputTextController from '../Screens/AppInputTextController';
import AppTextInput from '../Screens/AppTextInput';
//import { StyleSheet } from '../../node_modules/react-native/types/index';
import firestore from '@react-native-firebase/firestore';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../store/store';

import { shippingcharge, taxes } from '../constants/constantfile';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

import { addCartItems, removeItemFromCart, emptyCart } from '../../ReduxFolder/cartSlice';
//import EmptyCart from './EmptyCart';

// schema for validation form of input field
const schema = yup.object({
    PhoneNumber: yup.string()
        .required("Phone number is required").matches(/^[0-9]+$/, "Must be digits only")
        .min(10, "Phone number must be of 10 digits"),

    UserName: yup.string().required("Name is required")
        .min(3, "Must be of 3 characters at least"),

    detailedAddress: yup.string().required("Address is required")
        .min(15, "Must be 15 char minimum")
}).required()


const MyCartCheckOutScreen = () => {

    const dispatch = useDispatch();

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const { userdata } = useSelector((state: RootState) => state.UserSlice);// to fetch the userdata from redux 
    const { items } = useSelector((state: RootState) => state.cartSlice);

    const totalItemPrice = items.reduce((acc, item) => acc + item.sum, 0);
    const orderTotal = totalItemPrice + taxes + shippingcharge;

    //const itemTitles = items.map(item => item.title).join(', ');
    //console.log("titles", itemTitles);

    console.log("data==========");
    console.log(JSON.stringify(userdata));

    const saveOrder = async (formData) => {

        try {
            const orderBody = {
                ...formData,
                items,
              //  itemTitles,
                totalItemPrice,
                createdAt: new Date(),
                orderTotal,
            }

            // creating users and inside it created orders of user as per user id
            const userOrderRef = firestore().collection('users').doc(userdata.uid).collection('orders');
            await userOrderRef.add(orderBody);

            // created orders data for admin to check 
            const orderRef = firestore().collection('orders');
            await orderRef.add(orderBody);

            //  Alert.alert('ORDER placed successfully');
            //  showMessage({type:'success', message:"order placed successfully"})
            showMessage({
                message: "Order placed successfully",
                type: "success",
            });

            navigation.goBack();
            dispatch(emptyCart())

            //           const orderRef=await addDoc(userOrderRef, orderBody)
        }

        catch (error) {
            console.log(error);
        }

        console.log("data*******", JSON.stringify(formData));

    }

    const navigation = useNavigation();

    return (
        <View style={styles.main}>

            <View style={styles.innerview}>

                <AppInputTextController control={control} name="PhoneNumber" placeholder="Enter Phone Number" />

                <AppInputTextController control={control} name="UserName" placeholder="Enter User Name" />

                <AppInputTextController control={control} name="detailedAddress" placeholder="Enter Address" />

            </View>

            <AppButton title="Confirm" style={styles.button} onPress={handleSubmit(saveOrder)} />

            <FlashMessage position={"top"} />

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        //  backgroundColor:AppColors.white
    },
    innerview: {
        flex: 1,

        backgroundColor: AppColors.white,
        borderRadius: 7,
        margin: 11

    },
    button: {
        backgroundColor: AppColors.primaryblack,
        margin: 7,
        alignItems: 'center',
        borderRadius: 17,
        padding: 7
    }

})
export default MyCartCheckOutScreen;