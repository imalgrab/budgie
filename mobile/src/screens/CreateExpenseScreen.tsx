import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pl';
import { Formik } from 'formik';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Checkbox,
  IconButton,
  RadioButton,
  Surface,
  Switch,
  TextInput,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONTS, SIZES, STYLES, theme } from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense, editExpense } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  CreateExpenseRouteProp,
  CreateExpenseScreenNavigationProp,
} from '../utils/types';
import {
  selectBudgieById,
  selectStatus,
  selectToken,
} from '../store/budgies/selectors';

interface Props {
  navigation: CreateExpenseScreenNavigationProp;
  route: CreateExpenseRouteProp;
}

interface FormValues {
  income: boolean;
  title: string;
  amount: string;
  currency: string;
  date: Date;
  paidBy: string;
  paidFor: string[];
  category?: string;
}

export const CreateExpenseScreen = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const { budgieId, members, currency } = route.params;
  const expenseId = route.params.expenseId;
  const expense =
    expenseId &&
    useSelector((state: BudgieState) =>
      selectBudgieById(state, budgieId),
    )?.expenses.find(expense => expense._id === expenseId);
  const token = useSelector(selectToken);
  const status = useSelector(selectStatus);
  const [dateVisible, setDateVisible] = useState(false);

  const onCancel = () => navigation.goBack();

  const handleCheckboxCheck = (
    member: string,
    values: FormValues,
    setFieldValue: any,
  ) =>
    setFieldValue(
      'paidFor',
      values.paidFor.length !== 1 || !values.paidFor.includes(member)
        ? values.paidFor.includes(member)
          ? values.paidFor.filter(name => member !== name)
          : [...values.paidFor, member]
        : values.paidFor,
    );

  const initialValues: FormValues = expense
    ? {
        income: expense.isIncome || false,
        title: expense.title,
        amount: expense.amount.toString(),
        currency,
        date: expense.date,
        paidBy: expense.paidBy,
        paidFor: expense.paidFor,
        category: expense.category,
      }
    : {
        income: false,
        title: '',
        amount: '',
        currency,
        date: new Date(),
        paidBy: members[0],
        paidFor: members,
        category: '',
      };

  if (status === 'loading') {
    return (
      <SafeAreaView style={STYLES.centered}>
        <ActivityIndicator color={COLORS.secondary} size="large" focusable />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={STYLES.flex1}>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          expense
            ? await dispatch(
                editExpense(
                  token || '',
                  budgieId,
                  expense._id,
                  values.title,
                  parseInt(values.amount),
                  values.date,
                  values.paidBy,
                  values.paidFor,
                  values.income,
                  values.category,
                ),
              )
            : await dispatch(
                createExpense(
                  token || '',
                  budgieId,
                  values.title,
                  parseInt(values.amount),
                  values.date,
                  values.paidBy,
                  values.paidFor,
                  values.income,
                  values.category,
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
            {console.log(values.category)}
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
            <ScrollView
              scrollEnabled={false}
              contentContainerStyle={styles.content}>
              <View style={STYLES.rowSpaceBetween}>
                <Surface
                  focusable
                  style={[styles.surface, styles.smallSurface]}>
                  <Text style={[FONTS.normal, styles.incomeText]}>Income?</Text>
                  <Switch
                    focusable
                    style={{ marginVertical: 9 }}
                    value={values.income}
                    onValueChange={() =>
                      setFieldValue('income', !values.income)
                    }
                  />
                </Surface>
                <Surface focusable style={styles.surface}>
                  {values.category ? (
                    <Button
                      focusable
                      labelStyle={FONTS.h4}
                      mode="text"
                      onPress={() =>
                        navigation.navigate('ExpenseCategory', {
                          setCategory: setFieldValue,
                        })
                      }>
                      {values.category.split(' ')[0]}
                    </Button>
                  ) : (
                    <IconButton
                      icon="tag"
                      color={COLORS.text2}
                      size={SIZES.h3}
                      onPress={() =>
                        navigation.navigate('ExpenseCategory', {
                          setCategory: setFieldValue,
                        })
                      }
                    />
                  )}
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
                <Text style={[FONTS.small, styles.description]}>Paid by:</Text>
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
                <Text style={[FONTS.small, styles.description]}>Paid for:</Text>
                {members.map((member: string) => (
                  <TouchableOpacity
                    key={member}
                    style={STYLES.rowAlignCenter}
                    onPress={() =>
                      handleCheckboxCheck(member, values, setFieldValue)
                    }>
                    <Checkbox
                      status={
                        values.paidFor.includes(member)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxCheck(member, values, setFieldValue)
                      }
                    />
                    <Text style={FONTS.bigger}>{member}</Text>
                  </TouchableOpacity>
                ))}
              </Surface>
            </ScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
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
