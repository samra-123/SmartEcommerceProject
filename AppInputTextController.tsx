import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {Controller} from 'react-hook-form';
import AppTextInput from './AppTextInput';
import { AppColors } from '../colors/colors';

const AppInputTextController=({control,rules,name,placeholder, keyboardType, secureTextEntry})=>{
    return(
        <Controller control={control}
        rules={rules} name={name} 
        render={({field:{onChange, value}, fieldState:{error}
        })=>(
            <>
            <AppTextInput value={value} onChangeText={onChange} secureTextEntry={secureTextEntry}
             placeholder={placeholder} style={error && styles.errormsg}
             //secureTextEntry={secureTextEntry} 
             //keyboardType={keyboardType}
             />

             {error && <Text style={styles.texterror}>{error.message}</Text>}
             </>
        )}/>
    )
}

const styles=StyleSheet.create({
    errormsg:{
        borderColor:AppColors.redColor
    },
    texterror:{
        color:AppColors.redColor,
        fontSize:12,
        textAlign:'center',

    }
})

export default AppInputTextController;