import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Button, Input, setLoading } from '../Components';
import { registration } from '../Provider';
import styles from './style';

export default ({navigation}) => {
    const toast = useToast();
    const { control, handleSubmit, formState: { errors }} = useForm();

    useEffect(() => {
        navigation.setOptions({
            title: "Daftar"
        });
    }, [navigation]);

    const doRegister = async data => {
        if (data.password !== data.confirm_password) {
            toast.show("Password tidak sama.");
        }else {
            setLoading(true);
            try {
                await registration(data);
                navigation.goBack();
                toast.show("Registrasi Berhasil, silakan login.")
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.show(error.toString());
            }
        }
    }

    return (
        <View style={styles.scaffold}>
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 16}}>
                <Text style={{marginTop: 10}}>Nama Lengkap</Text>
                <Input control={control} name="nama_lengkap" defaultValue="" placeholder="Masukan Nama Lengkap" rules={{ required: "Harus di isi!" }}/>
                {errors.nama_lengkap && <Text style={styles.validationText}>{errors.nama_lengkap.message}</Text>}
                <Text style={{marginTop: 10}}>Username</Text>
                <Input control={control} name="username" defaultValue="" placeholder="Masukan Username" rules={{ required: "Harus di isi!" }}/>
                {errors.username && <Text style={styles.validationText}>{errors.username.message}</Text>}
                <Text style={{marginTop: 10}}>Password</Text>
                <Input control={control} name="password" defaultValue="" placeholder="Minimal 8 karakter" rules={{ required: "Harus di isi!", minLength: {value: 8, message: 'Minimal 8 karakter'} }} isPassword={true}/>
                {errors.password && <Text style={styles.validationText}>{errors.password.message}</Text>}
                <Text style={{marginTop: 10}}>Ulangi Password</Text>
                <Input control={control} name="confirm_password" defaultValue="" placeholder="Ulangi Password" rules={{ required: "Harus di isi!", minLength: {value: 8, message: 'Minimal 8 karakter'} }} isPassword={true}/>
                {errors.confirm_password && <Text style={styles.validationText}>{errors.confirm_password.message}</Text>}
                <Button text="Daftar" style={{marginTop: 35}} onPress={handleSubmit(doRegister)}/>
            </ScrollView>
        </View>
    );
}