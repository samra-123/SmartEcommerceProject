import React, { useState , useEffect} from 'react';

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

//import HeaderFile from './Header/HeaderFile';
//import HomeProducts from './HomeProducts';

import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderFile from '../Header/HeaderFile';

import AppButton from '../Screens/AppButton';
import { AppColors } from '../colors/colors';
import EmptyCart from './EmptyCart';
//import CreateBottomTabNavigation from '../../../Navigation/CreateBottomTabNavigation';
import CartItems from './CartItems';
import { products } from '../Products/products';

import CartTotalViewScreen from './CartTotalViewScreen';
import { RootState } from '../store/store';

import {useSelector, useDispatch} from 'react-redux';
import { addCartItems, applyfreecash, removeItemFromCart, removeProductFromCart, setFreeCash } from '../../ReduxFolder/cartSlice';
import { shippingcharge, taxes } from '../constants/constantfile';

const CartScreen = () => {

    const navigation = useNavigation();

    const {items, finalAmount, appliedfreecash}=useSelector((state:RootState)=>state.cartSlice);

    const dispatch=useDispatch();

    console.log(items);

    const totalItemPrice= items.reduce((acc,item)=> acc+item.sum, 0);

    const orderTotal=totalItemPrice+taxes+shippingcharge;

        // const [freecash, setFreecash] = useState(75);
    
         const [usefreecash, setUsefreecash] = useState(false);
        // const [finalAmount, setFinalAmount] = useState(0);
    
        const handlePressButton = (value) => {
    
            setUsefreecash(value);
        //    const finalAmount1 = orderTotal - freecash;
          //  setFinalAmount(finalAmount1);
            // Alert.alert(finalAmount);
            //console.log(finalAmount);
    
        }

        useEffect(() => {
        dispatch(setFreeCash(100)); // Simulate wallet balance
    }, []);

    useEffect(() => {
        dispatch(applyfreecash(usefreecash));
    }, [usefreecash, items]);
    

    return (
        <View style={{ flex: 1 , backgroundColor:AppColors.white}}>
            <HeaderFile />
            {items.length>0?
            <>
            <View style={{flex:1}}>
                  <FlatList data={items} keyExtractor={item=>item.id.toString()}
                renderItem={({item})=><CartItems {...item} price={item.sum} 
                onDecrementPress={()=>dispatch(removeItemFromCart(item))}
                onDeletePress={()=>dispatch(removeProductFromCart(item))}
                onIncrementPress={()=>dispatch(addCartItems(item))}
                />} showVerticalScrollIndicator={false}/>  

             
            </View>
              <CartTotalViewScreen itemsPrice={totalItemPrice} orderTotal={orderTotal} //freecash={freecash} 
              usefreecash={usefreecash}
                onpress={(value)=>handlePressButton(value)}/>
              

              <AppButton title="Continue" style={styles.confirmbutton} onPress={()=>navigation.navigate("MyCartCheckOutScreen")}/>
              </>
              : <EmptyCart/>}

        </View>
    )
}

const styles = StyleSheet.create({

    confirmbutton:{
        //borderWidth:1,
        backgroundColor:AppColors.primaryblack,
       padding:7,
       margin:7,
       alignItems: 'center',
       borderRadius:18

    }

    // main:{
    //     flex:1,
    //     justifyContent: 'center',
    //     alignItems: 'center',

    // },

    // titletext:{
    //     fontSize:21,
    //     fontWeight:'bold',
    //     color:AppColors.primaryblack
    // },
    // subjecttext:{
    //     color:'grey',
    //     fontSize:19,
    //     padding:5,
    //     //textAlign: 'center',
    //     alignSelf:'center',
    //    width:wp('68%'),
    //   //  backgroundColor:'yellow'
    // },
    // startshoppingbutton:{

    //     backgroundColor:AppColors.primaryblack,
    //     justifyContent: 'center',
    //     alignItems:'center',
    //     padding:7,
    //     borderRadius:11

    // },
    // buttontext:{
    //     color:AppColors.white,
    //     fontSize:19
    // }



})

export default CartScreen;