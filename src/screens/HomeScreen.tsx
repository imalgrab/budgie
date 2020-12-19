import { DefaultTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Appbar, Divider, FAB, List } from 'react-native-paper';
import { Budgie } from '../../types';
import { BudgiesContext } from '../BudgiesContext';

export const HomeScreen = ({ navigation }) => {
  const { budgies } = useContext(BudgiesContext);
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="budgie" titleStyle={{ textAlign: 'center' }} />
      </Appbar.Header>
      <List.Section>
        {budgies.map((budgie: Budgie) => (
          <>
            <List.Item
              key={budgie.id}
              style={styles.listItem}
              onPress={() =>
                navigation.navigate('BudgieDetails', { id: budgie.id })
              }
              title={budgie.title}
              right={() => (
                <List.Icon
                  color={DefaultTheme.colors.border}
                  icon="chevron-right"
                />
              )}
            />
            <Divider />
          </>
        ))}
      </List.Section>
      <FAB
        style={styles.addButton}
        icon="plus"
        onPress={() => navigation.navigate('CreateBudgie')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 50,
  },
  listItem: {
    backgroundColor: 'white',
  },
});
