import moment from 'moment';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SortingCategory } from '../utils/types';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById } from '../store/budgies/selectors';
import { FONTS, SIZES, STYLES } from '../theme/theme';
import { MemberType } from '../utils/types';
import { Expense } from './Expense';

interface Props {
  sortBy: SortingCategory;
  descending: boolean;
  budgieId: string;
  currency: string;
  members: MemberType[];
}

export const Expenses = ({
  sortBy,
  descending,
  budgieId,
  currency,
  members,
}: Props) => {
  const expenses = useSelector(
    (state: BudgieState) => selectBudgieById(state, budgieId)?.expenses,
  );

  if (expenses) {
    let sortedExpenses;
    switch (sortBy) {
      case 'title':
        sortedExpenses = expenses.sort((a, b) =>
          descending
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title),
        );
        break;
      case 'amount':
        sortedExpenses = expenses.sort((a, b) =>
          descending ? b.amount - a.amount : a.amount - b.amount,
        );
        break;
      case 'date':
        sortedExpenses = expenses.sort((a, b) =>
          descending
            ? moment(b.date).diff(new Date()) - moment(a.date).diff(new Date())
            : moment(a.date).diff(new Date()) - moment(b.date).diff(new Date()),
        );
        break;
      case 'category':
        // sortedExpenses = expenses.sort((a, b) =>
        //   descending
        //     ? b.category.localeCompare(a.category || '')
        //     : a.category?.localeCompare(b.category),
        // );
        sortedExpenses = expenses;
        break;

      default:
        sortedExpenses = expenses;
        break;
    }

    return (
      <ScrollView style={styles.container}>
        {sortedExpenses.map(expense => (
          <View key={expense._id}>
            <Expense
              expenseId={expense._id}
              budgieId={budgieId}
              currency={currency}
              members={members}
            />
            <Divider focusable />
          </View>
        ))}
      </ScrollView>
    );
  }
  return (
    <SafeAreaView style={STYLES.centered}>
      <Text style={FONTS.h3}>Expenses not found</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
  },
});
