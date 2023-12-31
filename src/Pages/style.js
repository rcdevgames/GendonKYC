import React from 'react';
import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp } from '../Utils/responsive';

export default StyleSheet.create({
    scaffold: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    content_center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    content_button_bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'flex-end',
        padding: 16
    },
    maskedView: {
        flex: 2.5,
        flexDirection: 'row',
        height: '100%'
    },
    maskWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mask: {
        width: wp(80),
        height: wp(50),
        backgroundColor: '#000',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    ktp: {
        width: wp(66),
        height: wp(35),
        backgroundColor: '#000',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    person: {
        width: wp(40),
        height: wp(50),
        backgroundColor: '#000',
        borderRadius: wp(40),
        borderWidth: 1,
        borderColor: '#FFF'
    },
    validationText: {
        fontSize: wp(3),
        color: 'red',
        marginLeft: 15,
        marginTop: 3
    },
})