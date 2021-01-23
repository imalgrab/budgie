import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS, SIZES } from '../theme/theme';

//icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  balancesActive: boolean;
  onLeftPress: () => void;
  onRightPress: () => void;
}

export const SwipeableNavigation = ({
  balancesActive,
  onLeftPress,
  onRightPress,
}: Props) => {
  const handleLeftPress = () => {
    onLeftPress();
  };

  const handleRightPress = () => {
    onRightPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        containerStyle={{ flex: 1 }}
        style={[styles.button, !balancesActive && styles.buttonActive]}
        onPress={handleLeftPress}>
        <FontAwesome5
          name="receipt"
          size={SIZES.big}
          color={!balancesActive ? COLORS.text : COLORS.text2}
        />
        <Text
          style={[
            !balancesActive ? FONTS.bolder : FONTS.normal,
            {
              color: !balancesActive ? COLORS.text : COLORS.text2,
              paddingTop: 5,
            },
          ]}>
          Expenses
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        containerStyle={{ flex: 1 }}
        style={[styles.button, balancesActive && styles.buttonActive]}
        onPress={handleRightPress}>
        <MaterialCommunityIcons
          name="scale-balance"
          size={SIZES.big}
          color={balancesActive ? COLORS.text : COLORS.text2}
        />
        <Text
          style={[
            balancesActive ? FONTS.bolder : FONTS.normal,
            {
              color: balancesActive ? COLORS.text : COLORS.text2,
              paddingTop: 5,
            },
          ]}>
          Balances
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 10,
  },
  buttonActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
  },
});
