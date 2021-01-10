import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Appbar, configureFonts, FAB } from 'react-native-paper';
import { BudgiesContext } from '../BudgiesContext';
import { BudgieList } from '../components/BudgieList';

export const HomeScreen = ({ navigation }: any) => {
  const { budgies }: any = useContext(BudgiesContext);
  const onAddButtonPress = () => navigation.navigate('CreateBudgie');
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Budgie" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <BudgieList budgies={budgies} />
      <FAB style={styles.addButton} icon="plus" onPress={onAddButtonPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 0,
    padding: 0,
  },
  headerTitle: {
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
});
