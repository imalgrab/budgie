import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      <TouchableOpacity onPress={handleLeftPress}>
        <View style={leftActive ? styles.activeButton : styles.button}>
          <Text style={styles.buttonText}>Expenses</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRightPress}>
        <View style={!leftActive ? styles.activeButton : styles.button}>
          <Text style={styles.buttonText}>Balances</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  activeButton: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#F5DF4D',
  },
  button: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#FFF',
  },
  buttonText: {
    fontSize: 18,
  },
});
