import React from 'react';

import { View, Text, StyleSheet, Image , TouchableOpacity} from 'react-native';

//import HeaderFile from './Header/HeaderFile';

//import {products} from './Products/products';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppColors } from '../colors/colors';


interface ProductListProps {
    img: String,
    title: String,
    price: Number,
    id:String | Number,
    onaddCartPress:()=>void

}
const ProductList: React.FC<ProductListProps> = ({ img, title, price, id ,onaddCartPress}) => {

     console.warn(title);

    //  const handleButton=()=>{

    //     console.log(id);
    //     console.log(title);

    //  }

    return (
        <View style={styles.mainviewstyle}>
            <TouchableOpacity style={styles.addcartbutton} onPress={onaddCartPress}>
                <FontAwesome name="shopping-cart" size={17} color="white"/>
                
            </TouchableOpacity>
            {/*Image coding part*/}
            <View style={styles.imagecontainer}>
                <Image style={styles.imgstyle}
                source={{uri:img}}
                    //source={require('../../ImagesFolder/Smart.png')}
                     />
            </View>

            <Text style={styles.textstyle}>{title}</Text>
            <Text style={styles.textstyle}>₹ {price}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
  //  main: { flex: 1 },
    mainviewstyle: {
        backgroundColor: AppColors.white,
        borderRadius: 7,
        width: wp('48%'),
     //   height: hp('26%'),
     //   borderWidth: 1,
        marginLeft: wp('1%'),
        opacity:1,
        elevation:5,
        marginBottom:hp('1%')

    },
    addcartbutton:{
        width:wp('8%'),
        height:hp('4%'),
        backgroundColor:AppColors.primaryblack,
        borderRadius:wp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        left:5,
        top:2

    },
    
    imagecontainer: {
       // width: wp('45%'),

       // height: hp('15%'),
     //   backgroundColor:'yellow',
        overflow: 'hidden',
        margin:2

    },
    imgstyle: {
        width: wp('80%'),
        alignSelf: 'center',
        
        height: hp('15%'),
        resizeMode: 'contain'


    },
    textstyle:{
        fontWeight:'bold',
        fontSize:16,
        paddingLeft:7,
        paddingTop:3
    }


})
export default ProductList;