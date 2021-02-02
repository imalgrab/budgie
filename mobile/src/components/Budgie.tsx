import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Divider, List } from 'react-native-paper';
import { altTheme, COLORS, FONTS } from '../theme/theme';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeBudgie } from '../store/budgies/actions';
import { selectBudgieById } from '../store/budgies/selectors';
import { BudgieState } from '../store/budgies/budgies';

interface Props {
  budgieId: string;
}

export const Budgie = ({ budgieId }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const budgie = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId),
  );

  const [modalVisible, setModalVisible] = useState(false);

  const onLongItemPress = () => {
    setModalVisible(true);
  };

  const onItemPress = () => navigation.navigate('BudgieDetails', { budgieId });

  const onModalCancel = () => setModalVisible(false);

  const onModalConfirm = () => {
    dispatch(removeBudgie(budgieId));
    setModalVisible(false);
  };

  if (budgie) {
    return (
      <View key={budgie._id}>
        <List.Item
          theme={altTheme}
          style={styles.container}
          titleStyle={FONTS.bigger}
          descriptionStyle={FONTS.small}
          onPress={onItemPress}
          onLongPress={onLongItemPress}
          title={budgie.title}
          description={budgie.description || 'No description'}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <Divider focusable />
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
              <Text style={FONTS.bolder}>{budgie.title}</Text>?
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
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
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
