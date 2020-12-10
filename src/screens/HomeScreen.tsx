import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Appbar, Button, FAB, List } from 'react-native-paper';

export const HomeScreen = ({ navigation }) => {
  const [budgies, setBudgies] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="budgie" style={{ alignItems: 'center' }} />
      </Appbar.Header>
      <List.Section>
        {budgies.map(budgie => (
          <List.Item title={budgie} left={() => <List.Icon icon="folder" />} />
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
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 50,
  },
});
