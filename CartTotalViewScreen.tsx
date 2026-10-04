import React, { useState } from 'react';

import { View, Text, StyleSheet, Alert, Switch } from 'react-native';
//import { StyleSheet } from '../../node_modules/react-native/types/index';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppColors } from '../colors/colors';
import { shippingcharge, taxes } from '../constants/constantfile';
import { useSelector } from 'react-redux';

const CartTotalViewScreen = ({ itemsPrice, orderTotal , usefreecash, onpress}) => {

    // const orderTotalsum=itemsPrice+taxes+shippingcharge;

       const {items, finalAmount, appliedfreecash, freecash}=useSelector((state:RootState)=>state.cartSlice);



    // const [freecash, setFreecash] = useState(75);

    // const [usefreecash, setUsefreecash] = useState(false);
    // const [finalAmount, setFinalAmount] = useState(0);

    // const handlePressButton = (value) => {

    //     setUsefreecash(value);
    //     const finalAmount1 = orderTotal - freecash;
    //     setFinalAmount(finalAmount1);
    //     // Alert.alert(finalAmount);
    //     console.log(finalAmount);

    // }



    return (
        <View style={styles.main}>
            <View style={styles.vieweachlines}>
                <Text style={styles.titletext}>Item Price</Text>
                <Text style={styles.textdata}>₹{itemsPrice}</Text>
            </View>

            <View style={styles.vieweachlines}>
                <Text style={styles.titletext}>Taxes Total</Text>
                <Text style={styles.textdata}>₹ {taxes}</Text>
            </View>

            <View style={styles.vieweachlines}>
                <Text style={styles.titletext}>Shipping Total</Text>
                <Text style={styles.textdata}>₹ {shippingcharge}</Text>
            </View>

            <View style={styles.separatorlineview} />
            <View style={styles.vieweachlines}>
                <Text style={styles.titletext}>Order Total</Text>

                    <Text style={styles.textdata}>₹{orderTotal}</Text>

            </View>

           {usefreecash?
            <View style={styles.vieweachlines}>

                <Text style={styles.titletext}>Applied Cash</Text>
                <Text style={styles.textdata}>-₹{freecash}</Text>
            </View>: null
}
            {usefreecash ? 
            <View style={styles.vieweachlines}>
                <Text style={styles.titletext}>Final Price</Text>
                <Text style={styles.textdata}>${finalAmount}</Text> 


            </View> :null
}

            <View style={styles.vieweachlines}>
                <Switch value={usefreecash} onValueChange={onpress
                //    (value) => handlePressButton(value)
                }
                />
                <Text //onPress={handlePressButton}
                >Apply free ₹{freecash} cash</Text>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        //flex: 1,
        padding: 7,
        backgroundColor: AppColors.white,
        marginTop: 5,

    },
    vieweachlines: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,

    },
    separatorlineview: {
        height: 1,
        width: '100%',
        margin: 5,
        backgroundColor: AppColors.medGray

    },
    titletext: {
        fontSize: 16
    },
    textdata: {
        color: AppColors.primaryblack,
        fontSize: 16
    }
})

export default CartTotalViewScreen;