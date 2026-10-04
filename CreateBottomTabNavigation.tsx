import React from 'react';
import { View, Text } from 'react-native';

//import {NavigationContainer} from '@react-navigation\native';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Components/Screens/HomeScreen';

import ProfileScreen from '../Components/Screens/ProfileScreen';


import CartScreen from '../Components/CardFolder/CartScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppColors } from '../Components/colors/colors';


const Tab = createBottomTabNavigator();


const CreateBottomTabNavigation = () => {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: AppColors.primaryblack, tabBarLabelStyle: {
                    fontSize: 14,// marginTop:4
                }
            }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                    title: "Home"

                }} />

            <Tab.Screen name="CartScreen" component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" size={size} color={color} />
                    ),
                    title: "Cart"

                }} />

            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                tabBarIcon: (({ focused , color}) =>
                    <AntDesign name="user"
                        size={21} color={color}
                    />),
                    title: "Profile"
            }} />
        </Tab.Navigator>

    )
}

export default CreateBottomTabNavigation;

