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
import { login } from '../store/budgies/actions';
import { selectError, selectStatus } from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES, STYLES, theme } from '../theme/theme';
import {
  SignInScreenNavigationProp,
  SignInScreenRouteProp,
} from '../utils/types';

interface Props {
  navigation: SignInScreenNavigationProp;
  route: SignInScreenRouteProp;
}

interface FormValues {
  email: string;
  password: string;
}

export const SignInScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: FormValues = { email: '', password: '' };

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
          initialValues={initialValues}
          validationSchema={SignInSchema}
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
              <HelperText
                style={FONTS.regular}
                type="error"
                visible={error !== null}>
                {error}
              </HelperText>
              <TextInput
                focusable
                showSoftInputOnFocus
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
                focusable
                showSoftInputOnFocus
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
  header: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    // color: COLORS.secondary,
  },
});

const altTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS.secondary,
  },
};

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('This is not a valid e-mail address')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(1024, 'You can not go any longer :)')
    .required('Password is required'),
});
