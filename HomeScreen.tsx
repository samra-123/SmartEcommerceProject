import React,{useEffect} from 'react';

import { View, Text, FlatList, BackHandler , Alert} from 'react-native';

import HeaderFile from '../Header/HeaderFile';
import HomeProducts from './HomeProducts';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// import {products} from '../Products/products';
// import ProductList from './ProductList';
// import {useDispatch} from 'react-redux';
// import {addCartItems} from '../../ReduxFolder/cartSlice';
// const dispatch=useDispatch();

const HomeScreen = () => {

    const navigation=useNavigation();
    
    useEffect(() => {

     //   getdata();

        const backAction = () => {
            if (navigation.isFocused()) {

                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
            } else {
                return false;
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <HeaderFile />
                        
            <HomeProducts />

{/* 
            <FlatList data={products} numColumns={2} keyExtractor={item => item.id}
                renderItem={({ item }) => <ProductList img={item.imageURL}
                    title={item.title} price={item.price} id={item.id} onaddCartPress={() => { dispatch(addCartItems(item)) }}
                />} /> */}
        </View>
    )
}

export default HomeScreen;