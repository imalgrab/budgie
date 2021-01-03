import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const SwipeableNavigation = ({ onLeftPress, onRightPress }) => {
  return (
    <View style={styles.container}>
      <Button
        icon="receipt"
        mode="contained"
        onPress={onLeftPress}
        style={{ width: '50%', padding: 10 }}>
        Expenses
      </Button>
      <Button
        icon="scale-balance"
        mode="contained"
        onPress={onRightPress}
        style={{ width: '50%', padding: 10 }}>
        Balances
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
  },
  textButton: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 18,
  },
});
