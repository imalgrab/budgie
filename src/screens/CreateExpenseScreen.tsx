import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker';
import {
  Appbar,
  Card,
  Checkbox,
  RadioButton,
  TextInput,
  ToggleButton,
} from 'react-native-paper';

export const CreateExpenseScreen = ({ navigation, route }: any) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(route.params.currency);
  const [date, setDate] = useState(new Date());
  const [paidBy, setPaidBy] = useState(route.params.members[0]);
  const [forWhom, setForWhom] = useState(route.params.members);
  const onCancel = () => navigation.goBack();
  const onSave = () => navigation.goBack();
  const handleCheckboxCheck = (member: string) =>
    setForWhom((prevForWhom: string[]) =>
      prevForWhom.includes(member)
        ? prevForWhom.filter((x: string) => x !== member)
        : [...prevForWhom, member],
    );
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={onCancel} />
        <Appbar.Content title="New expense" titleStyle={styles.headerTitle} />
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
        <View>
          <TextInput
            value={title}
            placeholder="Title"
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            keyboardType="number-pad"
            value={amount}
            placeholder="Amount"
            onChangeText={text => setAmount(text)}
          />
          {/* <DatePicker
            date={date}
            onDateChange={newDate => setDate(newDate)}></DatePicker> */}
          <Card style={{ elevation: 4, marginVertical: 5 }}>
            <Text>Paid by:</Text>
            {route.params.members.map((member: any) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  key={member}
                  value={member}
                  status={member === paidBy ? 'checked' : 'unchecked'}
                  onPress={() => setPaidBy(member)}
                />
                <Text>{member}</Text>
              </View>
            ))}
          </Card>

          <Card style={{ elevation: 4, marginVertical: 5 }}>
            <Text>For whom:</Text>
            {route.params.members.map((member: any) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Checkbox
                  status={forWhom.includes(member) ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxCheck(member)}
                />
                <Text>{member}</Text>
              </View>
            ))}
          </Card>
        </View>
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  headerTitle: {
    alignSelf: 'center',
    fontSize: 18,
  },
  headerText: {
    fontSize: 12,
  },
});
