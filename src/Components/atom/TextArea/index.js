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
        onBlur={inputProps.onBlur}
        onChangeText={inputProps.onChange}
        value={inputProps.value}
        ref={ref}
        numberOfLines={5}
        textAlignVertical='top'
        multiline={true}
        style={{
            // flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            // borderColor: 'grey',
            // backgroundColor: '#DEDEDE',
            paddingHorizontal: 15,
            color: 'black'
        }}
    />;
}

export default TextArea;

