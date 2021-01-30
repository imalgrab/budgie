import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BudgieList } from '../components/BudgieList';
import { fetchBudgies } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgies } from '../store/budgies/selectors';
import { COLORS, FONTS, STYLES } from '../theme/theme';

export const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const budgies = useSelector(selectBudgies);
  const status = useSelector((state: BudgieState) => state.status);
  const userToken = useSelector((state: BudgieState) => state.userToken);

  const onAddButtonPress = () => navigation.navigate('CreateBudgie');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBudgies(userToken || ''));
    }
  }, [status, dispatch]);

  const content =
    status === 'loading' ? (
      <View style={STYLES.centered}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={COLORS.secondary}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <BudgieList budgies={budgies} />
        <FAB style={styles.addButton} icon="plus" onPress={onAddButtonPress} />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content
          title="Budgie"
          titleStyle={[FONTS.h3, styles.headerTitle]}
        />
      </Appbar.Header>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // borderBottomWidth: 0.5,
  },
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
