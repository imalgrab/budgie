import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Appbar,
  Button,
  Chip,
  HelperText,
  Surface,
  TextInput,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { BudgiesContext } from '../BudgiesContext';
import { Budgie } from '../../types';

export const CreateBudgieScreen = ({ navigation }) => {
  const { createBudgie } = useContext(BudgiesContext);

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

  const renderCurrencyPicker = () =>
    Platform.OS === 'ios' ? (
      <>
        <Button onPress={() => setModalVisible(true)}>{currency}</Button>
        <Modal
          style={styles.modal}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <Picker
            selectedValue={currency}
            onValueChange={value => setCurrency(value)}>
            {currencies.map(currency => (
              <Picker.Item value={currency} label={currency} />
            ))}
          </Picker>
          <Button onPress={() => setModalVisible(false)}>OK</Button>
        </Modal>
      </>
    ) : (
      <Picker
        selectedValue={currency}
        onValueChange={value => setCurrency(value)}>
        {currencies.map(currency => (
          <Picker.Item value={currency} label={currency} />
        ))}
      </Picker>
    );

  const onCreate = () => {
    createBudgie({ id: 0, title, description, currency, members, history: [] });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add a new budgie" style={styles.header} />
        <Appbar.Action
          disabled={title.length === 0}
          icon={title.length === 0 ? 'plus-circle-outline' : 'plus-circle'}
          onPress={onCreate}
        />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          label="Title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <View style={styles.chips}>
          {categories.map((cat, i) => (
            <Chip
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
        <Surface style={styles.surface}>{renderCurrencyPicker()}</Surface>
        <Text>Uczestnicy ({members.length} / 5)</Text>
        {members.map((member, i) => (
          <Text key={i}>{member}</Text>
        ))}
        <Surface style={styles.surface}>
          <TextInput
            style={[styles.input]}
            label={members.length === 0 ? 'Moje imię' : 'Inny uczestnik'}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <Button
            style={{ flex: 1 }}
            disabled={username.length === 0 || members.includes(username)}
            onPress={() => {
              setMembers(prevMembers => [...prevMembers, username]);
              setUsername('');
            }}>
            Dodaj
          </Button>
          <HelperText type="error" visible={username.length === 0}>
            Proszę podać imię uczestnika
          </HelperText>
          <HelperText type="error" visible={members.includes(username)}>
            Już na liście
          </HelperText>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
  chips: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
  chip: {
    marginHorizontal: 5,
    marginVertical: 7,
  },
  surface: {
    padding: 5,
    marginVertical: 10,
    elevation: 3,
  },
  modal: {
    backgroundColor: 'white',
  },
});
