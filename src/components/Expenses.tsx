import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { getBudgieExpenses } from '../store/budgies/selectors';
import { SIZES } from '../theme/theme';
import { ExpenseType } from '../types';
import { Expense } from './Expense';

interface Props {
  id: number;
  currency: string;
}

export const Expenses = ({ id, currency }: Props) => {
  const expenses = useSelector((state: BudgieState) =>
    getBudgieExpenses(state, id),
  );

  return (
    <ScrollView style={styles.container}>
      {expenses &&
        expenses.map((expense: ExpenseType, i: number) => (
          <View key={i}>
            <Expense
              title={expense.title}
              payedBy={expense.paidBy}
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
