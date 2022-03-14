import { FC, ReactElement, useState } from 'react';
import DonutChart from './components/chart';
import Card from './components/card';
import { ICardProps } from '@view/fund/components/card/view';
import { Grid } from '@material-ui/core';

import "./styles.scss";
import { DataEntry as IChartDataItem } from 'react-minimal-pie-chart/types/commonTypes';

const mockCards: (Omit<ICardProps, 'handleSelect'>)[] = [
  { index: 0, title: 'Liquidity Pool, (35%)', value: '255,658,248.09', color: '#A250E3', percent: 5 },
  { index: 1, title: 'Wallet, (32%)', value: '235,766,655.10', color: '#E3507A', percent: 20 },
  { index: 2, title: 'Wallet, (32%)', value: '235,766,655.10', color: 'green', percent: 75 },
];

const mockDonutChartData: IChartDataItem[] = mockCards.map((item: Omit<ICardProps, 'handleSelect'>): IChartDataItem => {
  const { title, percent = 0, color } = item;
  return {
    title,
    value: percent,
    color
  };
});

export const Fund: FC = (): ReactElement => {
  const [selectedMainCardIndex, handleSelectedMainCardIndex] = useState<undefined | number>();
  
  const onHandleMainCardSelect = (index: number): void => {
    handleSelectedMainCardIndex(index);
  }
  
  return (
    <div className="fund page">
      <main className="main">
        <div className="header">
          <div className="title">{'Net Worth'}</div>
          <div className="sbt">{'$721,163,357.12'}</div>
        </div>
        <div className="container">
          <DonutChart
            data={mockDonutChartData}
            selectedItemIndex={selectedMainCardIndex}
          />
          <Grid
            container
            className="data"
            justifyContent="space-between"
          >
            {mockCards.map((item: Omit<ICardProps, 'handleSelect'>, index: number): ReactElement => {
              return (
                <Card
                  key={index}
                  {...item}
                  handleSelect={onHandleMainCardSelect}
                />
              );
            })}
          </Grid>
        </div>
      </main>
    </div>
  );
};