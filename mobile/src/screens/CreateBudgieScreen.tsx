import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import {
  Appbar,
  Button,
  Chip,
  DefaultTheme,
  IconButton,
  Surface,
  TextInput,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONTS, SIZES } from '../theme/theme';
import { createBudgie } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';

export const CreateBudgieScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const token = useSelector((state: BudgieState) => state.userToken);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const [currency, setCurrency] = useState('PLN');
  const [members, setMembers] = useState<string[]>([]);

  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const currencies = ['PLN', 'USD', 'EUR', 'GBP', 'CHF'];
  const categories = [
    '🌍 Trip',
    '🏠 House',
    '👨‍❤️‍👨 Couple',
    '🎉 Party',
    '📏 Project',
    '📜 Other',
  ];

  const getCategoryName = (id: number | null): string => {
    if (id) {
      return categories[id].substr(3);
    }
    return '';
  };

  const renderCurrencyPicker = () =>
    Platform.OS === 'ios' ? (
      <SafeAreaView style={styles.container}>
        <Modal
          useNativeDriver
          useNativeDriverForBackdrop
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={styles.modal}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalInner}>
            <Picker
              selectedValue={currency}
              onValueChange={value => setCurrency(value.toString())}>
              {currencies.map(currency => (
                <Picker.Item key={currency} value={currency} label={currency} />
              ))}
            </Picker>
            <Button
              theme={theme}
              labelStyle={FONTS.normal}
              onPress={() => setModalVisible(false)}>
              OK
            </Button>
          </View>
        </Modal>
        <Button
          theme={theme}
          labelStyle={FONTS.bolder}
          onPress={() => setModalVisible(true)}>
          {currency}
        </Button>
      </SafeAreaView>
    ) : (
      <Picker
        itemStyle={(FONTS.normal, { color: COLORS.secondary })}
        selectedValue={currency}
        onValueChange={value => setCurrency(value.toString())}>
        {currencies.map(currency => (
          <Picker.Item key={currency} value={currency} label={currency} />
        ))}
      </Picker>
    );

  const onCreate = async () => {
    try {
      await dispatch(
        createBudgie(
          token || '',
          title,
          currency,
          members,
          description,
          getCategoryName(category),
        ),
      );
    } catch (error) {
      console.error('Cannot create the budgie: ', error);
    } finally {
      navigation.goBack();
    }
  };

  const onClose = () => navigation.goBack();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Action icon="close" onPress={onClose} />
          <Appbar.Content title="Add a new budgie" titleStyle={FONTS.h4} />
          <Appbar.Action
            disabled={[title, members].some(x => x.length === 0)}
            icon="plus-circle-outline"
            onPress={onCreate}
          />
        </Appbar.Header>

        <ScrollView contentContainerStyle={styles.content}>
          <TextInput
            theme={theme}
            style={styles.input}
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            theme={theme}
            style={styles.input}
            label="Description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <View style={styles.chips}>
            {categories.map((cat, i) => (
              <Chip
                textStyle={FONTS.normal}
                key={i}
                style={styles.chip}
                selected={category !== null && category === i}
                onPress={() =>
                  setCategory(prevCat => (prevCat === i ? null : i))
                }>
                {cat}
              </Chip>
            ))}
          </View>
          <Text style={[FONTS.small]}>Currency:</Text>
          <Surface style={styles.surface}>{renderCurrencyPicker()}</Surface>
          <Text style={[FONTS.small]}>Participants ({members.length} / 5)</Text>

          <Surface style={styles.surface}>
            {members.map((member, i) => (
              <View style={[styles.username, styles.usernameContainer]} key={i}>
                <Text style={FONTS.normal}>{member}</Text>
                <IconButton
                  icon="close"
                  size={SIZES.small}
                  onPress={() => setMembers(members.filter((_, j) => i !== j))}
                />
              </View>
            ))}

            <View style={styles.addUsers}>
              <TextInput
                theme={theme}
                style={[styles.innerInput]}
                label={members.length === 0 ? 'My name' : 'Other participant'}
                value={username}
                onChangeText={text => setUsername(text)}
              />
              <Button
                theme={theme}
                labelStyle={FONTS.h4}
                style={styles.addButton}
                disabled={username.length === 0 || members.includes(username)}
                onPress={() => {
                  setMembers(prevMembers => [...prevMembers, username]);
                  setUsername('');
                }}>
                ADD
              </Button>
            </View>
          </Surface>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  innerInput: {
    flex: 5,
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  addButton: {
    flex: 1,
  },
  chips: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
  chip: {
    backgroundColor: COLORS.white,
    marginHorizontal: 5,
    marginVertical: 7,
  },
  surface: {
    flex: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
  },
  addUsers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    margin: 10,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalInner: {
    paddingBottom: 10,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.secondary,
  },
};
