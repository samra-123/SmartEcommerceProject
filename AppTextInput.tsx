import React, {use, useState} from 'react';
 
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AppTextInput=({value, placeholder,onChangeText, style, secureTextEntry})=>{

   // const [input, setInput]=useState('');
    return(
        <View>
            <TextInput value={value} placeholder={placeholder} 
            style={[styles.inputtext, style]} secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}/>

        </View>
    )
}

const styles=StyleSheet.create({

    inputtext:{
        backgroundColor:'white',
       // width:wp('70%'),
        height:hp('6%'),
        margin:7,
        borderWidth:1,
        borderRadius:21,
        padding:7,
        borderColor:'grey'
        
    }

})

export default AppTextInput;