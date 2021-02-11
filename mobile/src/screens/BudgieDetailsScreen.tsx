import React, { Fragment, useRef, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Divider,
  IconButton,
  List,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Balances } from '../components/Balances';
import { BottomPanel } from '../components/BottomPanel';
import { Expenses } from '../components/Expenses';
import { SwipeableNavigation } from '../components/SwipeableNavigation';
import { setStatusIdle } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import {
  selectBudgieById,
  selectStatus,
  selectUserId,
} from '../store/budgies/selectors';
import { COLORS, FONTS, SIZES, STYLES } from '../theme/theme';
import {
  BudgieDetailsScreenRouteProp,
  BudgieDetailsScreenNavigationProp,
  SortingCategory,
} from '../utils/types';

interface Props {
  navigation: BudgieDetailsScreenNavigationProp;
  route: BudgieDetailsScreenRouteProp;
}

export const BudgieDetailsScreen = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const { budgieId } = route.params;
  const status = useSelector(selectStatus);
  const userId = useSelector(selectUserId);
  const budgie = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId),
  );

  const scrollRef = useRef<ScrollView>(null);
  const [balancesActive, setBalancesActive] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [sortingCategory, setSortingCategory] = useState<SortingCategory>(null);
  const [sortDescending, setSortDescending] = useState(false);

  const categories: SortingCategory[] = ['title', 'amount', 'date'];
  const menu = (
    <View style={styles.menu}>
      <View style={styles.code}>
        <Text style={[FONTS.light, styles.codeTitle]}>Code:</Text>
        <Text selectable style={FONTS.normal}>
          {budgieId}
        </Text>
      </View>
      <Divider focusable />
      <List.Item
        title="Edit budgie"
        titleStyle={[FONTS.light, { color: COLORS.secondary }]}
        left={() => (
          <IconButton
            icon="pencil-outline"
            size={SIZES.big}
            color={COLORS.secondary}
          />
        )}
        onPress={() => navigation.navigate('CreateBudgie', { budgieId })}
      />
      <Divider focusable />
      <List.Item
        title=""
        titleStyle={[FONTS.light, { color: COLORS.secondary }]}
        left={() => (
          <IconButton
            icon={sortDescending ? 'sort-descending' : 'sort-ascending'}
            onPress={() => setSortDescending(!sortDescending)}
            size={SIZES.big}
            color={COLORS.secondary}
          />
        )}
        right={() => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={STYLES.rowCentered}>
            {categories.map(category => (
              <Button
                key={category}
                focusable
                onPress={() => setSortingCategory(category)}
                mode="text"
                labelStyle={[FONTS.light, styles.sortingCategory]}>
                {category}
              </Button>
            ))}
          </ScrollView>
        )}
      />
      <Divider focusable />
      <List.Item
        title="Synchronize"
        titleStyle={[FONTS.light, { color: COLORS.secondary }]}
        left={() => (
          <IconButton icon="sync" size={SIZES.big} color={COLORS.secondary} />
        )}
        onPress={() => dispatch(setStatusIdle())}
      />
      <Divider focusable />
    </View>
  );

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
  if (!budgie || !userId) {
    return (
      <SafeAreaView>
        <Text>Budgie or user not found</Text>
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
            subtitle={budgie.members.map(member => member.name).join(', ')}
          />
          {!balancesActive && (
            <Appbar.Action
              size={SIZES.big}
              icon={menuVisible ? 'chevron-up' : 'chevron-down'}
              onPress={() => setMenuVisible(!menuVisible)}
            />
          )}
        </Appbar.Header>
        {menuVisible && menu}
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
          <View style={styles.content}>
            <Expenses
              sortBy={sortingCategory}
              descending={sortDescending}
              budgieId={budgieId}
              currency={budgie.currency}
              members={budgie.members}
            />
            <BottomPanel
              userId={userId}
              budgieId={budgieId}
              currency={budgie.currency}
              members={budgie.members}
            />
          </View>
          <Balances
            userId={userId}
            budgieId={budgieId}
            currency={budgie.currency}
            members={budgie.members}
          />
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
  content: {
    backgroundColor: COLORS.white,
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
  menu: {
    backgroundColor: COLORS.white,
    paddingBottom: 10,
  },
  code: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeTitle: {
    marginBottom: 5,
  },
  sortingCategory: {
    color: COLORS.secondary,
  },
});
