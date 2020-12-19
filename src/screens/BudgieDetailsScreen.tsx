import React, { useContext } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { BudgiesContext } from '../BudgiesContext';

export const BudgieDetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { getBudgieById } = useContext(BudgiesContext);

  const budgie = getBudgieById(id);
  if (!budgie) {
    return (
      <SafeAreaView>
        <Text>404</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>budgie_id: {budgie.id}</Text>
      <Text>budgie: {budgie.title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
