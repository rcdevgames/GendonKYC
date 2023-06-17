import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({text, color = '#1f69ff', textColor = '#FFF', onPress, style = {}, disabled=false}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} disabled={disabled}>
      <View style={{...style, ...styles.container, backgroundColor: disabled ? "#dedede" : color}}>
        <Text style={{...styles.text, color: textColor}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

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
