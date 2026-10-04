import React, { useState } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppColors } from "../colors/colors";

//import MaterialIcons from 'react-native-vector'
import Ionicons from 'react-native-vector-icons/Ionicons';


import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const tempItem = {
//     id: 2,
//     price: 749,
//     title: "Lenovo Laptop",
//     imageURL:
//         "https://image.made-in-china.com/318f0j00nEfGPdYIhWom/6%E6%9C%8814%E6%97%A5%287%29.mp4.webp",
// }

interface CartItemsProps {
    title: String,
    price: String | Number,
    imageURL: String,
    qty: Number,
    onIncrementPress: () => void,
    onDecrementPress: () => void,
    onDeletePress: () => void,

}
const CartItems: React.FC<CartItemsProps> = ({ title, price, imageURL, qty, 
    onIncrementPress, onDecrementPress, onDeletePress }) => {

    //  const [increment, setIncrement]=useState(0);
    // const [decrement, setDecrement]=useState(0);
    const [count, setCount] = useState(0);

    const incrementCall = () => {
        setCount(count + 1);
    }

    const decrementCall = () => {
        setCount(count - 1);
    }

    return (
        <View style={styles.mainview}>

            {/* Image View */}

            <View style={styles.imgview}>
                <Image style={styles.imgstyle}
                    source={{ uri: imageURL }} />

            </View>

            {/* Details view */}

            <View style={styles.detailsview}>
                <Text style={[styles.titletext, styles.commontextstyle]}>{title}</Text>
                <Text style={[styles.pricetext, styles.commontextstyle]}>${price}</Text>

                <View style={styles.incDecviewstyle}>
                    <TouchableOpacity style={styles.viewminus} onPress={onDecrementPress}>
                        <AntDesign name="minus" size={21} color={AppColors.primaryblack} />
                    </TouchableOpacity>
                    <Text style={styles.itemcountstyle}>{qty}</Text>

                    <TouchableOpacity style={styles.viewminus} onPress={onIncrementPress}>
                        <Ionicons name="add" size={21}  color={AppColors.primaryblack} />
                    </TouchableOpacity>

                </View>


            </View>

            {/* delete button view */}
            <View style={styles.viewdeletebutton}>
                <TouchableOpacity style={styles.deletebuttonpressable} onPress={onDeletePress}>
                    <MaterialIcons name="delete-outline" size={22} color="red" />

                    <Text style={styles.commontextstyle}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainview: {// main view of our particular item
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        //  justifyContent: 'space-between',
        borderColor: AppColors.medGray,
        margin: 5,
        paddingBottom: 5
        // align: 'center',
        // justifyContent: 'center',

    },
    imgview: {// styling of img view container
        // width:wp('30%'),

        //  height:wp('16%'),
        //  overflow:'hidden',
        //    backgroundColor:'yellow',
        flex: 1.5

    },
    imgstyle: {
        width: wp('20%'),
        height: hp('10%'),
        alignSelf: 'center',

    },
    detailsview: {// details styling of view
        //  backgroundColor:'lightblue',
        flex: 3.5,
        //  justifyContent: 'center',
        paddingLeft: wp('1.5%')


    },
    titletext: {// title text styling
        fontSize: 17,


    },
    commontextstyle: {
        color: AppColors.primaryblack,
        fontWeight: 'bold',

    },
    pricetext: {// styling of price text
        //  fontWeight:'bold',
        fontSize: 15,
        //color:AppColors.primaryblack,
        marginTop: hp('0.3%')
    },
    viewdeletebutton: {// delete button view container
        flex: 1.5,
        //backgroundColor:'pink',

        justifyContent: 'flex-end',
    },
    deletebuttonpressable: {// ddelete button touchable style
        flexDirection: 'row',
        alignItems: 'center',

    },
    incDecviewstyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 18,
        padding: 4,
        width: wp('19%'),
        //    alignSelf: 'center',
        //    justifyContent: 'center',
        alignItems: 'center',
        borderColor: AppColors.blueGray,
        marginTop: hp('0.3%')

    },
    itemcountstyle: {// styling of count text
       // borderLeftWidth: 1,
        paddingHorizontal: 4,
        //borderRightWidth: 1,
        borderColor: AppColors.blueGray,
        color: AppColors.primaryblack
    },
    viewminus: {
        width: wp('6%'),
        height: hp('3%'),
        backgroundColor: 'lightgrey',
        borderRadius: wp('4%'),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default CartItems;