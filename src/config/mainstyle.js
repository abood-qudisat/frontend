import { Platform, StyleSheet } from 'react-native';
import { Colors, FONTFAMILYR } from './constants';

export const mainStyle = StyleSheet.create({
    customText: {
        color: '#000',
        fontFamily: FONTFAMILYR
    },
    MainInputDiv: {
        width: '100%',
        marginTop: 20
    },
    SubInputDiv: {
        width: '100%',
        // backgroundColor: Colors.GlobalGray,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 7,
        borderBottomWidth: 0.5
    },
    inputDiv: {
        // backgroundColor: Colors.GlobalGray,
        backgroundColor: '#fff',
        color: '#000',
        height: 45,
        borderRadius: 7,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        fontFamily: FONTFAMILYR,
        fontSize: 16,
    },
    inputDivLabel: {
        // textTransform: 'capitalize',
        fontSize: 16,
        marginBottom: 3,
        marginHorizontal: 10,
        fontFamily: FONTFAMILYR
    },
    eyeBtn: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CustomButton: {
        width: '100%',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 7,
        marginTop: 50,
        flexDirection: 'row',
        gap: 10
    },
    CustomButtonText: {
        color: '#fff',
        fontSize: 25,
        textTransform: 'uppercase',
        fontFamily: FONTFAMILYR
    },
    SelectDropdownBTN: {
        width: '100&',
        backgroundColor: Colors.GlobalGray,
        borderRadius: 7,
        height: 45,
    }
});