import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { altTheme, COLORS, FONTS, STYLES } from '../theme/theme';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById } from '../store/budgies/selectors';
import { MemberType } from '../utils/types';

interface Props {
  budgieId: string;
  expenseId: string;
  currency: string;
  members: MemberType[];
}

export const Expense: FC<Props> = ({
  budgieId,
  expenseId,
  currency,
  members,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const onModalCancel = () => setModalVisible(false);

  const onModalConfirm = () => {
    dispatch(removeExpense(expenseId, budgieId));
    setModalVisible(false);
  };

  const expense = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId)?.expenses.find(
      expense => expense._id === expenseId,
    ),
  );

  if (expense) {
    const { title, amount, date, paidBy } = expense;
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          onLongPress={() => setModalVisible(true)}
          onPress={() =>
            navigation.navigate('ExpenseDetails', {
              budgieId,
              expenseId,
              currency,
              members,
            })
          }>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={[FONTS.bigger, styles.titleStyle]}>{title}</Text>
              <Text style={[FONTS.small, styles.paidByStyle]}>
                paid by <Text style={FONTS.medium}>{paidBy}</Text>
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
        </TouchableOpacity>
        <Modal
          useNativeDriver
          useNativeDriverForBackdrop
          animationIn="zoomIn"
          animationOut="zoomOut"
          style={styles.modal}
          isVisible={modalVisible}
          onBackdropPress={onModalCancel}>
          <View style={styles.modalInner}>
            <Text style={[FONTS.normal, styles.modalText]}>
              Are you sure you want to delete{' '}
              <Text style={FONTS.bolder}>{title}</Text>?
            </Text>
            <View style={STYLES.rowSpaceBetween}>
              <Button
                focusable
                theme={altTheme}
                labelStyle={FONTS.bold}
                onPress={onModalCancel}>
                Cancel
              </Button>
              <Button
                focusable
                theme={altTheme}
                labelStyle={FONTS.bold}
                onPress={onModalConfirm}>
                Confirm
              </Button>
            </View>
          </View>
        </Modal>
      </>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleStyle: {
    color: COLORS.black,
    paddingBottom: 10,
  },
  paidByStyle: {
    color: COLORS.text2,
  },
  modal: {
    flex: 1,
  },
  modalInner: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  modalText: {
    paddingVertical: 20,
    width: '75%',
    textAlign: 'center',
  },
});
