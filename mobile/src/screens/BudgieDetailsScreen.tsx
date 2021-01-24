import { current } from '@reduxjs/toolkit';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Balances } from '../components/Balances';
import { BottomPanel } from '../components/BottomPanel';
import { Expenses } from '../components/Expenses';
import { SwipeableNavigation } from '../components/SwipeableNavigation';
import { BudgieState } from '../store/budgies/budgies';
import { getBudgieById, selectBudgieById } from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES } from '../theme/theme';

export const BudgieDetailsScreen = ({ navigation, route }: any) => {
  const { id } = route.params;
  const scrollRef = useRef<ScrollView>(null);
  const budgie = useSelector((state: BudgieState) =>
    selectBudgieById(state, id),
  );

  const [balancesActive, setBalancesActive] = useState<boolean>(false);

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
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            size={SIZES.big}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            titleStyle={[FONTS.h4]}
            subtitleStyle={[FONTS.small, { color: COLORS.text2 }]}
            title={budgie.title}
            subtitle={budgie.members.join(', ')}
          />
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
            <Expenses id={id} currency={budgie.currency} />
            <BottomPanel
              id={id}
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
    elevation: 0,
  },
  headerText: {},
  bottomBar: {
    flex: 0,
    backgroundColor: COLORS.shadow,
  },
});
