import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { BudgiesContext } from '../BudgiesContext';
import { BudgieList } from '../components/BudgieList';

export const HomeScreen = ({ navigation }: any) => {
  const { budgies }: any = useContext(BudgiesContext);
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="budgie" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <BudgieList budgies={budgies} />
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
  headerTitle: {
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 50,
  },
});
