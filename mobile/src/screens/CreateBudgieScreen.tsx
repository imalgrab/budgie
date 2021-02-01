import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Chip,
  HelperText,
  IconButton,
  Surface,
  TextInput,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONTS, SIZES, STYLES, theme } from '../theme/theme';
import { createBudgie, editBudgie } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { selectBudgieById } from '../store/budgies/selectors';

export const CreateBudgieScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const token = useSelector((state: BudgieState) => state.userToken);
  const status = useSelector((state: BudgieState) => state.status);
  const id = route.params ? route.params.id : undefined;
  const budgie = id
    ? useSelector((state: BudgieState) => selectBudgieById(state, id))
    : undefined;

  const [modalVisible, setModalVisible] = useState(false);

  const currencies = ['PLN', 'USD', 'EUR', 'GBP', 'CHF'];
  const categories = [
    '🌍 Trip',
    '🏠 House',
    '👨‍❤️‍👨 Couple',
    '🎉 Party',
    '📏 Project',
    '📜 Other',
  ];

  const getCategoryName = (id: number | null): string => {
    if (id) {
      return categories[id];
    }
    return '';
  };

  const getCategoryId = (name: string | undefined): number | null => {
    if (name) {
      const index = categories.findIndex(category => category === name);
      if (index === -1) {
        return null;
      }
      return index;
    }
    return null;
  };

  const renderCurrencyPicker = (values: any, setFieldValue: any) =>
    Platform.OS === 'ios' ? (
      <SafeAreaView style={styles.container}>
        <Modal
          useNativeDriver
          useNativeDriverForBackdrop
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={styles.modal}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalInner}>
            <Picker
              itemStyle={FONTS.medium}
              selectedValue={values.currency}
              onValueChange={value =>
                setFieldValue('currency', value.toString())
              }>
              {currencies.map(currency => (
                <Picker.Item key={currency} value={currency} label={currency} />
              ))}
            </Picker>
            <Button
              focusable
              theme={altTheme}
              style={styles.pickerButton}
              labelStyle={FONTS.regular}
              onPress={() => setModalVisible(false)}>
              OK
            </Button>
          </View>
        </Modal>
        <Button
          focusable
          theme={altTheme}
          labelStyle={FONTS.h4}
          onPress={() => setModalVisible(true)}>
          {values.currency}
        </Button>
      </SafeAreaView>
    ) : (
      <Picker
        mode="dialog"
        style={FONTS.header}
        selectedValue={values.currency}
        onValueChange={value => setFieldValue('currency', value.toString())}>
        {currencies.map(currency => (
          <Picker.Item key={currency} value={currency} label={currency} />
        ))}
      </Picker>
    );

  const onClose = () => navigation.goBack();

  if (status === 'loading') {
    return (
      <View style={STYLES.centered}>
        <ActivityIndicator
          focusable
          size="large"
          animating={true}
          color={COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={
            budgie
              ? {
                  title: budgie.title,
                  description: budgie.description,
                  category: getCategoryId(budgie.category),
                  currency: budgie.currency,
                  members: budgie.members,
                  username: '',
                }
              : {
                  title: '',
                  description: '',
                  category: null,
                  currency: 'PLN',
                  members: [],
                  username: '',
                }
          }
          validationSchema={CreateBudgieSchema}
          onSubmit={async values => {
            console.log(values.category);
            console.log(getCategoryName(values.category));
            if (budgie) {
              await dispatch(
                editBudgie(
                  token || '',
                  budgie._id,
                  values.title,
                  values.currency,
                  values.members,
                  values.description,
                  getCategoryName(values.category),
                ),
              );
            } else {
              await dispatch(
                createBudgie(
                  token || '',
                  values.title,
                  values.currency,
                  values.members,
                  values.description,
                  getCategoryName(values.category),
                ),
              );
            }
            navigation.goBack();
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
            <>
              <Appbar.Header focusable>
                <Appbar.Action icon="close" onPress={onClose} />
                <Appbar.Content
                  focusable
                  title={`${budgie ? 'Edit budgie' : 'Add a new budgie'}`}
                  titleStyle={FONTS.h4}
                />
                <Appbar.Action
                  disabled={[values.title, values.members].some(
                    x => x.length === 0,
                  )}
                  icon="plus-circle-outline"
                  onPress={() => handleSubmit()}
                />
              </Appbar.Header>

              <ScrollView contentContainerStyle={styles.content}>
                <TextInput
                  showSoftInputOnFocus
                  focusable
                  theme={altTheme}
                  style={styles.input}
                  label="Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                />
                <HelperText type="error">
                  {touched.title && errors.title}
                </HelperText>
                <TextInput
                  showSoftInputOnFocus
                  focusable
                  theme={altTheme}
                  style={styles.input}
                  label="Description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
                <View style={styles.chips}>
                  {categories.map((cat, i) => (
                    <Chip
                      focusable
                      textStyle={FONTS.normal}
                      key={i}
                      style={styles.chip}
                      selected={
                        values.category !== null && values.category === i
                      }
                      onPress={() =>
                        setFieldValue(
                          'category',
                          values.category === i ? null : i,
                        )
                      }>
                      {cat}
                    </Chip>
                  ))}
                </View>
                <Text style={[FONTS.small]}>Currency:</Text>
                <Surface focusable style={styles.surface}>
                  {renderCurrencyPicker(values, setFieldValue)}
                </Surface>
                <Text style={[FONTS.small]}>
                  Participants ({values.members.length} / 5)
                </Text>
                <Surface focusable style={styles.surface}>
                  {values.members.map((member, i) => (
                    <View
                      style={[styles.username, styles.usernameContainer]}
                      key={i}>
                      <Text
                        style={[FONTS.normal, { flex: 1, flexWrap: 'wrap' }]}>
                        {member}
                      </Text>
                      <IconButton
                        icon="close"
                        size={SIZES.small}
                        onPress={() =>
                          setFieldValue(
                            'members',
                            values.members.filter((_, j) => i !== j),
                          )
                        }
                      />
                    </View>
                  ))}

                  <View style={styles.addUsers}>
                    <View style={{ flex: 3 }}>
                      <TextInput
                        showSoftInputOnFocus
                        focusable
                        theme={altTheme}
                        style={styles.innerInput}
                        label={
                          values.members.length === 0
                            ? 'My name'
                            : 'Other participant'
                        }
                        value={values.username}
                        onBlur={handleBlur('username')}
                        onChangeText={handleChange('username')}
                      />
                      <HelperText type="error">
                        {touched.username && errors.members}
                      </HelperText>
                    </View>
                    <Button
                      focusable
                      theme={altTheme}
                      labelStyle={FONTS.h4}
                      style={styles.addButton}
                      disabled={
                        values.username.length === 0 ||
                        values.members.includes(values.username)
                      }
                      onPress={() => {
                        setFieldValue('members', [
                          ...values.members,
                          values.username,
                        ]);
                        setFieldValue('username', '');
                      }}>
                      ADD
                    </Button>
                  </View>
                </Surface>
              </ScrollView>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  innerInput: {
    flex: 5,
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  addButton: {
    flex: 1,
  },
  chips: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
  chip: {
    backgroundColor: COLORS.white,
    marginHorizontal: 5,
    marginVertical: 7,
  },
  surface: {
    flex: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
  },
  addUsers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    margin: 10,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalInner: {
    paddingBottom: 10,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  pickerButton: {
    width: '50%',
    alignSelf: 'center',
    borderRadius: 15,
  },
});

const altTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS.secondary,
  },
};

const CreateBudgieSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  members: Yup.array().of(Yup.string()).min(1, 'Username is required'),
});
