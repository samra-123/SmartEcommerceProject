import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import AllScreensNavigation from '../../Navigation/AllScreensNavigation';
import HeaderFile from '../Header/HeaderFile';

import ProfileButtonsScreen from './ProfileButtonsScreen';

import { useNavigation } from '@react-navigation/native';

import { SheetManager } from 'react-native-actions-sheet';

import LanguageBottomSheet from '../Language/LanguageBottomSheet';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from './SignIn';
import { useTranslation } from 'react-i18next';

import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {

    const navigation = useNavigation();

    const {t}=useTranslation();

    const displayName=useSelector(state => state.UserSlice.userdata.displayName);
    console.log(displayName);

    const logoutmethod = async () => {

        //    Alert.alert("logout");

      //  await AsyncStorage.removeItem("USER_DATA");

         await auth().signOut();

        showMessage({
            type: "success",
            message: "logout successfully"
        })

        ToastAndroid.showWithGravity(
            'logout successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );

        navigation.navigate("SignIn");
    }

    return (
        <View>
            <HeaderFile />

            <Text style={styles.textname}>Hello, {displayName}</Text>
            <ProfileButtonsScreen title={t("My_Order_button_title")}
                onPress={() => navigation.navigate('MyOrderScreen')} />

            <ProfileButtonsScreen title={t("Language_title")} onPress={() => SheetManager.show("LANG_SHEET")} />

            <ProfileButtonsScreen title={t("LogOut_title")} onPress={() => { logoutmethod() }} />

            <LanguageBottomSheet />

            <FlashMessage position={"top"} />

        </View>
    )
}

const styles = StyleSheet.create({
    textname: {
        fontSize: 18,
        padding: 7

    }
})
export default ProfileScreen;