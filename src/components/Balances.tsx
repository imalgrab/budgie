import React from 'react';
import { Dimensions, Text, View } from 'react-native';

interface Props {}

export const Balances = () => {
  return (
    <View style={{ flex: 1, width: Dimensions.get('window').width }}>
      <Text>Balances here</Text>
      {/* <BalancesChart /> */}
      {/* {balances.map(balance => (
        <Balance balance={balance} />
      ))} */}
    </View>
  );
};
