import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, BackHandler } from 'react-native';
//import { InteractionManager } from '../../node_modules/react-native/types/index';

//import HeaderFile from './Header/HeaderFile';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//import {products} from '../Products/products';

import ProductList from './ProductList';

import { useDispatch } from 'react-redux';

import { addCartItems } from '../../ReduxFolder/cartSlice';

import { getProductData } from './dataProductsfirestore';


const HomeProducts = () => {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);


    const fetchData = async () => {
        const data = await getProductData();

        setProducts(data);
        // console.warn(data);
        //   Alert.alert(JSON.stringify(products));
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.main}>


            <FlatList data={products} numColumns={2} keyExtractor={item => item.id}
                renderItem={({ item }) => <ProductList img={item.imageURL}
                    title={item.title} price={item.price} id={item.id} onaddCartPress={() => { dispatch(addCartItems(item)) }}
                />} />

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: hp('1%')
    }
})
export default HomeProducts;