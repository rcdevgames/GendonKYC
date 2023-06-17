import React, {useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../Utils/responsive';
import MaskedView from '@react-native-masked-view/masked-view';
import { Button, Gap } from '../Components';

export default ({navigation, route, initialProps}) => {
    let [img64, setImg64] = useState(null);

    let typeCamera = route.params?.type || 'KTP';
    let callback = route.params?.callback;

    const [
        { cameraRef, type, ratio, autoFocus, autoFocusPoint },
        { toggleFacing, takePicture },
    ] = useCamera(initialProps);

    const dataCamera = {
        "KTP": {
            "label": "Posisikan e-KTP kamu didalam bingkai dan ambil foto.",
            "label2": "Pastikan Foto e-KTP kamu sudah jelas dan tidak blur.",
            "frame": (
                <View style={styles.maskWrapper}>
                    <View style={styles.mask}></View>
                </View>
            )
        },
        "SELFIE": {
            "label": "Posisikan wajah dan e-KTP kamu berada di bingkai yang tersedia kemudian ambil foto.",
            "label2": "Pastikan wajah dan e-KTP kamu terlihat jelas dan tidak blur.",
            "frame": (
                <View style={styles.maskWrapper}>
                    <View style={styles.person}></View>
                    <View style={styles.ktp}></View>
                </View>
            )
        }
    }

    const doCapture = async () => {
        const data = await takePicture({ quality: 0.5 });
        setImg64(data.uri);
    }

    if (img64) {
        return (
            <View style={{...styles.scaffold, backgroundColor: '#000'}}>
                <View style={{flex: 1, padding: 20}}>
                    <Image 
                        source={{uri: img64}} 
                        style={{
                            backgroundColor: '#FFF',
                            width: '100%',
                            height: hp(65)
                        }}
                        resizeMode="cover"
                    />
                    <Text style={{color: '#FFF', textAlign: 'center'}}>{dataCamera[typeCamera].label2}</Text>
                </View>
                <View style={{flexDirection: 'row', width: '100%', padding: 20}}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: '#FFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 8,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#1f69ff'
                        }}
                        onPress={() => setImg64(null)}
                    >
                        <Text style={{color: '#1f69ff'}}>Ulang</Text>
                    </TouchableOpacity>
                    <Gap width={20}/>
                    <TouchableOpacity 
                        style={{
                            flex: 1,
                            backgroundColor: '#1f69ff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 8,
                            borderRadius: 20
                        }}
                        onPress={() => {
                            callback(img64, typeCamera);
                            navigation.goBack();
                        }}
                    >
                        <Text style={{color: '#FFF'}}>Kirim</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.scaffold}>
            <MaskedView
                style={styles.maskedView}
                maskElement={dataCamera[typeCamera].frame}>
                <RNCamera
                    ref={cameraRef}
                    autoFocusPointOfInterest={autoFocusPoint.normalized}
                    type={type}
                    ratio={ratio}
                    style={{ flex: 1 }}
                    autoFocus={autoFocus}
                />
            </MaskedView>
            <View style={{flex: 1, padding: 20, backgroundColor: '#000'}}>
                <Text style={{color: '#FFF', flex: .1, fontSize: 10, textAlign: 'center'}}>{dataCamera[typeCamera].label}</Text>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
                        <Icon name="close-sharp" color="#FFF" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: wp(20),
                        height: wp(20),
                        borderRadius: wp(20),
                        backgroundColor: '#FFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={doCapture}>
                        <Icon name="camera-sharp" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => toggleFacing()}>
                        <Icon name="camera-reverse" color="#FFF" size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}