import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './style';
import {LOGO} from '../Assets';
import { Button, Gap } from '../Components';

export default ({navigation}) => {

    return (
        <View style={styles.scaffold}>
            <View style={styles.content_center}>
                <Image source={LOGO}/>
                <Text style={{fontSize: 18, fontWeight: '900'}}>Aplikasi KYC</Text>
                <Gap height={15}/>
                <Text>Deskripsi</Text>
            </View>
            <View style={styles.content_button_bottom}>
                <Button onPress={() => navigation.navigate("VerifyFormPage")} text="Mulai"/>
                <Gap height={16}/>
                <Button onPress={() => navigation.navigate("ResultPage")} text="Cek Status"/>
                <Gap height={10}/>
            </View>
        </View>
    );
}