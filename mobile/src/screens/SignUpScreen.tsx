import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { FONTS } from '../theme/theme';

export const SignUpScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={FONTS.h1}>Sign Up (rejestracja)</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
});
