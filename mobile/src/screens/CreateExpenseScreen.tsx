import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  DatePickerIOSBase,
  DatePickerAndroid,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pl';
import { Formik } from 'formik';
import {
  Appbar,
  Button,
  Checkbox,
  DefaultTheme,
  IconButton,
  RadioButton,
  Surface,
  Switch,
  TextInput,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONTS, SIZES, STYLES, theme } from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const CreateExpenseScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const token = useSelector((state: BudgieState) => state.userToken);
  const { id, currency, members } = route.params;

  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [forWhom, setForWhom] = useState(members);

  const onCancel = () => navigation.goBack();

  const handleCheckboxCheck = (member: string) =>
    setForWhom((prevForWhom: string[]) =>
      prevForWhom.length !== 1 || !prevForWhom.includes(member)
        ? prevForWhom.includes(member)
          ? prevForWhom.filter((x: string) => x !== member)
          : [...prevForWhom, member]
        : prevForWhom,
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={STYLES.flex1}>
        <Formik
          initialValues={{
            income: false,
            title: '',
            amount: '',
            currency: currency,
            date: new Date(),
            paidBy: members[0],
            forWhom: members,
          }}
          onSubmit={values => {
            dispatch(
              createExpense(
                token || '',
                id,
                values.title,
                parseInt(values.amount),
                date,
                values.paidBy,
                forWhom,
              ),
            );
            navigation.goBack();
          }}>
          {({
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => (
            <>
              <Appbar.Header focusable style={styles.header}>
                <Appbar.Action icon="close" onPress={onCancel} />
                <Appbar.Content
                  focusable
                  title="New expense"
                  titleStyle={[FONTS.h4, styles.headerTitle]}
                />
                <Appbar.Action
                  icon="check"
                  onPress={() => handleSubmit()}
                  disabled={values.title === '' || values.amount === ''}
                />
              </Appbar.Header>
              <View style={styles.content}>
                <View style={STYLES.rowSpaceBetween}>
                  <Surface
                    focusable
                    style={[styles.surface, styles.smallSurface]}>
                    <Text style={[FONTS.normal, styles.incomeText]}>
                      Income?
                    </Text>
                    <Switch
                      focusable
                      style={{ margin: 5 }}
                      value={values.income}
                      onValueChange={() =>
                        setFieldValue('income', !values.income)
                      }
                    />
                  </Surface>
                  <Surface focusable style={styles.surface}>
                    <IconButton
                      icon="tag"
                      color={COLORS.text2}
                      size={SIZES.h3}
                      onPress={() => console.log('xD')}
                    />
                  </Surface>
                </View>
                <TextInput
                  showSoftInputOnFocus
                  focusable
                  style={styles.input}
                  theme={altTheme}
                  value={values.title}
                  label="Title"
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                />
                <TextInput
                  showSoftInputOnFocus
                  focusable
                  keyboardType="number-pad"
                  style={styles.input}
                  theme={altTheme}
                  value={values.amount}
                  label="Amount"
                  onBlur={handleBlur('amount')}
                  onChangeText={handleChange('amount')}
                />

                <Button
                  focusable
                  icon={dateVisible ? 'chevron-up' : 'chevron-down'}
                  labelStyle={[FONTS.bigger, { color: COLORS.black }]}
                  style={styles.dateButton}
                  mode="contained"
                  theme={altTheme}
                  onPress={() =>
                    setDateVisible(Platform.OS === 'ios' ? !dateVisible : true)
                  }>
                  {moment(values.date).format('DD.MM.yyyy')}
                </Button>

                {dateVisible && (
                  <DateTimePicker
                    display="spinner"
                    value={values.date}
                    onChange={(_, d) => {
                      setDateVisible(Platform.OS === 'ios');
                      if (d !== undefined) {
                        setFieldValue('date', d);
                      }
                    }}
                  />
                )}

                <Surface focusable style={styles.surface}>
                  <Text style={[FONTS.small, styles.description]}>
                    Paid by:
                  </Text>
                  {members.map((member: string) => (
                    <TouchableOpacity
                      onPress={() => setFieldValue('paidBy', member)}
                      key={member}
                      style={STYLES.rowAlignCenter}>
                      <RadioButton
                        value={values.paidBy}
                        status={
                          member === values.paidBy ? 'checked' : 'unchecked'
                        }
                        onPress={() => setFieldValue('paidBy', member)}
                      />
                      <Text style={FONTS.bigger}>{member}</Text>
                    </TouchableOpacity>
                  ))}
                </Surface>

                <Surface focusable style={styles.surface}>
                  <Text style={[FONTS.small, styles.description]}>
                    For whom:
                  </Text>
                  {members.map((member: string) => (
                    <TouchableOpacity
                      key={member}
                      style={STYLES.rowAlignCenter}
                      onPress={() => handleCheckboxCheck(member)}>
                      <Checkbox
                        status={
                          forWhom.includes(member) ? 'checked' : 'unchecked'
                        }
                        onPress={() => handleCheckboxCheck(member)}
                      />
                      <Text style={FONTS.bigger}>{member}</Text>
                    </TouchableOpacity>
                  ))}
                </Surface>
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  surface: {
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
  },
  smallSurface: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerText: {},
  description: {
    color: COLORS.text2,
  },
  input: {
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  dateButton: {
    margin: 15,
    // paddingVertical: 5,
  },

  modalInner: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    // backgroundColor: COLORS.white,
  },
  modalText: {
    paddingVertical: 20,
    width: '75%',
    textAlign: 'center',
  },
  incomeText: {
    color: COLORS.text,
    marginRight: 10,
  },
});

const altTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS.secondary,
  },
};
