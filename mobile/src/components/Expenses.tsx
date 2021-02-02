import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById } from '../store/budgies/selectors';
import { SIZES } from '../theme/theme';
import { Expense } from './Expense';

interface Props {
  budgieId: string;
  currency: string;
  members: string[];
}

export const Expenses = ({ budgieId, currency, members }: Props) => {
  const expensesIds = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId)?.expenses.map(expense => expense._id),
  );

  return (
    <ScrollView style={styles.container}>
      {expensesIds &&
        expensesIds.map(expenseId => (
          <View key={expenseId}>
            <Expense
              expenseId={expenseId}
              budgieId={budgieId}
              currency={currency}
              members={members}
            />
            <Divider focusable />
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
