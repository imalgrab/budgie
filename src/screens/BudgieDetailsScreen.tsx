import React, { Fragment, useContext, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Balances } from '../components/Balances';
import { BottomPanel } from '../components/BottomPanel';
import { Expenses } from '../components/Expenses';
import { SwipeableNavigation } from '../components/SwipeableNavigation';
import { getBudgieById } from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES } from '../theme/theme';

export const BudgieDetailsScreen = ({ navigation, route }: any) => {
  const { id } = route.params;
  const budgie = useSelector(state => getBudgieById(state, id));
  const scrollRef = useRef<ScrollView>(null);

  const [balancesActive, setBalancesActive] = useState<boolean>(false);

  // const calculateAmount = () => {
  //   return budgie?.history.map()
  // }

  return budgie ? (
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
            <Expenses
              expenses={budgie.history.expenses}
              members={budgie.members}
              currency={budgie.currency}
            />
            <BottomPanel
              amount={9}
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
  ) : (
    <SafeAreaView>
      <Text>404</Text>
    </SafeAreaView>
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
