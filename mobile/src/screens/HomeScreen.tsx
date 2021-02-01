import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator, Appbar, Button, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BudgieList } from '../components/BudgieList';
import { fetchBudgies, logout } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgies } from '../store/budgies/selectors';
import { COLORS, FONTS, STYLES, theme } from '../theme/theme';

export const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const budgies = useSelector(selectBudgies);
  const status = useSelector((state: BudgieState) => state.status);
  const userToken = useSelector((state: BudgieState) => state.userToken);

  const onAddButtonPress = () => navigation.navigate('CreateBudgie');
  const handleSignOut = () => {
    dispatch(logout());
  };

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBudgies(userToken || ''));
    }
  }, [status, dispatch]);

  const content =
    status === 'loading' ? (
      <View style={STYLES.centered}>
        <ActivityIndicator
          focusable
          size="large"
          animating={true}
          color={COLORS.secondary}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <BudgieList budgies={budgies} />
        <FAB
          focusable
          style={styles.addButton}
          icon="plus"
          onPress={onAddButtonPress}
        />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header focusable style={styles.header}>
        <Appbar.Content
          focusable
          title="Budgie"
          titleStyle={[FONTS.header, styles.headerTitle]}
        />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => setMenuVisible(!menuVisible)}
        />
      </Appbar.Header>
      {menuVisible && (
        <View style={styles.signOutContainer}>
          <Button
            icon="logout-variant"
            theme={altTheme}
            mode="text"
            focusable
            onPress={handleSignOut}
            style={styles.signOutButton}
            labelStyle={FONTS.normal}>
            Sign out
          </Button>
        </View>
      )}
      {content}
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
    fontSize: 25,
  },
  addButton: {
    position: 'absolute',
    backgroundColor: COLORS.secondary,
    right: 30,
    bottom: 30,
  },
  signOutContainer: {
    marginTop: 10,
  },
  signOutButton: {
    alignSelf: 'center',
  },
});

const altTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS.secondary,
  },
};
