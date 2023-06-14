import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import { Button, Input, TextArea } from '../Components';
import { widthPercentageToDP as wp } from '../Utils/responsive';
import styles from './style';
import { useForm, Controller } from "react-hook-form";
import { useToast } from 'react-native-toast-notifications';
import { Picker } from '@react-native-picker/picker';
import { IMG_ExampleKTP, IMG_ExampleSelfie, IMG_Hore, IMG_VerifyKTP } from '../Assets';
import {setLoading} from '../Components';

export default ({navigation}) => {
    const toast = useToast();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const [step, setStep] = useState(1);

    useEffect(() => {
        navigation.setOptions({
            title: "Verifikasi Akun Bangbeli"
        });
        setValue("ktp", null);
        setValue("selfie", null);

        // const unsubscribe = navigation.addListener("beforeRemove", e => {
        //     console.log(step)
        //     // if (step == 1) return;
        //     // setStep(step - 1);
        //     // Prevent default behavior of leaving the screen
        //     e.preventDefault();
        // });
      
        // return unsubscribe;
    }, [navigation]);

    const callbackCamera = (base64, type) => {
        if (type === "KTP") {
            setValue("ktp", base64);
            setStep(3);
        }else if (type === "SELFIE") {
            setValue("selfie", base64);
            handleSubmit(doSave)();
        }
        console.log("DONE", type)
    }

    const doSave = async data => {
        setLoading(true);
        console.log(data);

        setTimeout(() => {
            setLoading(false);
            navigation.navigate("ResultPage", {status: 'wait'});
        }, 3000);

    }

    return (
        <View style={styles.scaffold}>
            <View style={{
                padding: 16,
            }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: wp(10),
                        height: 7,
                        borderRadius: 20,
                        backgroundColor: '#1f69ff'
                    }}/>
                    <View style={{
                        width: wp(10),
                        height: 7,
                        borderRadius: 20,
                        backgroundColor: step >= 2? '#1f69ff' : '#dedede',
                        marginLeft: 5
                    }}/>
                    <View style={{
                        width: wp(10),
                        height: 7,
                        borderRadius: 20,
                        backgroundColor: step === 3? '#1f69ff' : '#dedede',
                        marginLeft: 5
                    }}/>
                </View>
                <Text style={{fontSize: 10, marginTop: 10}}>Langkah {step} dari 3</Text>
            </View>
            { step == 1 && <View style={{flex: 1, paddingHorizontal: 16}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{fontSize: 17}}>Masukan data e-KTP</Text>
                    <Text style={{fontSize: 12, color: '#7A7A7A'}}>Pastikan data yang kamu masukkan sudah benar dan sesuai dengan KTP mu, agar verfikasi berhasil.</Text>

                    <Text style={{marginTop: 10}}>NIK</Text>
                    <Input control={control} name="nik" defaultValue="" placeholder="Masukan NIK sesuai e-KTP kamu"/>
                    <Text style={{marginTop: 10}}>Nama Lengkap</Text>
                    <Input control={control} name="nama_lengkap" defaultValue="" placeholder="Masukan nama lengkap sesuai e-KTP kamu"/>
                    <Text style={{marginTop: 10}}>Jenis Kelamin</Text>
                    <View style={{
                        borderRadius: 15,
                        backgroundColor: '#e9f0ff',
                        paddingHorizontal: 15,
                        marginTop: 5,
                        color: 'black'
                    }}>
                        <Controller
                            control={control}
                            defaultValue={null}
                            name="jenis_kelamin"
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,
                            }) => (
                                <Picker ref={ref} selectedValue={value} onValueChange={(value, index) => onChange(value)} style={{
                                    fontSize: 10
                                }}>
                                    <Picker.Item label="Pilih Jenis Kelamin" value={null} />
                                    <Picker.Item label="Laki-Laki" value="laki-laki" />
                                    <Picker.Item label="Perempuan" value="perempuan" />
                                </Picker>
                            )}
                        />
                    </View>
                    <Text style={{marginTop: 10}}>Alamat</Text>
                    <TextArea control={control} name="alamat" defaultValue="" placeholder="Masukan alamat sesuai e-KTP kamu"/>
                    <Text style={{marginTop: 10}}>Agama</Text>
                    <View style={{
                        borderRadius: 15,
                        backgroundColor: '#e9f0ff',
                        paddingHorizontal: 15,
                        marginTop: 5,
                        color: 'black'
                    }}>
                        <Controller
                            control={control}
                            defaultValue={null}
                            name="agama"
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,
                            }) => (
                                <Picker ref={ref} selectedValue={value} onValueChange={(value, index) => onChange(value)} >
                                    <Picker.Item label="Pilih Agama" value={null} />
                                    <Picker.Item label="Islam" value="islam" />
                                    <Picker.Item label="Kristen" value="kristen" />
                                    <Picker.Item label="Hindu" value="hindu" />
                                    <Picker.Item label="Budha" value="budha" />
                                    <Picker.Item label="Katolik" value="katolik" />
                                    <Picker.Item label="Konghucu" value="konghucu" />
                                </Picker>
                            )}
                        />
                    </View>
                    <Text style={{marginTop: 10}}>Pekerjaan</Text>
                    <Input control={control} name="pekerjaan" defaultValue="" placeholder="Masukan pekerjaan lengkap sesuai e-KTP kamu"/>
                </ScrollView>
                <Button text="Lanjutkan" style={{margin: 16}} onPress={() => setStep(2)}/>
            </View>}
            {step == 2 && <View style={{flex: 1, paddingHorizontal: 16}}>
                    <Text style={{fontSize: 17}}>Verifikasi e-KTP</Text>
                    <Text style={{fontSize: 12, color: '#7A7A7A', marginTop: 10}}>Teken ikon kamera, foto kartu e-KTP dan kami akan memverifikasi data kamu.</Text>
                    <Image source={IMG_VerifyKTP} resizeMode={'contain'} style={{
                        width: wp(60),
                        height: wp(60),
                        alignSelf: 'center',
                        marginTop: -40
                    }}/>
                    <Text style={{fontSize: 17, marginTop: -25}}>Panduan Foto e-KTP</Text>
                    <Image source={IMG_ExampleKTP} resizeMode={'contain'} style={{
                        width: wp(60),
                        height: wp(60),
                        alignSelf: 'center',
                        marginTop: -40
                    }}/>
                    <View style={{flex: 1}}/>
                    <Button text="Ambil Foto" style={{margin: 16}} onPress={() => navigation.navigate("CameraPage", {type: "KTP", callback: callbackCamera})}/>
            </View>}
            {step == 3 && <View style={{flex: 1, paddingHorizontal: 16}}>
                    <Text style={{fontSize: 17}}>Selfie dengan e-KTP</Text>
                    <Text style={{fontSize: 12, color: '#7A7A7A', marginTop: 10}}>Foto selfie sambil menunjukan e-KTP kamu, posisikan kepala dan e-KTP kamu sesuai dengan layout yang sudah disediakan.</Text>
                    <Image source={IMG_Hore} resizeMode={'contain'} style={{
                        width: wp(60),
                        height: wp(60),
                        alignSelf: 'center',
                        marginTop: -40
                    }}/>
                    <Text style={{fontSize: 17, marginTop: -25}}>Panduan Foto selfie dengan e-KTP</Text>
                    <Image source={IMG_ExampleSelfie} resizeMode={'contain'} style={{
                        width: wp(60),
                        height: wp(60),
                        alignSelf: 'center',
                        marginTop: -40
                    }}/>
                    <View style={{flex: 1}}/>
                    <Button text="Ambil Foto" style={{margin: 16}} onPress={() => navigation.navigate("CameraPage", {type: "SELFIE", callback: callbackCamera})}/>
            </View>}
        </View>
    );
}