import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Button, DefaultTheme, Divider, List } from 'react-native-paper';
import { COLORS, FONTS } from '../theme/theme';
import { BudgieType } from '../utils/types';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { removeBudgie } from '../store/budgies/actions';

interface Props {
  budgie: BudgieType;
}

export const Budgie = ({ budgie }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const onLongItemPress = () => {
    setModalVisible(true);
  };

  const onItemPress = () =>
    navigation.navigate('BudgieDetails', { id: budgie._id });

  const onModalCancel = () => setModalVisible(false);
  const onModalConfirm = () => {
    dispatch(removeBudgie(budgie._id));
    setModalVisible(false);
  };

  if (budgie) {
    return (
      <View key={budgie._id}>
        <List.Item
          style={styles.container}
          titleStyle={FONTS.normal}
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
                theme={theme}
                labelStyle={FONTS.normal}
                onPress={onModalCancel}>
                Cancel
              </Button>
              <Button
                focusable
                theme={theme}
                labelStyle={FONTS.normal}
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

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.secondary,
  },
};
