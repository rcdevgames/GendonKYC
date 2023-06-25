import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ButtonOutline = ({text, color = '#1f69ff', textColor = '#1f69ff', onPress, style = {}, disabled=false}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} disabled={disabled}>
      <View style={{...style, ...styles.container, backgroundColor: disabled ? "#dedede" : "#FFF", borderColor: disabled ? "#dedede" : color, borderWidth: 1}}>
        <Text style={{...styles.text, color: textColor}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonOutline;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
