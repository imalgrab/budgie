import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, DefaultTheme } from 'react-native-paper';
import { COLORS, FONTS } from '../theme/theme';

export const UnauthorizedScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[FONTS.h1, styles.titleText]}>👋 Welcome to Budgie!</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('SignUp')}
          mode="contained"
          theme={theme}
          style={styles.button1}
          labelStyle={[FONTS.bigger, styles.buttonText1]}>
          Create an account
        </Button>
        <Button
          onPress={() => navigation.navigate('SignIn')}
          mode="outlined"
          theme={theme}
          style={styles.button2}
          labelStyle={[FONTS.bigger, styles.buttonText2]}>
          Log in
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: COLORS.background,
  },
  titleText: {
    textAlign: 'center',
    color: COLORS.secondary,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button1: {
    borderRadius: 35,
    marginVertical: 10,
  },
  button2: {
    borderWidth: 1,
    borderRadius: 35,
    marginVertical: 10,
    borderColor: COLORS.secondary,
  },
  buttonText1: {
    color: COLORS.white,
  },
  buttonText2: {
    color: COLORS.secondary,
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.secondary,
    background: COLORS.background,
  },
};
