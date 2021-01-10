import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { FAB } from 'react-native-paper';

interface Props {
  currency: string;
  members: string[];
}

export const BottomPanel = ({ currency, members }: Props) => {
  const navigation = useNavigation();
  const onAddButtonPress = () =>
    navigation.navigate('CreateExpense', { currency, members });
  return (
    <View style={styles.container}>
      <ScrollView />
      <View style={styles.panel}>
        <FAB icon="plus" style={styles.addButton} onPress={onAddButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
    backgroundColor: '#97999B',
  },
  addButton: {
    bottom: 25,
    alignSelf: 'center',
  },
});
