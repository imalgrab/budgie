import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import { Appbar, List, Paragraph, Surface } from 'react-native-paper';
import { Expense } from '../../types';
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
  } else {
    const expenses = budgie.history;
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            title={budgie.title}
            subtitle={budgie.members.join(', ')}
            style={styles.header}
          />
        </Appbar.Header>
        <ScrollView horizontal snapToInterval={Dimensions.get('window').width}>
          <View style={{ backgroundColor: 'red', height: 200 }}></View>
        </ScrollView>
        <List.Section>
          <List.Subheader>Expenses:</List.Subheader>
          {expenses.map((expense: Expense) => (
            <List.Item
              title={expense.title}
              description={`payed by ${expense.payedBy}`}
              right={() => <Paragraph>{expense.amount}</Paragraph>}
            />
          ))}
        </List.Section>
        <Surface style={styles.surface}>
          <Text>
            Total:
            {budgie.history.reduce(
              (prev, curr) => prev.amount + curr.amount,
              0,
            )}
            {budgie.members.map(member => (
              <Text>{member} : xd</Text>
            ))}
          </Text>
        </Surface>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  surface: {
    padding: 5,
    elevation: 4,
  },
});
