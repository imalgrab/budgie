import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  DefaultTheme,
  HelperText,
  TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { COLORS, FONTS, SIZES, STYLES } from '../theme/theme';

export const SignInScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const status = useSelector((state: BudgieState) => state.status);
  const error = useSelector((state: BudgieState) => state.error);
  const [showPassword, setShowPassword] = useState(false);

  if (status === 'loading') {
    return (
      <SafeAreaView style={STYLES.centered}>
        <ActivityIndicator animating color={COLORS.secondary} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            const { email, password } = values;
            dispatch(login(email, password));
          }}>
          {({
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <View style={styles.formWrapper}>
              <HelperText type="error" visible={error !== null}>
                {error}
              </HelperText>
              <TextInput
                autoFocus
                keyboardType="email-address"
                left={
                  <TextInput.Icon color={COLORS.text2} name="account-outline" />
                }
                right={
                  <TextInput.Icon
                    name="close"
                    color={COLORS.text2}
                    size={SIZES.normal}
                    disabled={values.email.length === 0}
                    onPress={() => setFieldValue('email', '')}
                  />
                }
                style={styles.input}
                theme={theme}
                value={values.email}
                label="E-mail"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
              />
              <HelperText type="error">
                {touched.email && errors.email}
              </HelperText>
              <TextInput
                secureTextEntry={!showPassword}
                left={
                  <TextInput.Icon color={COLORS.text2} name="lock-outline" />
                }
                right={
                  <TextInput.Icon
                    animated
                    color={COLORS.text2}
                    name={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
                theme={theme}
                value={values.password}
                label="Password"
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
              />
              <HelperText type="error">
                {touched.password && errors.password}
              </HelperText>
              <Button
                onPress={handleSubmit}
                mode="outlined"
                style={styles.button}
                labelStyle={[FONTS.bigger, styles.buttonText]}>
                Log in
              </Button>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    marginTop: 100,
    padding: 10,
  },
  input: {
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  button: {
    margin: 20,
    alignSelf: 'center',
    borderRadius: 35,
    width: '50%',
    borderColor: COLORS.secondary,
    borderWidth: 1,
  },
  buttonText: {
    color: COLORS.secondary,
  },
});

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('This is not a valid e-mail address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(1024, 'You can not go any longer :)')
    .required('Password is required'),
});

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.secondary,
  },
};