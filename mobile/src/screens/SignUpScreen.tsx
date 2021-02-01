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
  HelperText,
  TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { register } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { COLORS, FONTS, SIZES, STYLES, theme } from '../theme/theme';

export const SignUpScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const status = useSelector((state: BudgieState) => state.status);
  const error = useSelector((state: BudgieState) => state.error);
  const [showPassword, setShowPassword] = useState(false);

  if (status === 'loading') {
    return (
      <SafeAreaView style={STYLES.centered}>
        <ActivityIndicator
          focusable
          animating
          color={COLORS.secondary}
          size="large"
        />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header focusable style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={values => {
            const { email, username, password } = values;
            dispatch(register(email, username, password));
            navigation.navigate('SignUp');
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
              <HelperText
                type="error"
                visible={error !== null}
                style={FONTS.bigger}>
                {error}
              </HelperText>
              <TextInput
                showSoftInputOnFocus
                focusable
                autoFocus
                keyboardType="email-address"
                left={<TextInput.Icon color={COLORS.text2} name="at" />}
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
                theme={altTheme}
                value={values.email}
                label="E-mail"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
              />
              <HelperText type="error">
                {touched.email && errors.email}
              </HelperText>
              <TextInput
                showSoftInputOnFocus
                focusable
                left={
                  <TextInput.Icon color={COLORS.text2} name="account-outline" />
                }
                right={
                  <TextInput.Icon
                    name="close"
                    color={COLORS.text2}
                    size={SIZES.normal}
                    disabled={values.username.length === 0}
                    onPress={() => setFieldValue('username', '')}
                  />
                }
                style={styles.input}
                theme={altTheme}
                value={values.username}
                label="Username"
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
              />
              <HelperText type="error">
                {touched.username && errors.username}
              </HelperText>
              <TextInput
                showSoftInputOnFocus
                focusable
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
                theme={altTheme}
                value={values.password}
                label="Password"
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
              />
              <HelperText type="error">
                {touched.password && errors.password}
              </HelperText>
              <Button
                focusable
                theme={altTheme}
                onPress={handleSubmit}
                mode="outlined"
                style={styles.button}
                labelStyle={[FONTS.bigger, styles.buttonText]}>
                Register
              </Button>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  formWrapper: {
    flex: 1,
    marginTop: 0,
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

const altTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS.secondary,
  },
};

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('This is not a valid e-mail address')
    .required('E-mail is required'),
  username: Yup.string()
    .min(6, 'Username must be at least 6 characters')
    .max(55, 'Username must be between 6 and 55 characters long')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(1024, 'You can not go any longer :)')
    .required('Password is required'),
});
