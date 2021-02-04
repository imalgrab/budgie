import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById } from '../store/budgies/selectors';
import { COLORS, FONTS } from '../theme/theme';
import { MemberType } from '../utils/types';

interface Props {
  userId: string;
  budgieId: string;
  currency: string;
  members: MemberType[];
}

export const BottomPanel = ({ userId, budgieId, currency, members }: Props) => {
  const navigation = useNavigation();
  const budgie = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId),
  );

  const currentUser = members.find(member => member.userId === userId);

  const onAddButtonPress = () =>
    navigation.navigate('CreateExpense', { budgieId, currency, members });

  if (budgie && currentUser) {
    const calculateMyAmount = () => {
      return budgie.expenses
        .filter(expense => expense.paidFor.includes(currentUser.name))
        .reduce((acc, curr) => acc + curr.amount / curr.paidFor.length, 0);
    };

    const calculateTotalAmount = () => {
      return budgie.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    };
    return (
      <View style={styles.container}>
        <ScrollView />
        <View style={styles.panel}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={FONTS.tiny}>MY TOTAL</Text>
            <Text style={FONTS.big}>
              {calculateMyAmount()} {currency}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={FONTS.tiny}>TOTAL MONEY</Text>
            <Text style={FONTS.big}>
              {calculateTotalAmount()} {currency}
            </Text>
          </View>
        </View>
        <FAB
          focusable
          icon="plus"
          style={styles.addButton}
          onPress={onAddButtonPress}
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: COLORS.shadow,
  },
  addButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 25,
  },
});
