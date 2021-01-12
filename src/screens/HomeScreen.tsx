import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieList } from '../components/BudgieList';
import { BudgieState } from '../store/budgies/budgies';
import { COLORS } from '../theme/theme';

export const HomeScreen = ({ navigation }: any) => {
  const budgies = useSelector<BudgieState>(state => state.budgies);
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
    backgroundColor: COLORS.background,
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
