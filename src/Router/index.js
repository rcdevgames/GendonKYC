import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CameraPage,HomePage,ResultPage,VerifyFormPage,LoginPage,RegisterPage} from '../Pages';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1f69ff'
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
            initialRouteName="LoginPage"
        >
            <Stack.Screen 
                name="LoginPage"
                component={LoginPage}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="RegisterPage"
                component={RegisterPage}
            />
            <Stack.Screen 
                name="HomePage"
                component={HomePage}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="VerifyFormPage"
                component={VerifyFormPage}
            />
            <Stack.Screen 
                name="CameraPage"
                component={CameraPage}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="ResultPage"
                component={ResultPage}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}