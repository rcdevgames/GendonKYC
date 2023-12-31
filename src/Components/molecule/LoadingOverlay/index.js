import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {entity} from 'simpler-state';

const loading = entity(false);

const setLoading = (val = false) => {
  loading.set(val);
}

const LoadingOverlay = () => {
  const isLoading = loading.use();
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={'#1f69ff'} />
          <Text style={styles.textLoading}>Loading ...</Text>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    container: {
      padding: 35,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    textLoading: {
      color: '#1f69ff',
      marginTop: 5,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  

export {
  LoadingOverlay,
  setLoading
}
