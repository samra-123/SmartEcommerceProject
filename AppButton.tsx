import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const AppButton = ({ title, onPress, style, textColor = "white" }) => {
    return (
        <View>

            <TouchableOpacity style={style} onPress={onPress}
                activeOpacity={0.8}>
                <Text style={[styles.textsignin, { color: textColor }]}>{title}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({


    textsignin: {
        fontSize: 16
    }

})
export default AppButton;