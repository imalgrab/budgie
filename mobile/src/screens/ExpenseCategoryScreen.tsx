import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Appbar, List, Searchbar } from 'react-native-paper';
import { altTheme, COLORS, FONTS } from '../theme/theme';
import {
  ExpenseCategoryScreenNavigationProp,
  ExpenseCategoryScreenRouteProp,
} from '../utils/types';

interface Props {
  navigation: ExpenseCategoryScreenNavigationProp;
  route: ExpenseCategoryScreenRouteProp;
}

//TODO: worth reviewing

const categories = [
  '🧦 Clothes',
  '🧺 Groceries',
  '🏥 Healthcare',
  '💊 Medicaments',
  '🌮 Restaurants',
  '🏠 Rent and utilities',
  '🚕 Transport',
  '🌙 Night out',
  '🍿 Entertainment',
  '⚽ Activities',
  '🛏️ Accommodation',
  '🐾 Pets',
];

const ExpenseCategory = ({
  searchVisible,
  searchText,
  setCategory,
  navigation,
}: any) => (
  <List.Section focusable titleStyle={FONTS.h4} title="Available categories:">
    {categories
      .filter(category => !searchVisible || category.includes(searchText))
      .map(category => (
        <List.Item
          onPress={() => {
            setCategory('category', category);
            navigation.goBack();
          }}
          key={category}
          left={() => <Text style={styles.icon}>{category.split(' ')[0]}</Text>}
          title={category.split(' ')[1]}
          titleStyle={[FONTS.medium, { color: COLORS.text2 }]}
          style={styles.listItem}
        />
      ))}
  </List.Section>
);

export const ExpenseCategoryScreen = ({ navigation, route }: Props) => {
  const { setCategory } = route.params;
  const [searchText, setSearchText] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const scrolledDown = currentOffset >= offset;
    // setSearchVisible(scrolledDown);
    // setOffset(currentOffset);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header} focusable>
        <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
        <Appbar.Content
          focusable
          title="Select category"
          titleStyle={FONTS.h3}
        />
        <Appbar.Action
          icon={searchVisible ? 'chevron-up' : 'chevron-down'}
          onPress={() => setSearchVisible(!searchVisible)}
        />
      </Appbar.Header>
      {searchVisible && (
        <Searchbar
          style={{ margin: 10 }}
          value={searchText}
          onChangeText={setSearchText}
          theme={altTheme}
          placeholder="Search..."
          inputStyle={FONTS.normal}
          iconColor={COLORS.text}
          focusable
          showSoftInputOnFocus
        />
      )}
      <ScrollView
        scrollEventThrottle={1}
        keyboardShouldPersistTaps="always"
        onScroll={event => handleScroll(event)}>
        <ExpenseCategory
          searchText={searchText}
          searchVisible={searchVisible}
          setCategory={setCategory}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    // backgroundColor: 'transparent',
    // elevation: 0,
  },
  listItem: {
    backgroundColor: COLORS.white,
    margin: 2,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    textAlignVertical: 'center',
    fontSize: 18,
  },
});
