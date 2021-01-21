import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Budgie } from './Budgie';

interface Props {
  budgieIds: number[];
}

export const BudgieList = ({ budgieIds }: Props) => (
  <ScrollView>
    {budgieIds.map((budgieId: number) => (
      <Budgie key={budgieId} budgieId={budgieId} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({});
