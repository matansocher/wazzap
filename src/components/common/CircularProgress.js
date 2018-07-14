import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const CircularProgress = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator
        size="large"
        color="#C9CACA"
        style={{ alignItems: 'center', justifyContent: 'center' }} />
    </View>
  )
}

export default CircularProgress;