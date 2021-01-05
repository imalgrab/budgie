import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

export const BottomPanel = () => {
  return (
    <View style={styles.container}>
      <ScrollView />
      <View style={styles.panel}>
          <Text>Hello World</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  panel: {
    backgroundColor: 'green',
    height: 50,
  },
});
