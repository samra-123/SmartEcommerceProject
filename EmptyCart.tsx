import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//import HeaderFile from './Header/HeaderFile';
//import HomeProducts from './HomeProducts';

import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderFile from '../Header/HeaderFile';

import AppButton from '../Screens/AppButton';
import { AppColors } from '../colors/colors';

const EmptyCart = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.main}>
            <Ionicons name="bag-handle-outline"
                size={59} color={AppColors.primaryblack} style={{ margin: 7 }} />

            <Text style={styles.titletext}>Your Cart is Empty</Text>

            <Text style={styles.subjecttext}>Browse our Products and find something you like</Text>
            {/* 
        <TouchableOpacity style={styles.startshoppingbutton} onPress={()=>navigation.navigate('HomeScreen')}>
            <Text style={styles.buttontext}> Start Shopping</Text>
        </TouchableOpacity> */}

            <AppButton title="Start Shopping"
                style={styles.startshoppingbutton}
                onPress={() => navigation.navigate('HomeScreen')} />

        </View>
    )
}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    titletext: {
        fontSize: 21,
        fontWeight: 'bold',
        color: AppColors.primaryblack
    },
    subjecttext: {
        color: 'grey',
        fontSize: 19,
        padding: 5,
        //textAlign: 'center',
        alignSelf: 'center',
        width: wp('68%'),
        //  backgroundColor:'yellow'
    },
    startshoppingbutton: {

        backgroundColor: AppColors.primaryblack,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 11

    },
    buttontext: {
        color: AppColors.white,
        fontSize: 19
    }



})

export default EmptyCart;