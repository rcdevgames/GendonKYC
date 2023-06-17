import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './style';
import {LOGO} from '../Assets';
import { Button, Gap, setLoading } from '../Components';
import {getStatus} from '../Provider';
import { useToast } from 'react-native-toast-notifications';
import { clearSession } from '../Utils/session';

export default ({navigation}) => {
    let [userData, setUserData] = useState(null);
    let [step, setStep] = useState(1);

    const toast = useToast();
    useEffect(() => {
        // clearSession();
        getStatusAPI();
    }, [navigation]);
    
    const getStatusAPI = async () => {
        setLoading(true);
        try {
            const res = await getStatus();
            if (res !== null && res.kyc_member !== null) setStep(2);
            if (res !== null && res.kyc_ocr !== null) setStep(3);

            setUserData(res);
            setLoading(false);
        } catch (error) {
            console.log(error)
            toast.show(error);
            setLoading(false);
        }
    }

    return (
        <View style={styles.scaffold}>
            <View style={styles.content_center}>
                <Image source={LOGO}/>
                <Text style={{fontSize: 18, fontWeight: '900'}}>Aplikasi KYC</Text>
                <Gap height={15}/>
                <Text>Deskripsi</Text>
            </View>
            <View style={styles.content_button_bottom}>
                <Button onPress={() => navigation.navigate("VerifyFormPage", {step})} text="Mulai" disabled={userData !== null && (userData?.status == "WAITING" || userData?.status == "APPROVED")}/>
                <Gap height={16}/>
                <Button onPress={() => navigation.navigate("ResultPage", {status: userData?.status})} text="Cek Status" disabled={userData !== null && userData?.status == "UPLOADED"}/>
                <Gap height={10}/>
            </View>
        </View>
    );
}