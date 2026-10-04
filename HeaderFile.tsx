import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
//import { StyleSheet } from '../../../node_modules/react-native/types/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppColors } from '../colors/colors';

const HeaderFile=()=>{
    return(
        <View style={styles.main}>
            <Image
                style={[styles.imgstyle, styles.alignselfdata]}
                source={require('../../ImagesFolder/app-logo.png'
                
                )}
            /> 
        </View>
    )
}

const styles=StyleSheet.create({
    main:{
        //flex:1,
        backgroundColor:AppColors.primaryblack,
       // justifyContent: 'center',
        //alignItems: 'center',
       // padding:7
    },
    imgstyle:{

        width:wp('14%'),
        height:hp('6.2%'),
        margin:6,
        tintColor:'white',
        //color:'white'
       // backgroundColor:'yellow',
       // justifyContent: 'center',
       // alignItems: 'center',
      //  marginBottom:hp('1%')
    },

    alignselfdata: {

        alignSelf: 'center',
    },
})
export default HeaderFile;