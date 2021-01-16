import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DefaultTheme, Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BudgieType } from '../types';
import { COLORS } from '../theme/theme';

export const BudgieList = ({ budgies }: any) => {
  const navigation = useNavigation();
  const onItemPress = (id: number) =>
    navigation.navigate('BudgieDetails', { id });

  return (
    <ScrollView>
      <List.Section>
        {budgies.map((budgie: BudgieType) => (
          <View key={budgie.id}>
            <List.Item
              key={budgie.id}
              style={styles.listItem}
              onPress={() => onItemPress(budgie.id)}
              title={budgie.title}
              right={() => <List.Icon icon="chevron-right" />}
            />
            <Divider />
          </View>
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: COLORS.white,
  },
});
