import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusIdle, setStatusLoading } from '../store/budgies/actions';
import { selectStatus, selectUserId } from '../store/budgies/selectors';
import { altTheme, COLORS, FONTS, STYLES } from '../theme/theme';
import { ADDR } from '../utils/constants';
import {
  BudgieType,
  JoinBudgieScreenNavigationProp,
  JoinBudgieScreenRouteProp,
  MemberType,
} from '../utils/types';

interface Props {
  navigation: JoinBudgieScreenNavigationProp;
  route: JoinBudgieScreenRouteProp;
}

export const JoinBudgieScreen = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);

  const handleJoin = async () => {
    dispatch(setStatusLoading())
    try {
      const budgieId = input;
      const res = await fetch(`${ADDR}/api/budgies/${budgieId}`);
      const budgie: BudgieType = await res.json();
      const members = budgie.members;
      const emptyMembers = members.filter(
        (member: MemberType) => member.userId === '',
      );
      console.log({ emptyMembers });
      if (emptyMembers.length === 0) {
        setError('This budgie is full');
      } else if (emptyMembers.length === 1) {
        const name = emptyMembers[0].name;
        const id = members.findIndex(member => member.name === name);
        console.log(name, id);
        if (userId) {
          members[id].userId = userId;
        }
        console.log({ members });
        const test = await fetch(`${ADDR}/api/budgies/${budgieId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            members: members,
          }),
        });
        const xd = await test.json();
        console.log(xd);
      }
    } catch (error) {
      setError(`Budgie with given code doesn't exist`);
      return error;
    }
  };

  if (status === 'loading') {
    return (
      <SafeAreaView style={STYLES.centered}>
        <ActivityIndicator focusable color={COLORS.secondary} size="large" />
      </SafeAreaView>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={STYLES.flex1}>
        <Appbar.Header focusable>
          <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
          <Appbar.Content
            focusable
            title="Join a budgie"
            titleStyle={FONTS.h3}
          />
        </Appbar.Header>
        <View style={styles.content}>
          <Text style={FONTS.normal}>
            Simply paste the given code in the field below to join a budgie.
          </Text>
          <TextInput
            value={input}
            onChangeText={text => setInput(text)}
            style={styles.label}
            label="Budgie code"
            theme={altTheme}
            focusable
            showSoftInputOnFocus
            placeholder="601c237fc9237bd3e5ec4262"
          />
          <Button
            focusable
            onPress={async () => {
              await handleJoin();
              dispatch(setStatusIdle());
              navigation.goBack();
            }}
            mode="contained"
            theme={altTheme}
            style={styles.button}
            labelStyle={[FONTS.bigger, styles.buttonText]}>
            Join
          </Button>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30,
  },
  label: {
    marginVertical: 20,
    backgroundColor: COLORS.white,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 35,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.background,
  },
});
