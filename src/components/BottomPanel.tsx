import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import { FAB } from 'react-native-paper';
import { COLORS, FONTS } from '../theme/theme';

interface Props {
  amount: number;
  id: number;
  currency: string;
  members: string[];
}

export const BottomPanel = ({ amount, id, currency, members }: Props) => {
  const navigation = useNavigation();
  const onAddButtonPress = () =>
    navigation.navigate('CreateExpense', { id, currency, members });

  return (
    <View style={styles.container}>
      <ScrollView />
      <View style={styles.panel}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={FONTS.tiny}>MY TOTAL</Text>
          <Text style={FONTS.big}>
            {amount} {currency}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={FONTS.tiny}>TOTAL MONEY</Text>
          <Text style={FONTS.big}>2137 {currency}</Text>
        </View>
      </View>
      <FAB icon="plus" style={styles.addButton} onPress={onAddButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: COLORS.shadow,
  },
  addButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 25,
  },
});
