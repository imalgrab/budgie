import React, { useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { BudgiesContext } from '../BudgiesContext';
import { Balances } from '../components/Balances';
import { BottomPanel } from '../components/BottomPanel';
import { Expenses } from '../components/Expenses';
import { Header } from '../components/Header';
import { SwipeableNavigation } from '../components/SwipeableNavigation';

const width = Dimensions.get('window').width;

export const BudgieDetailsScreen = ({ navigation, route }: any) => {
  const { id } = route.params;
  const { getBudgieById } = useContext(BudgiesContext);
  const budgie = getBudgieById(id);
  const scrollRef = useRef<ScrollView>(null);

  return !budgie ? (
    <SafeAreaView>
      <Text>404</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <Header budgie={budgie} />
      <SwipeableNavigation
        onLeftPress={() => scrollRef.current?.scrollTo({ x: 0 })}
        onRightPress={() => scrollRef.current?.scrollTo({ x: width })}
      />
      <ScrollView
        ref={scrollRef}
        horizontal
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}>
        <View>
          <Expenses
            history={budgie.history}
            members={budgie.members}
            currency={budgie.currency}
          />
          <BottomPanel />
        </View>
        <Balances />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    padding: 5,
    elevation: 4,
  },
});
