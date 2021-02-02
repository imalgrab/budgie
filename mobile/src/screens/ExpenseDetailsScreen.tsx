import Constants from 'expo-constants';
import moment from 'moment';
import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById } from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES, theme } from '../theme/theme';
import {
  ExpenseDetailsRouteProp,
  ExpenseDetailsScreenNavigationProp,
} from '../utils/types';

interface Props {
  navigation: ExpenseDetailsScreenNavigationProp;
  route: ExpenseDetailsRouteProp;
}

export const ExpenseDetailsScreen = ({ navigation, route }: Props) => {
  const { expenseId, budgieId, currency, members } = route.params;

  const expense = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId)?.expenses.find(
      expense => expense._id === expenseId,
    ),
  );

  if (!expense) {
    return (
      <SafeAreaView>
        <Text>Expense not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header focusable style={styles.header}>
        <Appbar.BackAction
          size={SIZES.big}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          focusable
          title={expense.title}
          subtitle={`${expense.amount} ${currency}`}
          titleStyle={FONTS.h4}
          subtitleStyle={FONTS.h4}
        />
        <Appbar.Action
          size={SIZES.big}
          icon="pencil-outline"
          onPress={() =>
            navigation.navigate('CreateExpense', {
              expenseId,
              budgieId,
              currency,
              members,
            })
          }
        />
      </Appbar.Header>
      <View style={styles.content}>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsUpper}>
            <Text style={FONTS.h3}>Paid by {expense.paidBy}</Text>
            <Text style={FONTS.h3}>
              {moment(expense.date).format('DD.MM.YYYY')}
            </Text>
          </View>
          <Text
            style={[FONTS.h4, { paddingVertical: 10, color: COLORS.text2 }]}>
            {`Paid for ${expense.paidFor.length} ${
              expense.paidFor.length > 1 ? 'members' : 'member'
            }:`}
          </Text>
        </View>
        <View style={styles.paidForContainer}>
          {members
            .filter(name => expense.paidFor.includes(name))
            .map((name, i) => (
              <>
                <View key={i} style={styles.paidFor}>
                  <Text style={[FONTS.bigger, { color: COLORS.text2 }]}>
                    {name}
                  </Text>
                  <Text style={[FONTS.bigger, { color: COLORS.text2 }]}>
                    {expense.amount / expense.paidFor.length} {currency}
                  </Text>
                </View>
                <Divider focusable />
              </>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginVertical: 30,
  },
  header: {
    // elevation: 0,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  detailsUpper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paidForContainer: {
    paddingTop: 5,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: COLORS.white,
  },
  paidFor: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
