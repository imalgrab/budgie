import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  FAB,
  Portal,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BudgieList } from '../components/BudgieList';
import { fetchBudgies, logout } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgies } from '../store/budgies/selectors';
import { COLORS, FONTS, STYLES, theme } from '../theme/theme';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from '../utils/types';

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const budgies = useSelector(selectBudgies);
  const status = useSelector((state: BudgieState) => state.status);
  const userToken = useSelector((state: BudgieState) => state.userToken);

  const onAddButtonPress = () => navigation.navigate('CreateBudgie');

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

  const handleSignOut = () => {
    dispatch(logout());
  };

  const [buttonOpen, setButtonOpen] = useState(false);
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
        <BudgieList budgieIds={budgies.map(budgie => budgie._id)} />
        <FAB.Group
          visible
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'account-box-outline',
              label: 'Join existing',
              onPress: () => {
                navigation.navigate('JoinBudgie');
              },
            },
            {
              icon: 'plus',
              label: 'Create new',
              onPress: () => {
                navigation.navigate('CreateBudgie');
              },
              small: false,
            },
          ]}
          onStateChange={onStateChange}
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
