import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

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
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ExpenseDetails')}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.payedByStyle}>
            payed by <Text style={styles.memberText}>{payedBy}</Text>
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.titleStyle}>
            {amount} {currency}
          </Text>
          <Text style={styles.payedByStyle}>{date.toLocaleDateString()}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 5,
    elevation: 5,
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
    paddingVertical: 10,
  },
  titleStyle: {
    color: '#F5DF4D',
    fontSize: 18,
  },
  payedByStyle: {
    color: 'darkgrey',
    fontSize: 12,
  },
  memberText: {
    fontWeight: 'bold',
  },
});
