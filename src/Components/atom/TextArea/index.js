import React from 'react';
import { TextInput } from 'react-native';
import { useController } from "react-hook-form";

const TextArea = ({control, name, placeholder="", rules={}, defaultValue=""}) => {
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
        ref={ref}
        numberOfLines={5}
        textAlignVertical='top'
        multiline={true}
        style={{
            borderRadius: 15,
            backgroundColor: '#e9f0ff',
            paddingHorizontal: 15,
            marginTop: 5,
            color: 'black'
        }}
    />;
}

export default TextArea;

