import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Appbar,
  Button,
  Chip,
  Divider,
  HelperText,
  List,
  Surface,
  TextInput,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { BudgiesContext } from '../BudgiesContext';

export const CreateBudgieScreen = ({ navigation }) => {
  const [budgies, setBudgies] = useContext(BudgiesContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [currency, setCurrency] = useState('PLN');
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const currencies = ['PLN', 'USD', 'EUR', 'GBP', 'CHF'];
  const categories = [
    '🌍 Trip',
    '🏠 House',
    '👨‍❤️‍👨 Couple',
    '🎉 Party',
    '📏 Project',
    '📜 Other',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add a new budgie" />
        <Appbar.Action
          disabled={title.length === 0}
          icon={title.length === 0 ? 'plus-circle-outline' : 'plus-circle'}
          onPress={() => {
            setBudgies(prevBudgies => [
              ...prevBudgies,
              { title, description, currency },
            ]);
            navigation.goBack();
          }}
        />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <TextInput
          style={{ backgroundColor: 'transparent' }}
          label="Tytuł"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <HelperText type="error" visible={title.length === 0}>
          Podaj tytuł
        </HelperText>
        <TextInput
          style={{ backgroundColor: 'transparent' }}
          label="Opis"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <HelperText type="error" visible={false} children={null} />
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {categories.map((cat, i) => (
            <>
              <Chip
                style={{ margin: 5 }}
                key={i}
                selected={category !== null && category === i}
                onPress={() =>
                  setCategory(prevCategory => (prevCategory === i ? null : i))
                }>
                {cat}
              </Chip>
              <Divider />
            </>
          ))}
        </View>
        <Surface
          style={{
            padding: 5,
            marginVertical: 20,
            elevation: 3,
          }}>
          {Platform.OS === 'ios' ? (
            <>
              <Button onPress={() => setModalVisible(true)}>{currency}</Button>
              <Modal
                style={{
                  backgroundColor: 'white',
                }}
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
          )}
        </Surface>
        <Text>Uczestnicy ({users.length} / 5)</Text>
        {users.map((user, i) => (
          <Text key={i}>{user}</Text>
        ))}
        <Surface
          style={{
            padding: 5,
            marginVertical: 20,
            elevation: 3,
          }}>
          <TextInput
            style={{ backgroundColor: 'transparent', flex: 5 }}
            label={users.length === 0 ? 'Moje imię' : 'Inny uczestnik'}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <Button
            style={{ flex: 1 }}
            disabled={
              username.length === 0 ||
              users.includes(username) ||
              users.length >= 5
            }
            onPress={() => {
              setUsers([...users, username]);
              setUsername('');
            }}>
            Dodaj
          </Button>
          <HelperText type="error" visible={username.length === 0}>
            Proszę podać imię uczestnika
          </HelperText>
          <HelperText type="error" visible={users.includes(username)}>
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
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
