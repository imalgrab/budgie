import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  RadioButton,
  HelperText,
  TextInput,
  Divider,
  Chip,
  Checkbox,
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

import Modal from 'react-native-modal';

interface Props {
  navigation: JoinBudgieScreenNavigationProp;
  route: JoinBudgieScreenRouteProp;
}

export const JoinBudgieScreen = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const [freeNames, setFreeNames] = useState<string[]>([]);
  const [budgieId, setBudgieId] = useState('');
  const [chosenName, setChosenName] = useState('');
  const [budgie, setBudgie] = useState<BudgieType>();

  const handleJoin = async () => {
    dispatch(setStatusLoading());
    try {
      const res = await fetch(`${ADDR}/api/budgies/${budgieId}`);
      const budgie: BudgieType = await res.json();
      const members = budgie.members;
      const emptyMembers = members.filter(
        (member: MemberType) => member.userId === '',
      );
      if (emptyMembers.length === 0) {
        setError('This budgie is full');
        return [];
      } else if (emptyMembers.length === 1) {
        const name = emptyMembers[0].name;
        const id = members.findIndex(member => member.name === name);
        if (userId) {
          members[id].userId = userId;
        }
        await fetch(`${ADDR}/api/budgies/${budgieId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            members: members,
          }),
        });
        setError('');
        setBudgie(budgie);
        return [name];
      } else {
        setError('');
        const freeNames = emptyMembers.map(member => member.name);
        setBudgie(budgie);
        return freeNames;
      }
    } catch (error) {
      setError(`Budgie with given code doesn't exist`);
      return error;
    }
  };

  const onModalConfirm = async () => {
    if (budgie && userId) {
      const members = budgie.members;
      const id = members.findIndex(member => member.name === chosenName);
      members[id].userId = userId;
      dispatch(setStatusLoading());
      try {
        await fetch(`${ADDR}/api/budgies/${budgieId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            members: members,
          }),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setStatusIdle();
        navigation.goBack();
      }
    }
  };

  const onModalCancel = () => {
    setBudgie(undefined);
    setFreeNames([]);
    setChosenName('');
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
          <View style={styles.labelWrapper}>
            <HelperText
              style={FONTS.regular}
              visible={error.length > 0}
              type="error">
              {error}
            </HelperText>
            <TextInput
              value={budgieId}
              onChangeText={text => setBudgieId(text)}
              style={styles.label}
              label="Budgie code"
              theme={altTheme}
              focusable
              showSoftInputOnFocus
              placeholder="601c237fc9237bd3e5ec4262"
            />
          </View>
          <Button
            focusable
            onPress={async () => {
              const freeNames = await handleJoin();
              if (freeNames.length > 1) {
                setFreeNames(freeNames);
              } else if (freeNames.length === 1) {
                dispatch(setStatusIdle());
                navigation.goBack();
              }
            }}
            mode="contained"
            theme={altTheme}
            style={styles.button}
            labelStyle={[FONTS.bigger, styles.buttonText]}>
            Join
          </Button>
          <Modal
            useNativeDriver
            useNativeDriverForBackdrop
            animationIn="zoomIn"
            animationOut="zoomOut"
            style={styles.modal}
            isVisible={freeNames.length > 1}
            onBackdropPress={onModalCancel}>
            <View style={styles.modalInner}>
              <Text style={FONTS.h4}>Who are you?</Text>
              <View style={styles.nameWrapper}>
                {freeNames.map(name => (
                  <View style={styles.nameContent}>
                    <TouchableOpacity
                      style={{ paddingHorizontal: 10 }}
                      onPress={() => setChosenName(name)}>
                      <Text style={FONTS.big}>{name}</Text>
                    </TouchableOpacity>
                    <Checkbox
                      uncheckedColor={COLORS.secondaryDark}
                      status={name === chosenName ? 'checked' : 'unchecked'}
                      onPress={() => setChosenName(name)}
                    />
                  </View>
                ))}
              </View>
              <View style={STYLES.rowAlignCenter}>
                <Button
                  focusable
                  theme={altTheme}
                  labelStyle={FONTS.bold}
                  onPress={onModalCancel}>
                  Cancel
                </Button>
                <Button
                  focusable
                  theme={altTheme}
                  labelStyle={FONTS.bold}
                  onPress={onModalConfirm}>
                  Confirm
                </Button>
              </View>
            </View>
          </Modal>
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
    marginVertical: 5,
    backgroundColor: COLORS.white,
  },
  labelWrapper: {
    marginVertical: 20,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 35,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.background,
  },
  modal: {
    flex: 1,
  },
  modalInner: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  modalText: {
    paddingVertical: 20,
    width: '75%',
    textAlign: 'center',
  },
  nameWrapper: {
    padding: 10,
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
