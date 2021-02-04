import moment from 'moment';
import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById, selectUserId } from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES, theme } from '../theme/theme';
import {
  ExpenseDetailsScreenRouteProp,
  ExpenseDetailsScreenNavigationProp,
} from '../utils/types';

interface Props {
  navigation: ExpenseDetailsScreenNavigationProp;
  route: ExpenseDetailsScreenRouteProp;
}

export const ExpenseDetailsScreen = ({ navigation, route }: Props) => {
  const { expenseId, budgieId, currency, members } = route.params;

  const userId = useSelector(selectUserId);
  const currentUser = members.find(member => member.userId === userId);

  const expense = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId)?.expenses.find(
      expense => expense._id === expenseId,
    ),
  );

  if (!expense || !currentUser) {
    return (
      <SafeAreaView>
        <Text>Expense not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header focusable>
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
      <View>
        <View style={styles.detailsContainer}>
          <Text style={[FONTS.h4, styles.category]}>
            {expense.category || 'No category'}
          </Text>
          <View style={styles.detailsUpper}>
            <Text style={FONTS.h4}>
              Paid by {expense.paidBy}
              {currentUser.name === expense.paidBy ? ' (me)' : ''}
            </Text>
            <Text style={FONTS.h4}>
              {moment(expense.date).format('DD.MM.YYYY')}
            </Text>
          </View>
          <Text style={[FONTS.bolder, styles.detailsText]}>
            {`Paid for ${expense.paidFor.length} ${
              expense.paidFor.length > 1 ? 'members' : 'member'
            }:`}
          </Text>
          <View style={styles.paidForContainer}>
            {members
              .filter(member => expense.paidFor.includes(member.name))
              .map(member => (
                <View key={member.name}>
                  <View style={styles.paidFor}>
                    <Text style={[FONTS.bigger, { color: COLORS.text2 }]}>
                      {member.name}{' '}
                      {member.name === currentUser.name ? ' (me)' : ''}
                    </Text>
                    <Text style={[FONTS.bigger, { color: COLORS.text2 }]}>
                      {expense.amount / expense.paidFor.length} {currency}
                    </Text>
                  </View>
                  <Divider focusable />
                </View>
              ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: COLORS.background,
    paddingTop: 20,
  },
  detailsUpper: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paidForContainer: {
    backgroundColor: COLORS.white,
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
  },
  paidFor: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: COLORS.text,
  },
  category: {
    alignSelf: 'center',
    color: COLORS.text,
    paddingBottom: 15,
    fontFamily: 'Medium',
  },
});
