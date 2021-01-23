import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../theme/theme';
import moment from 'moment';

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
          <Text style={[FONTS.bigger, styles.titleStyle]}>{title}</Text>
          <Text style={[FONTS.small, styles.paidByStyle]}>
            paid by <Text style={styles.memberText}>{payedBy}</Text>
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[FONTS.bigger, styles.titleStyle]}>
            {amount} {currency}
          </Text>
          <Text style={[FONTS.small, styles.paidByStyle]}>
            {moment(date).format('DD/MM/YYYY')}
          </Text>
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
    paddingVertical: 10,
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
    color: COLORS.black,
    paddingBottom: 5,
  },
  paidByStyle: {
    color: COLORS.text2,
  },
  memberText: {
    fontFamily: 'Bold',
  },
});
