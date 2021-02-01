import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../theme/theme';

export const AddCategoryScreen = ({ navigation }: any) => {
  return <SafeAreaView style={styles.container}>

  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: COLORS.background,
  }
});
