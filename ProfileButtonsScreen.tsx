import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../colors/colors';
import HeaderFile from '../Header/HeaderFile';

//import AntDesign from 'reac-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ProfileButtonsScreen = ({ onPress, title }) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.touchbuttonstyle}>

                <View style={styles.viewbutton}>

                    <Text style={styles.textname}>{title}</Text>

                </View>

                <View>
                    <MaterialIcons name="keyboard-arrow-right" size={29} />
                </View>


            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    textname: {
        fontSize: 18,
        padding: 7

    },
    touchbuttonstyle: {
        flexDirection: 'row',
        margin: 7,
        borderBottomColor: AppColors.medGray,
        borderBottomWidth: 1
    },
    viewbutton: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
})
export default ProfileButtonsScreen;