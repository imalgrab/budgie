import React, { useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { BudgiesContext } from '../BudgiesContext';
import { Balances } from '../components/Balances';
import { Expenses } from '../components/Expenses';
import { SwipeableNavigation } from '../components/SwipeableNavigation';

const width = Dimensions.get('window').width;

export const BudgieDetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { getBudgieById } = useContext(BudgiesContext);

  const scrollRef = useRef<ScrollView>(null);

  const budgie = getBudgieById(id);
  if (!budgie) {
    return (
      <SafeAreaView>
        <Text>404</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            title={budgie.title}
            subtitle={budgie.members.join(', ')}
            style={styles.header}
          />
        </Appbar.Header>
        <SwipeableNavigation
          onLeftPress={() =>
            scrollRef.current?.scrollTo({ x: 0, animated: true })
          }
          onRightPress={() =>
            scrollRef.current?.scrollTo({ x: width, animated: true })
          }
        />
        <ScrollView
          ref={scrollRef}
          horizontal
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}>
          <Expenses
            history={budgie.history}
            members={budgie.members}
            currency={budgie.currency}
          />
          <Balances />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  surface: {
    padding: 5,
    elevation: 4,
  },
});
