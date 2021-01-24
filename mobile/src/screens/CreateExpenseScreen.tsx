import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import 'moment/locale/pl';
import { Formik } from 'formik';
import {
  Appbar,
  Button,
  Checkbox,
  DefaultTheme,
  RadioButton,
  Surface,
  Switch,
  TextInput,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONTS } from '../theme/theme';
import { useDispatch } from 'react-redux';
import { createExpense } from '../store/budgies/actions';

export const CreateExpenseScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { id, currency, members } = route.params;

  const [isIncome, setIsIncome] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateVisible, setDateVisible] = useState(false);
  const [paidBy, setPaidBy] = useState(route.params.members[0]);
  const [forWhom, setForWhom] = useState(route.params.members);

  const onCancel = () => navigation.goBack();

  const onSave = () => {
    console.log(id, title, amount, date, paidBy, forWhom);
    dispatch(createExpense(id, title, parseInt(amount), date, paidBy, forWhom));
    navigation.goBack();
  };

  const handleCheckboxCheck = (member: string) =>
    setForWhom((prevForWhom: string[]) =>
      prevForWhom.includes(member)
        ? prevForWhom.filter((x: string) => x !== member)
        : [...prevForWhom, member],
    );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="close" onPress={onCancel} />
        <Appbar.Content
          title="New expense"
          titleStyle={[FONTS.h4, styles.headerTitle]}
        />
        <Appbar.Action icon="check" onPress={onSave} disabled={title === ''} />
      </Appbar.Header>
      <Formik
        initialValues={{
          title: '',
          amount: '',
          currency: route.params.currency,
          date: new Date(),
          paidBy: route.params.members[0],
          forWhom: route.params.members,
        }}
        onSubmit={() => {}}>
        <View style={styles.content}>
          <Switch value={isIncome} onValueChange={setIsIncome} />
          <TextInput
            style={styles.input}
            theme={theme}
            value={title}
            label="Title"
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            theme={theme}
            value={amount}
            label="Amount"
            onChangeText={text => setAmount(text)}
          />
          <Button
            mode="contained"
            theme={theme}
            onPress={() => setDateVisible(true)}>
            {moment(date).format('DD.MM.yyyy')}
          </Button>
          {dateVisible && (
            <DateTimePicker
              testID="calendar"
              display="spinner"
              value={date}
              onChange={(event, date) => {
                setDateVisible(false);
                if (date) {
                  setDate(date);
                }
              }}
              onTouchCancel={() => setDateVisible(false)}
            />
          )}
          <Surface style={styles.surface}>
            <Text style={[FONTS.small, styles.description]}>Paid by:</Text>
            {route.params.members.map((member: any) => (
              <View
                key={member}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value={member}
                  status={member === paidBy ? 'checked' : 'unchecked'}
                  onPress={() => setPaidBy(member)}
                />
                <Text style={FONTS.normal}>{member}</Text>
              </View>
            ))}
          </Surface>

          <Surface style={styles.surface}>
            <Text style={[FONTS.small, styles.description]}>For whom:</Text>
            {route.params.members.map((member: any) => (
              <View
                key={member}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Checkbox
                  status={forWhom.includes(member) ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxCheck(member)}
                />
                <Text style={FONTS.normal}>{member}</Text>
              </View>
            ))}
          </Surface>
        </View>
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  surface: {
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
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
});

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.secondary,
  },
};
