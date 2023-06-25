import React, { useEffect } from 'react';
import {Image, Text, View} from 'react-native';
import { LOGO } from '../Assets';
import styles from './style';
import {widthPercentageToDP as wp} from '../Utils/responsive'
import { useForm } from 'react-hook-form';
import { Button, Input, setLoading } from '../Components';
import ButtonOutline from '../Components/atom/ButtonOutline';
import { useToast } from 'react-native-toast-notifications';
import { login } from '../Provider';
import { getUser, saveUser } from '../Utils/session';

export default ({navigation}) => {
    const toast = useToast();
    const { control, handleSubmit, formState: { errors }} = useForm();

    useEffect(() => {
        checkLogin();
    }, [navigation]);

    const checkLogin = async () => {
        const user = await getUser();
        if (user !== null) navigation.navigate("HomePage");
    }

    const doLogin = async data => {
        setLoading(true);
        try {
            const loginData = await login(data);
            await saveUser({member_id: loginData.id, username: loginData.username});
            setLoading(false);
            navigation.replace("HomePage");
        } catch (error) {
            console.log(error);
            toast.show(error.toString());
            setLoading(false);
        }
    }

    return (
        <View style={styles.scaffold}>
            <View style={{marginTop: 25, marginLeft: 20}}>
                <Image source={LOGO} style={{width: wp(40)}} resizeMode="contain"/>
            </View>
            <Text style={{paddingHorizontal: 16}}>
                <Text></Text>Mari bergabung dengan 13.000+ Mitra</Text>
            <Text style={{paddingHorizontal: 16}}>Bangbeli yang tersebar di 11 Provinsi</Text>
            <Text style={{paddingHorizontal: 16}}>Indonesia.</Text>
            <View style={{flex: 1, paddingHorizontal: 16, justifyContent: 'center'}}>
                    <Text style={{marginTop: 10}}>Username</Text>
                    <Input control={control} name="username" defaultValue="" placeholder="Masukan Username" rules={{ required: "Harus di isi!" }}/>
                    {errors.username && <Text style={styles.validationText}>{errors.username.message}</Text>}
                    <Text style={{marginTop: 10}}>Password</Text>
                    <Input control={control} name="password" defaultValue="" placeholder="****" rules={{ required: "Harus di isi!" }} isPassword={true}/>
                    {errors.password && <Text style={styles.validationText}>{errors.password.message}</Text>}
            </View>
            <View>
                <Button text="Masuk" style={{margin: 16, marginBottom: 0}} onPress={handleSubmit(doLogin)}/>
                <ButtonOutline text="Daftar" style={{margin: 16}} onPress={() => navigation.navigate("RegisterPage")}/>
            </View>
        </View>
    );
}