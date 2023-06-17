import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { IMG_Approved, IMG_Process, IMG_Reject } from '../Assets';
import { Button, Gap } from '../Components';
import styles from './style';
import { widthPercentageToDP as wp } from '../Utils/responsive';

export default ({navigation, route}) => {
    let status = route.params?.status || 'WAITING';
    let data = {
        "WAITING": {
            "image": IMG_Process,
            "btn_label": "Selesai"
        },
        "APPROVED": {
            "image": IMG_Approved,
            "btn_label": "Mulai"
        },
        "REJECTED": {
            "image": IMG_Reject,
            "btn_label": "Coba Lagi"
        },
    };

    return (
        <View style={styles.scaffold}>
            <View style={styles.content_center}>
                <Image source={data[status].image} resizeMode={'contain'} style={{
                    width: wp(90),
                    height: wp(90)
                }}/>
            </View>
            <View style={styles.content_button_bottom}>
                <Button onPress={() => navigation.replace("HomePage")} text={data[status].btn_label}/>
                <Gap height={10}/>
            </View>
        </View>
    );
}