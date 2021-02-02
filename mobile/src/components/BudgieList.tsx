import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { BudgieType } from '../utils/types';
import { Budgie } from './Budgie';

interface Props {
  budgieIds: string[];
}

export const BudgieList = ({ budgieIds }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {budgieIds.map((budgieId: string) => (
        <Budgie key={budgieId} budgieId={budgieId} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
