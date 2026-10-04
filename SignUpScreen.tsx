import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, Alert , ToastAndroid} from 'react-native';
import AppButton from './AppButton';

import AppTextInput from './AppTextInput';

import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {useSelector, useDispatch} from 'react-redux';

import { AppColors } from '../colors/colors';
import AppInputTextController from './AppInputTextController';

import { useForm } from 'react-hook-form';

import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { setUserdata } from '../../ReduxFolder/UserSlice';

const schema=yup.object({

    EmailID:yup.string().email('Please enter a valid email').required("Email is required"),

    userName:yup.string().required("User Name is required").min(3, 'Must be atleast 3 characters'),

    Password:yup.string().required("Password is required").min(8, "Must be atleast 8 characters")

})

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch=useDispatch();


    const {control, handleSubmit}=useForm({
        resolver:yupResolver(schema)
    })

    const saveDetails= async(formData)=>{
      //  Alert.alert(JSON.stringify(formData));

        try{
            const userCredential=await auth().createUserWithEmailAndPassword(
                formData.EmailID,
            //    formData.userName,
                formData.Password,
            )
           // Alert.alert("User has been created successfully");
            ToastAndroid.showWithGravity(
                        'User has been created successfully',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
            
            navigation.navigate('CreateBottomTabNavigation')
            
            const usercredentialObj={uid:userCredential.user.uid, name:userCredential.user.displayName};

            dispatch(setUserdata(usercredentialObj )); 

            // console.log(userCredential);
            // dispatch(setUserdata(userCredential.user));
        }
        catch(error){
            let errorMessage;
            console.log(error);
            if(error.code==="auth/email-already-in-use"){
               errorMessage="This email is already in use"
            }
            else if(error.code==="auth/invalid-email"){
               errorMessage="this email, is invalid"
            }
            else if(error.code=="auth/weak-password"){
                errorMessage="The password is weak use strong password instead"
            }

            Alert.alert(errorMessage);
        }


    }
    const navigation = useNavigation();

    return (
        <View style={styles.viewmain}>

           <Image
                style={[styles.imgstyle, styles.alignselfdata]}
                source={require('../../ImagesFolder/app-logo.png')}
            /> 



            <AppInputTextController control={control} name="EmailID" value={email}
                placeholder="Enter your Email" onChangeText={setEmail} />

            <AppInputTextController control={control} name="userName" value={username}
                placeholder="Enter User Name" onChangeText={setUsername} />


            <AppInputTextController control={control} name="Password" value={password} secureTextEntry={true}
                placeholder="Enter Password" onChangeText={setPassword} />

                
            <Text style={[styles.texttitle,
            styles.alignselfdata]}>Smart E-Commerce</Text>

            <AppButton title="Create New Account"
                onPress={handleSubmit(saveDetails)}
                style={[styles.signinbutton, styles.buttoncommonstyle]} />

            <AppButton title="LogIn"
                onPress={() => navigation.navigate('SignIn')}

                style={[styles.signUpbutton, styles.buttoncommonstyle]}
                textColor={styles.textcolor}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    viewmain: {
        flex: 1, padingHorizontal: 7, backgroundColor: 'white',
        //    alignSelf: 'center',
        //alignItems: 'center',
    },
    imgstyle:{

        width:wp('40%'),
        height:hp('21%'),
        marginBottom:hp('3%'),
        tintColor:AppColors.primaryblack
    },

    alignselfdata: {

        alignSelf: 'center',
    },
    texttitle: {
        //  alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        color:AppColors.primaryblack
    },

    signUpbutton: {
        backgroundColor: AppColors.white,
        // width:wp('80%'),
        borderWidth: 1,
        borderColor:'grey'
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
    },

    signinbutton: {
        backgroundColor: AppColors.primaryblack,

    },


})
export default SignUpScreen;