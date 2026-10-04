

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import AppButton from '../Screens/AppButton';
import { AppColors } from '../colors/colors';
import LanguageOptionFile from './LanguageOptionFile';
import { LanguageArr } from './LanguageList';


import i18n from '../Localisation/i18n';

const LanguageBottomSheet = () => {

    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const onLanguagePress = (code: string) => {
        setSelectedLang(code)

    }

    const handleConfirm = () => {  // method called on press confirm button to change language
        SheetManager.hide("LANG_SHEET");
        i18n.changeLanguage(selectedLang)

    }

    return (
        <ActionSheet id="LANG_SHEET">
            <View style={styles.container}>
                <Text style={styles.heading}>Choose Language</Text>
                {/* 
            <LanguageOptionFile  selected={true} title={"English"}/>

            
            <LanguageOptionFile  selected={false} title={"Hindi"}/>

            
            <LanguageOptionFile  selected={false} title={"Arabic"}/>
            
            <LanguageOptionFile  selected={false} title={"Chinese"}/>

            
            <LanguageOptionFile  selected={false} title={""}/> */}

                {LanguageArr.map((lang) => (
                    <LanguageOptionFile key={lang.code} title={lang.label} selected={selectedLang === lang.code}
                        onPress={() => onLanguagePress(lang.code)} />
                ))}

                <AppButton title="Confirm" style={styles.button} onPress={handleConfirm} />

            </View>

        </ActionSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 7

    },
    button: {
        backgroundColor: AppColors.primaryblack,
        borderRadius: 9,
        alignItems: 'center',
        padding: 7,


    },
    heading: {
        alignSelf: 'center',
        padding: 7,
        fontWeight: 'bold',
        fontSize: 17
    }

})
export default LanguageBottomSheet;