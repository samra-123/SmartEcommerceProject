import React from 'react';

import {View, Text,StyleSheet} from 'react-native';
import { AppColors } from '../colors/colors';

const MyOrderScreenInnerFile=({price, date, lessprice, name })=>{
    //console.log("itemsdata", itemdata)
    return(
        <View>
           
            <View style={styles.rowview}>
                <Text style={styles.ordertexttyle}>Order Details:</Text>
                <View style={styles.viewseparator}/>
                
                 <Text style={{marginLeft:5, fontSize:16, fontWeight:'bold'}}>{name}</Text>
                <View style={styles.viewrow}>
                   
                <Text style={styles.totalpricetext}>Total Price: ${price}</Text>
                <View>
                    <Text style={styles.textredstyle}>${lessprice}</Text>
                </View>

                </View>

                <View style={styles.viewrow}>
                <Text style={styles.totalpricetext}>Date: {date}</Text>
                
                </View>
                
            </View>
        </View>
    )
}


const styles=StyleSheet.create({
    rowview:{
      //  flex:1,
        margin:7,
        backgroundColor:AppColors.white,
        borderRadius:11,
        padding:11,
        opacity:1,
        elevation:9

    },
    viewseparator:{
        height:1,
        backgroundColor:AppColors.medGray,
        margin:5
    },
    ordertexttyle:{
        fontSize:18,
        fontWeight:'bold'
    },
    totalpricetext:{
        fontSize:15,
        padding:5,
       // fontWeight:'bold'
    },
    viewrow:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textredstyle:{
        color:AppColors.redColor
    }
})
export default MyOrderScreenInnerFile;