import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BudgieType } from '../../types';

interface Props {
  budgie: BudgieType;
}

export const Header = ({ budgie }: Props) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.Action icon="chevron-left" onPress={() => navigation.goBack()} />
      <Appbar.Content
        title={budgie.title}
        subtitle={budgie.members.join(', ')}
        style={styles.header}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {},
});
