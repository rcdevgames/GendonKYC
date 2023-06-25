import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {LOGO} from '../Assets';
import { Button, Gap, setLoading } from '../Components';
import {getStatus} from '../Provider';
import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { clearSession } from '../Utils/session';

export default ({navigation}) => {
    let [userData, setUserData] = useState(null);
    let [step, setStep] = useState(1);

    const toast = useToast();
    useEffect(() => {
        // saveToken("5ef6d8d4-da59-4782-9bf2-75f40d4408ef");
        // setTimeout(() => {
        //     getStatusAPI();
        // }, 3000);
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
            toast.show(error.toString());
            setLoading(false);
        }
    }

    const doLogout = () => {
        Alert.alert("Logout", "Apakah anda yakin ingin logout?", [
            {text: "Batal", style: "cancel"},
            {text: "Logout", isPreferred: true, onPress: () => {
                clearSession();
                navigation.replace("LoginPage");
            }},
        ]);
    }

    return (
        <View style={styles.scaffold}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={{padding: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 50}} onPress={doLogout}>
                    <Icon name="logout" size={20} color="#1f69ff"/>
                </TouchableOpacity>
            </View>
            <View style={styles.content_center}>
                <Image source={LOGO}/>
                <Text style={{fontSize: 18, fontWeight: '900'}}>Aplikasi KYC</Text>
                <Gap height={15}/>
                <Text>Deskripsi</Text>
            </View>
            <View style={styles.content_button_bottom}>
                <Button onPress={() => navigation.navigate("VerifyFormPage", {step})} text="Mulai" disabled={userData !== null && (userData?.status != "UPLOADED")}/>
                <Gap height={16}/>
                <Button onPress={() => navigation.navigate("ResultPage", {status: userData?.status, msg: userData?.message})} text="Cek Status" disabled={userData !== null && userData?.status == "UPLOADED"}/>
                <Gap height={10}/>
            </View>
        </View>
    );
}