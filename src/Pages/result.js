import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { IMG_Approved, IMG_Process, IMG_Reject } from '../Assets';
import { Button, Gap, setLoading } from '../Components';
import styles from './style';
import { widthPercentageToDP as wp } from '../Utils/responsive';
import {register} from '../Provider';
import { useToast } from 'react-native-toast-notifications';

export default ({navigation, route}) => {
    const toast = useToast();
    let status = route.params?.status || 'WAITING';
    let msg = route.params?.msg || '';
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

    const recreate = async () => {
        setLoading(true);
        try {
            await register(true);
            setLoading(false);
            navigation.replace("HomePage");
        } catch (error) {
            toast.show(error.toString());
            setLoading(false);
        }
    }

    return (
        <View style={styles.scaffold}>
            <View style={styles.content_center}>
                <Image source={data[status].image} resizeMode={'contain'} style={{
                    width: wp(90),
                    height: wp(90)
                }}/>
                {status === "REJECTED" && <Text style={{fontSize: wp(5)}}>{msg}</Text>}
            </View>
            <View style={styles.content_button_bottom}>
                <Button onPress={() => {
                    if (status === "REJECTED") {
                        recreate();
                    }else {
                        navigation.replace("HomePage");
                    }
                }} text={data[status].btn_label}/>
                <Gap height={10}/>
            </View>
        </View>
    );
}