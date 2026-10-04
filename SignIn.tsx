import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, BackHandler, ToastAndroid } from 'react-native';
import AppButton from './AppButton';
// import AppTextInput from './AppTextInput';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppColors } from '../colors/colors';
import AppInputTextController from './AppInputTextController';
import { useForm } from 'react-hook-form';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

//import {auth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setUserdata } from '../../ReduxFolder/UserSlice';
import FlashMessage, { showMessage } from 'react-native-flash-message';


const schema = yup.object({

    UserEmail: yup.string().email("Please enter a valid email").required("Email is required"),
    
     //   EmailID:yup.string().email('Please enter a valid email').required("Email is required"),

    Password: yup.string().required("Password is required").min(6, "Must be 8 characters")

}).required()


const SignIn = () => {
    const [useremail, setUseremail] = useState('');

    const [password, setPassword] = useState('');

    const dispatch = useDispatch();


    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    const saveLogin = async (formData) => {
        //  console.log(formData);
        //Alert.alert(JSON.stringify(formData));
        console.log("data", formData);

        try {
            const credential = await auth().signInWithEmailAndPassword(
                //    auth,
                formData.UserEmail, // name should be exact same as when you do console.log(formData) the username and pass. name should be same as in object formdata
                formData.Password,
            )

            navigation.navigate('CreateBottomTabNavigation')
            console.log("credential", JSON.stringify(credential));

            const usercredentialObj = { uid: credential.user.uid };

            // basically user id i.e uid we are storing in setUserdata method

            dispatch(setUserdata(usercredentialObj));  // to store the data of user (mainly uid) in setuserdata method of redux i.e 
            //   Alert.alert(JSON.stringify(credential));
          //  console.log("cred of user signin", JSON.stringify())
        }
        catch (error: any) {
            console.log("error", error.code);
            // Alert.alert(JSON.stringify(error));
            let errorMessage = "";
            if (error.code === "auth/user-not-found") {
                errorMessage = "User not found"
            }
            else if (error.code === "auth/invalid-credential") {
                errorMessage = "Wrong email or password"
            }
            else if(error.code==="auth/user-not-found"){
                errorMessage="User account is not found or may be deleted"
            }
            else if(error.code==="auth/user-disabled"){
                errorMessage="User account is disabled"
            }
            else {
                errorMessage = "An error occured during Login."
            }

            //  Alert.alert(errorMessage);
            showMessage({
                type: "danger",
                message: errorMessage,
            });

            // ToastAndroid.showWithGravity(
            //     errorMessage,
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER,
            // );
        }

    }

// to add functionality of app exit on back press
    useEffect(() => {

        //   getdata();

        const backAction = () => {
            if (navigation.isFocused()) {

                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
            } else {
                return false;
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const navigation = useNavigation();

    return (
        <View style={styles.viewmain}>

            <Image
                style={[styles.imgstyle, styles.alignselfdata]}
                source={require('../../ImagesFolder/app-logo.png')}
            />

            {/* code for app text input with validation */}

            <AppInputTextController control={control} name="UserEmail" value={useremail}
                placeholder="Enter User Email"
                onChangeText={setUseremail} />


            <AppInputTextController control={control} name="Password" value={password}
                placeholder="Enter Password" secureTextEntry={true}
                onChangeText={setPassword} />


            <Text style={[styles.texttitle,
            styles.alignselfdata]}>Smart E-Commerce</Text>

            {/* code for signin and signup button */}

            <AppButton title="SignIn"
                onPress={handleSubmit(saveLogin)}
                style={[styles.signinbutton, styles.buttoncommonstyle]} />


            <AppButton title="SignUp"
                onPress={() => navigation.navigate('SignUpScreen')}

                style={[styles.signUpbutton, styles.buttoncommonstyle]}
                textColor={styles.textcolor}
            />


            <FlashMessage position={"top"} />
        </View>
    )
}

const styles = StyleSheet.create({

    viewmain: {
        flex: 1, padingHorizontal: 7,
        backgroundColor: AppColors.white,
        //    alignSelf: 'center',
        //alignItems: 'center',
    },
    imgstyle: {

        width: wp('40%'),
        height: hp('21%'),
        marginBottom: hp('3%'),
        tintColor: AppColors.primaryblack
    },

    alignselfdata: {

        alignSelf: 'center',
    },
    texttitle: {
        //  alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        color: AppColors.primaryblack
    },

    signUpbutton: {
        backgroundColor: AppColors.white,
        // width:wp('80%'),
        borderWidth: 1,
        borderColor: 'grey'
        //borderRadius:21,
        //marginTop:7
    },
    textcolor: {

        color: 'black'
    },
    buttoncommonstyle: {
        height: hp('6%'),
        margin: 7,
        //  borderWidth:1,
        borderRadius: 21,
        padding: 5,
        alignItems: 'center',
        //  alignSelf: 'center',
        justifyContent: 'center',
        //borderColor:'grey'
    },//

    signinbutton: {
        backgroundColor: AppColors.primaryblack,

    },


})
export default SignIn;