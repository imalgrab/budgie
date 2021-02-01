import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { altTheme, COLORS, FONTS } from '../theme/theme';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { removeExpense } from '../store/budgies/actions';

interface Props {
  budgieId: string;
  id: string;
  title: string;
  payedBy: string;
  amount: number;
  date: Date;
  currency: string;
}

export const Expense: FC<Props> = ({
  budgieId,
  id,
  title,
  payedBy,
  amount,
  date,
  currency,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const onModalCancel = () => setModalVisible(false);

  const onModalConfirm = () => {
    dispatch(removeExpense(id, budgieId));
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onLongPress={() => setModalVisible(true)}
        onPress={() => navigation.navigate('ExpenseDetails')}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={[FONTS.bigger, styles.titleStyle]}>{title}</Text>
            <Text style={[FONTS.small, styles.paidByStyle]}>
              paid by <Text style={FONTS.medium}>{payedBy}</Text>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
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
    justifyContent: 'space-evenly',
  },
  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  titleStyle: {
    color: COLORS.black,
    paddingBottom: 5,
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
