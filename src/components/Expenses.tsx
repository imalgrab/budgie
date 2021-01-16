import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { SIZES } from '../theme/theme';
import { ExpenseType } from '../types';
import { Expense } from './Expense';

interface Props {
  expenses: ExpenseType[];
  members: string[];
  currency: string;
}

export const Expenses = ({ expenses, members, currency }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {expenses.map((expense: ExpenseType, i: number) => (
        <View key={i}>
          <Expense
            key={i}
            title={expense.title}
            payedBy={expense.payedBy}
            amount={expense.amount}
            date={expense.date}
            currency={currency}
          />
          <Divider />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
  },
});
