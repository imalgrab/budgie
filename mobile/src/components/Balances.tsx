import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { selectBudgieById } from '../store/budgies/selectors';
import { SIZES } from '../theme/theme';
import { MemberType } from '../utils/types';

interface Props {
  userId: string;
  budgieId: string;
  currency: string;
  members: MemberType[];
}

function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export const Balances = ({ userId, budgieId, currency, members }: Props) => {
  const budgie = useSelector((state: BudgieState) =>
    selectBudgieById(state, budgieId),
  );
  const expenses = budgie && budgie.expenses;
  const expenseCategories =
    expenses && expenses.map(expense => expense.category);

  const uniqueCategories =
    expenseCategories && expenseCategories.filter(onlyUnique);

  const [r, g, b] = [255, 87, 51];

  const pieData =
    uniqueCategories?.map((category, i) => ({
      name: category,
      number: expenseCategories?.filter(cat => cat === category).length,
      color: `rgba(${r + i * 15},${g + i * 15},${b + i * 15})`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 13,
    })) || [];

  const pieChartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  //

  const budgieMembers = budgie?.members;
  const d = budgieMembers?.map(memberName =>
    budgie?.expenses
      .filter(expense => expense.paidBy === memberName.name)
      .reduce((acc, curr) => acc + curr.amount, 0),
  );

  const barData = {
    labels: budgie?.members.map(member => member.name) || [],
    datasets: [{ data: d }],
  };

  const barChartConfig = {
    backgroundGradientFrom: '#eee',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#eee',
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(${r}, ${g}, ${b}, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 2,
    useShadowColorFromDataset: false, // optional
    fromZero: true,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZES.height}
        showsVerticalScrollIndicator={false}>
        <PieChart
          data={pieData}
          width={SIZES.width}
          height={220}
          chartConfig={pieChartConfig}
          accessor={'number'}
          backgroundColor={'transparent'}
          paddingLeft="0"
          center={[0, 0]}
          absolute
        />
        <BarChart
          fromZero
          showValuesOnTopOfBars
          style={styles.graphStyle}
          data={barData}
          width={SIZES.width}
          height={220}
          yAxisInterval={1000}
          yAxisLabel={budgie?.currency || '$'}
          yLabelsOffset={-10}
          withVerticalLabels
          withHorizontalLabels
          withInnerLines
          chartConfig={barChartConfig}
          verticalLabelRotation={0}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
  },
  graphStyle: {
    // flex: 1,
  },
});
