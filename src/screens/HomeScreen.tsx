import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { Appbar, Button, Divider, FAB, List } from 'react-native-paper';
import { BudgiesContext } from '../BudgiesContext';

export const HomeScreen = ({ navigation }) => {
  const [budgies, _] = useContext(BudgiesContext);
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="budgie" titleStyle={{ textAlign: 'center' }} />
      </Appbar.Header>
      <List.Section>
        {budgies.map(budgie => (
          <>
            <List.Item
              style={{ backgroundColor: 'white' }}
              onPress={() => navigation.navigate('BudgieDetails')}
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
});
