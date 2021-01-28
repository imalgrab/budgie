import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
import { COLORS, FONTS, SIZES } from '../theme/theme';
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
    dispatch(createExpense(id, title, parseInt(amount), date, paidBy, forWhom));
    navigation.goBack();
  };

  const handleCheckboxCheck = (member: string) =>
    setForWhom((prevForWhom: string[]) =>
      prevForWhom.length !== 1 || !prevForWhom.includes(member)
        ? prevForWhom.includes(member)
          ? prevForWhom.filter((x: string) => x !== member)
          : [...prevForWhom, member]
        : prevForWhom,
    );

  const datePicker = dateVisible && (
    <DateTimePicker
      testID="calendarIOS"
      display="spinner"
      date={date}
      minimumDate={new Date(2019, 0, 1)}
      maximumDate={new Date()}
      value={date}
      onChange={(_, date) => {
        if (date) {
          setDate(date);
        }
      }}
      onTouchCancel={() => setDateVisible(false)}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="close" onPress={onCancel} />
          <Appbar.Content
            title="New expense"
            titleStyle={[FONTS.h4, styles.headerTitle]}
          />
          <Appbar.Action
            icon="check"
            onPress={onSave}
            disabled={title === ''}
          />
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
            <View style={styles.upper}>
              <Surface
                style={[
                  styles.surface,
                  {
                    width: '50%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}>
                <Text
                  style={[
                    FONTS.normal,
                    {
                      color: isIncome ? COLORS.text : COLORS.text2,
                      marginRight: 10,
                    },
                  ]}>
                  Income?
                </Text>
                <Switch
                  style={{ margin: 5 }}
                  value={isIncome}
                  onValueChange={setIsIncome}
                />
              </Surface>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
              <Surface style={styles.surface}>
                <IconButton
                  icon="tag"
                  color={COLORS.text2}
                  size={SIZES.h3}
                  onPress={() => console.log('xD')}
                />
              </Surface>
            </View>
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
              icon={dateVisible ? 'chevron-up' : 'chevron-down'}
              labelStyle={[FONTS.bigger, { color: COLORS.black }]}
              style={styles.dateButton}
              mode="contained"
              theme={theme}
              onPress={() => setDateVisible(!dateVisible)}>
              {moment(date).format('DD.MM.yyyy')}
            </Button>
            {datePicker}
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
                <TouchableWithoutFeedback
                  onPress={() => handleCheckboxCheck(member)}
                  key={member}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Checkbox
                      status={
                        forWhom.includes(member) ? 'checked' : 'unchecked'
                      }
                      onPress={() => handleCheckboxCheck(member)}
                    />
                    <Text style={FONTS.normal}>{member}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </Surface>
          </View>
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    marginVertical: 20,
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
  dateButton: {
    margin: 15,
    // paddingVertical: 5,
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    flex: 1,
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
});

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.secondary,
  },
};
