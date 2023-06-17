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
import { insertBiodata } from '../Provider';

export default ({navigation, route}) => {
    const toast = useToast();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const [step, setStep] = useState(route.params?.step || 1);

    useEffect(() => {
        // setStep(3);
        navigation.setOptions({
            title: "Verifikasi Akun Bangbeli"
        });
    }, [navigation]);

    const callbackCamera = async (uri, type) => {
        setLoading(true);
        try {
            const res = await uploadFoto(uri, type.toLowerCase());
            console.log(res);
            setLoading(false);
            if (type === "KTP") {
                setStep(3);
            }else if (type === "SELFIE") {
                navigation.navigate("ResultPage", {status: "WAITING"});
            }
        } catch (error) {
            console.log(error)
            toast.show(error);
            setLoading(false);
        }
    }

    const submitBio = async data => {
        setLoading(true);
        try {
            const res = await insertBiodata(data);
            console.log(res);
            setLoading(false);
            setStep(2);
        } catch (error) {
            console.log(error)
            toast.show(error);
            setLoading(false);
        }
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
                    {console.log(errors)}
                    <Text style={{marginTop: 10}}>NIK</Text>
                    <Input control={control} name="nik" defaultValue="" placeholder="Masukan NIK sesuai e-KTP kamu" rules={{ required: "Harus di isi!", pattern: {value: /^.{16}$/, message: "Harus 16 Digit!" }}} keyboardType="number-pad"/>
                    {errors.nik && <Text style={styles.validationText}>{errors.nik.message}</Text>}
                    <Text style={{marginTop: 10}}>Nama Lengkap</Text>
                    <Input control={control} name="name" defaultValue="" placeholder="Masukan nama lengkap sesuai e-KTP kamu" rules={{ required: "Harus di isi!" }}/>
                    {errors.name && <Text style={styles.validationText}>{errors.name.message}</Text>}
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
                            name="gender"
                            rules={{ required: "Harus di isi!" }}
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
                    {errors.gender && <Text style={styles.validationText}>{errors.gender.message}</Text>}
                    <Text style={{marginTop: 10}}>Alamat</Text>
                    <TextArea control={control} name="address" defaultValue="" placeholder="Masukan alamat sesuai e-KTP kamu" rules={{ required: "Harus di isi!" }}/>
                    {errors.address && <Text style={styles.validationText}>{errors.address.message}</Text>}
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
                            name="religi"
                            rules={{ required: "Harus di isi!" }}
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
                    {errors.religi && <Text style={styles.validationText}>{errors.religi.message}</Text>}
                    <Text style={{marginTop: 10}}>Pekerjaan</Text>
                    <Input control={control} name="work" defaultValue="" placeholder="Masukan pekerjaan lengkap sesuai e-KTP kamu" rules={{ required: "Harus di isi!" }}/>
                    {errors.work && <Text style={styles.validationText}>{errors.work.message}</Text>}
                </ScrollView>
                <Button text="Lanjutkan" style={{margin: 16}} onPress={handleSubmit(submitBio)}/>
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