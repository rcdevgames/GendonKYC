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
        onBlur={inputProps.onBlur}
        onChangeText={inputProps.onChange}
        value={inputProps.value}
        editable={!readonly}
        secureTextEntry={isPassword}
        ref={ref} 
        style={{
            // flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            // borderColor: 'grey',
            // backgroundColor: '#DEDEDE',
            paddingHorizontal: 15,
            height: 42,
            marginTop: 2,
            color: 'black'
        }}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
    />;
}

export default Input;

