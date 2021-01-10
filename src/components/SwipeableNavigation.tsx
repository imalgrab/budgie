import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  onLeftPress: () => void;
  onRightPress: () => void;
}

export const SwipeableNavigation = ({ onLeftPress, onRightPress }: Props) => {
  const handleLeftPress = () => {
    onLeftPress();
    setLeftActive(true);
  };

  const handleRightPress = () => {
    onRightPress();
    setLeftActive(false);
  };

  //TODO: it should be handled above (in parent) to have style changed even though we swiped instead of pressed
  const [leftActive, setLeftActive] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Button
        icon="receipt"
        mode="contained"
        onPress={handleLeftPress}
        labelStyle={leftActive && styles.activeButtonText}
        style={[leftActive && styles.activeButton, styles.buttonGeneral]}>
        Expenses
      </Button>
      <Button
        icon="scale-balance"
        mode="contained"
        onPress={handleRightPress}
        labelStyle={!leftActive && styles.activeButtonText}
        style={[!leftActive && styles.activeButton, styles.buttonGeneral]}>
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
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: 'gold',
  },
  activeButtonText: {
    fontWeight: 'bold',
  },
  buttonGeneral: {
    width: '50%',
    padding: 10,
  },
});
