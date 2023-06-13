import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({text, color = '#EC563B', textColor = '#FFF', onPress, style = {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={{...style, ...styles.container, backgroundColor: color}}>
        <Text style={{...styles.text, color: textColor}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: color,
    padding: 8,
    // borderRadius: 8,
  },
  text: {
    fontSize: 14,
    // color: textColor,
    textAlign: 'center',
  },
});
