import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { getBudgieById } from '../store/budgies/selectors';
import { COLORS } from '../theme/theme';

interface Props {
  budgieId: number;
}

export const Budgie = ({ budgieId }: Props) => {
  const navigation = useNavigation();
  const budgie = useSelector((state: BudgieState) =>
    getBudgieById(state, budgieId),
  );
  const onItemPress = () =>
    navigation.navigate('BudgieDetails', { id: budgieId });

  if (budgie) {
    return (
      <View key={budgie.id}>
        <List.Item
          style={styles.container}
          onPress={onItemPress}
          title={budgie.title}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <Divider />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
});
