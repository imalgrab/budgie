import React, { Fragment, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Balances } from '../components/Balances';
import { BottomPanel } from '../components/BottomPanel';
import { Expenses } from '../components/Expenses';
import { SwipeableNavigation } from '../components/SwipeableNavigation';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById, selectStatus } from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES, STYLES } from '../theme/theme';
import {
  BudgieDetailsRouteProp,
  BudgieDetailsScreenNavigationProp,
} from '../utils/types';

interface Props {
  navigation: BudgieDetailsScreenNavigationProp;
  route: BudgieDetailsRouteProp;
}

export const BudgieDetailsScreen = ({ navigation, route }: Props) => {
  const { budgieId } = route.params;
  const status = useSelector(selectStatus);
  const budgie = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId),
  );
  const scrollRef = useRef<ScrollView>(null);
  const [balancesActive, setBalancesActive] = useState<boolean>(false);

  if (status === 'loading') {
    return (
      <View style={STYLES.centered}>
        <ActivityIndicator
          focusable
          size="large"
          animating={true}
          color={COLORS.secondary}
        />
      </View>
    );
  }
  if (!budgie) {
    return (
      <SafeAreaView>
        <Text>Budgie not found</Text>
      </SafeAreaView>
    );
  }
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <Appbar.Header focusable style={styles.header}>
          <Appbar.BackAction
            size={SIZES.big}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            focusable
            titleStyle={[FONTS.h4]}
            subtitleStyle={[FONTS.small, { color: COLORS.text2 }]}
            title={budgie.title}
            subtitle={budgie.members.join(', ')}
          />
          {!balancesActive && (
            <Appbar.Action
              size={SIZES.big}
              icon="pencil-outline"
              onPress={() =>
                navigation.navigate('CreateBudgie', {
                  budgieId: budgie._id,
                })
              }
            />
          )}
        </Appbar.Header>
        <SwipeableNavigation
          balancesActive={balancesActive}
          onLeftPress={() =>
            scrollRef.current?.scrollTo({ x: 0, animated: true })
          }
          onRightPress={() =>
            scrollRef.current?.scrollTo({ x: SIZES.width, animated: true })
          }
        />
        <ScrollView
          horizontal
          ref={scrollRef}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            const value = e.nativeEvent.contentOffset.x;
            setBalancesActive(value > SIZES.width / 2);
          }}>
          <View>
            <Expenses
              budgieId={budgieId}
              currency={budgie.currency}
              members={budgie.members}
            />
            <BottomPanel
              budgieId={budgieId}
              currency={budgie.currency}
              members={budgie.members}
            />
          </View>
          <Balances />
        </ScrollView>
      </SafeAreaView>
      {!balancesActive && <SafeAreaView style={styles.bottomBar} />}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
    elevation: 0,
  },
  headerText: {},
  bottomBar: {
    flex: 0,
    backgroundColor: COLORS.shadow,
  },
});
