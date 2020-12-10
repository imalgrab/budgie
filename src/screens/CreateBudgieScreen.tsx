import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
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

export const CreateBudgieScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState(null);
  const [users, setUsers] = useState([]);

  const currencies = ['PLN', 'USD', 'EUR', 'GBP', 'CHF'];
  const categories = [
    '🌍 Wycieczka',
    '🏠 Wspólny dom',
    '👨‍❤️‍👨 Para',
    '🎉 Impreza',
    '📏 Projekt',
    '📜 Inne',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
          <Appbar.Content title="Dodaj nowy budżet" />
          <Appbar.Action
            disabled={title.length === 0}
            icon={title.length === 0 ? 'plus-circle-outline' : 'plus-circle'}
            onPress={() => console.log('elo')}
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
            <List.Accordion
              description="Wybierz walutę"
              title={currency}
              expanded={expanded}
              onPress={() => setExpanded(!expanded)}>
              {currencies.map(curr => (
                <List.Item
                  key={curr}
                  title={curr}
                  onPress={() => {
                    setCurrency(curr);
                    setExpanded(!expanded);
                  }}
                />
              ))}
            </List.Accordion>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 10,
  },
});
