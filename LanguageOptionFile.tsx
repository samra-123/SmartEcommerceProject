



import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import ActionSheet from 'react-native-actions-sheet';
import AppButton from '../Screens/AppButton';
import { AppColors } from '../colors/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface LanguageOptionFileProps{
    selected?: boolean,
    title:string,
    onPress:()=>void

}

const LanguageOptionFile:React.FC<LanguageOptionFileProps>=({selected, title, onPress})=>{
    return(
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={styles.circle}>
            {selected && <View style={styles.innercircle}/>}
            
        </View>

         <Text style={styles.title}> {title}</Text>
      </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    touchable:{
        flexDirection:'row',
        padding:5,
        alignItems:'center'

    },
    circle:{
       width:wp('6%'),
       height:hp('3%'),
       borderRadius:wp('3%'),
       borderColor:'black',
       borderWidth:2,
       alignItems:'center',
       justifyContent:'center'

    },
    innercircle:{
        width:wp('3%'),
        height:hp('1.5%'),
        borderRadius:wp('3%'),
        backgroundColor:AppColors.primaryblack,
        alignSelf:'center'

    },
    title:{
        fontSize:15,
        paddingLeft:6

    },

    button:{
        backgroundColor:AppColors.primaryblack,
        borderRadius:9,
        alignItems:'center',
        padding:7,
        
        
    },
    heading:{
        alignSelf:'center',
        padding:7,
        fontWeight:'bold',
        fontSize:17
    }

})
export default LanguageOptionFile;