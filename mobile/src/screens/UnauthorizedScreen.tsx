import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS, FONTS, theme } from '../theme/theme';

export const UnauthorizedScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[FONTS.secondaryHeader, styles.titleText]}>
        Welcome to Budgie! 👋
      </Text>
      <Image
        style={styles.image}
        source={require('../assets/images/onboarding.png')}
      />
      <View style={styles.buttonContainer}>
        <Button
          focusable
          onPress={() => navigation.navigate('SignUp')}
          mode="contained"
          theme={altTheme}
          style={styles.button1}
          labelStyle={[FONTS.bigger, styles.buttonText1]}>
          Create an account
        </Button>
        <Button
          focusable
          onPress={() => navigation.navigate('SignIn')}
          mode="outlined"
          theme={altTheme}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button1: {
    borderRadius: 35,
    marginBottom: 10,
  },
  button2: {
    borderWidth: 1,
    borderRadius: 35,
    borderColor: COLORS.secondary,
  },
  buttonText1: {
    color: theme.colors.background,
  },
  buttonText2: {
    color: COLORS.secondary,
  },
  image: {
    alignSelf: 'center',
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});

const altTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS.secondary,
  },
};
