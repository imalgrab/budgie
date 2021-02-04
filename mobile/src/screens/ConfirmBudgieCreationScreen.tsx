import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View } from 'react-native';
import { Appbar, Divider, IconButton, List, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById, selectUserId } from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES, STYLES } from '../theme/theme';
import {
  ConfirmBudgieCreationScreenNavigationProp,
  ConfirmBudgieCreationScreenRouteProp,
} from '../utils/types';

interface Props {
  navigation: ConfirmBudgieCreationScreenNavigationProp;
  route: ConfirmBudgieCreationScreenRouteProp;
}

export const ConfirmBudgieCreationScreen = ({ navigation, route }: Props) => {
  const userId = useSelector(selectUserId);
  const budgieId = route.params?.budgieId;
  const budgie =
    budgieId &&
    useSelector((state: BudgieState) => selectBudgieById(state, budgieId));

  if (budgie) {
    const members = budgie.members;

    const participants = members
      .filter(member => member.userId !== userId)
      .map(member => member.name);

    console.log(participants);
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header focusable style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        </Appbar.Header>
        <IconButton
          style={styles.confirmIcon}
          color={COLORS.secondary}
          size={SIZES.h1}
          icon="check"
        />
        <Text style={[FONTS.h2, styles.title]}>
          Budgie created successfully!
        </Text>
        <Image
          style={styles.image}
          source={require('../assets/images/confirmation.png')}
        />
        <Text style={[FONTS.h4, styles.subtitle]}>
          Copy this code and send it your{' '}
          {participants.length > 1 ? 'friends' : 'friend'}:
        </Text>
        <Surface focusable style={styles.surface}>
          <Text selectable selectionColor={COLORS.secondary} style={FONTS.big}>
            {budgieId}
          </Text>
        </Surface>
        <Text style={[FONTS.h4, styles.subtitle]}>
          Other {participants.length > 1 ? 'participants' : 'participant'}:
        </Text>
        <List.Section focusable>
          {participants.map(participant => (
            <View key={participant}>
              <List.Item
                style={styles.participant}
                title={participant}
                titleStyle={FONTS.bigger}
              />
              <Divider focusable />
            </View>
          ))}
        </List.Section>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={STYLES.centered}>
      <Text style={FONTS.h1}>Something went wrong!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
  },
  confirmIcon: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  image: {
    alignSelf: 'center',
    height: '30%',
    resizeMode: 'contain',
  },
  surface: {
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    margin: 0,
    elevation: 0,
  },
  participant: {
    backgroundColor: COLORS.white,
  },
  subtitle: {
    paddingHorizontal: 10,
  },
});
