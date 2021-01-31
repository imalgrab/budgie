import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { fetchBudgies } from '../store/budgies/actions';
import { BudgieType } from '../utils/types';
import { Budgie } from './Budgie';

interface Props {
  budgies: BudgieType[];
}

export const BudgieList = ({ budgies }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {budgies.map((budgie: BudgieType, i) => (
        <Budgie key={i} budgie={budgie} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
