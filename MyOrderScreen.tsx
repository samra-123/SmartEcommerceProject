import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, FlatList, Alert , ActivityIndicator} from 'react-native';
import { AppColors } from '../colors/colors';
import { fetchUserOders } from './dataProductsfirestore';
import MyOrderScreenInnerFile from './MyOrderScreenInnerFile';

import { getDatefromFireStoreTimeStamp } from '../helper/dateHelper';


import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const itemdata = [
    { id: 1, price: 150, lessprice: 125.5, date: '2025-07-04' },
    { id: 2, price: 250, lessprice: 225.5, date: '2025-07-01' },
    { id: 3, price: 350, lessprice: 325.5, date: '2025-07-02' },
    { id: 4, price: 450, lessprice: 425.5, date: '2025-07-03' },

]
const MyOrderScreen = () => {

    const userID = useSelector(state => state.UserSlice.userdata.uid);// fetching user id from redux 
    console.log("user id in my order screen", userID);

    const [orderList, setOrderList] = useState([]);

    const [loading, setLoading]=useState(true);

   // const [orderItems, setOrderItems]=useState('');


    const getUserOrderList = async () => {
        console.log("My GET USER ORDER LIST METHJOD CALLED");
       // const useridfromAsync=await AsyncStorage.getItem("UserID_Key");
       
        //console.log(useridfromAsync);

        setLoading(true);

        const response = await fetchUserOders(userID);
        setOrderList(response);
        //const orderitemdata=response.items;
        //setOrderItems(orderitemdata);
//        console.log("orderitmmmmmmmm", JSON.stringify(orderItems));
        setLoading(false);

        console.log("order list", JSON.stringify(response))
    }


    useEffect(() => {
        console.log("My order screen useeffect");
         getUserOrderList()
    }, []
    )

      if(loading){
        return <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <ActivityIndicator size="large" color={AppColors.primaryblack}/>
            </View>
       }

    return (
        <View>
            {orderList.length>0?
            <FlatList data={orderList} //data={itemdata}  
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <MyOrderScreenInnerFile price={item.orderTotal}
                        lessprice={item.totalItemPrice} //title={item.items.title}
                       // itemdata={item.items} 
                       name={item.UserName}
                        date={getDatefromFireStoreTimeStamp(item.createdAt)} />} />
                        : <Text style={styles.textfornoOrder}> No Order placed yet</Text>}
            {/* 
            <MyOrderScreenInnerFile/>
            <MyOrderScreenInnerFile/> */}
        </View>
    )
}


const styles = StyleSheet.create({
    rowview: {
        //  flex:1,
        margin: 7,
        backgroundColor: AppColors.white,
        borderRadius: 11,
        padding: 11,
        opacity: 1,
        elevation: 9

    },
    viewseparator: {
        height: 1,
        backgroundColor: AppColors.medGray,
        margin: 5
    },
    ordertexttyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    totalpricetext: {
        fontSize: 15,
        padding: 5
    },
    viewrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textredstyle: {
        color: AppColors.redColor
    },
    textfornoOrder:{
        textAlign:'center',
      //  justifyContent:'center',
        fontSize:18,
    //    marginTop:16
    }
})
export default MyOrderScreen;