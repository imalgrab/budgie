import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ExpenseType } from '../../types';
import { Expense } from './Expense';

const width = Dimensions.get('window').width;

interface Props {
  history: ExpenseType[];
  members: string[];
  currency: string;
}

export const Expenses = ({ history, members, currency }: Props) => {
  return (
    <View style={styles.container}>
      {history.map((expense: ExpenseType, i: number) => (
        <Expense
          key={i}
          title={expense.title}
          payedBy={expense.payedBy}
          amount={expense.amount}
          date={expense.date}
          currency={currency}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    width: width,
  },
});
