import React, { FC } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  title: string;
  payedBy: string;
  amount: number;
  date: Date;
  currency: string;
}

export const Expense: FC<Props> = ({
  title,
  payedBy,
  amount,
  date,
  currency,
}) => {
  return (
    <TouchableOpacity onPress={() => alert('ELO')}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.payedByStyle}>payed by {payedBy}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.titleStyle}>
            {amount} {currency}
          </Text>
          <Text style={styles.payedByStyle}>{date.toDateString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    marginBottom: 5,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleStyle: {
    color: 'purple',
    fontSize: 18,
  },
  payedByStyle: {
    color: 'darkgrey',
    fontSize: 12,
  },
});
