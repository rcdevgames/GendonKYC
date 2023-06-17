import React from 'react';
import { TextInput } from 'react-native';
import { useController } from "react-hook-form";

const Input = ({control, name, placeholder="", rules={}, defaultValue="", keyboardType="default", readonly=false, isPassword=false, onSubmitEditing=null}) => {
    const {
        field: { ref, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields }
    } = useController({
        name,
        control,
        rules,
        defaultValue,
    });
    return <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999999"
        onBlur={inputProps.onBlur}
        onChangeText={inputProps.onChange}
        value={inputProps.value}
        editable={!readonly}
        secureTextEntry={isPassword}
        ref={ref} 
        style={{
            borderRadius: 15,
            backgroundColor: '#e9f0ff',
            paddingHorizontal: 15,
            height: 42,
            marginTop: 5,
            color: 'black'
        }}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
    />;
}

export default Input;

