import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieList } from '../components/BudgieList';
import { BudgieState } from '../store/budgies/budgies';
import { getBudgieIds } from '../store/budgies/selectors';
import { COLORS, FONTS } from '../theme/theme';

export const HomeScreen = ({ navigation }: any) => {
  const budgieIds = useSelector(getBudgieIds);
  const onAddButtonPress = () => navigation.navigate('CreateBudgie');

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{}}>
        <Appbar.Content
          title="Budgie"
          titleStyle={[FONTS.h3, styles.headerTitle]}
        />
      </Appbar.Header>
      <BudgieList budgieIds={budgieIds} />
      <FAB style={styles.addButton} icon="plus" onPress={onAddButtonPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  headerTitle: {
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    backgroundColor: COLORS.secondary,
    right: 30,
    bottom: 30,
  },
});
