import { CSSProperties, FC, ReactElement, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { DataEntry as IChartDataItem } from 'react-minimal-pie-chart/types/commonTypes';
import { LabelRenderProps } from 'react-minimal-pie-chart/types/Label';

import "./styles.scss";

interface IProps {
  data?: IChartDataItem[];
  selectedItemIndex?: number;
}

export const Chart: FC<IProps> = ({ data = [], selectedItemIndex }: IProps): ReactElement => {
  const [selectedSegmentIndex, setSelected] = useState<number | undefined>(selectedItemIndex);
  
  const onHandleClick = (e: any, segmentIndex: number): void => setSelected(segmentIndex);
  
  const onSetSegmentsStyle = (segmentIndex: number): CSSProperties => ({
    strokeWidth: segmentIndex === selectedSegmentIndex ? 8.2 : 6.3,
  });
  
  const onSetLabel = (args: LabelRenderProps): number | string | ReactElement | undefined | null => {
    const { dataEntry: { value }, dataIndex } = args;
    let result: number | string | ReactElement | undefined | null;
    if (dataIndex === selectedSegmentIndex) {
      result = (
        <text
          x="50"
          y="50"
          dx="0"
          dy="0"
          textAnchor="middle"
          className="chart__label"
          dominantBaseline="central"
        >
          {`$${value}`}
        </text>
      );
    }
    return result;
  };
  
  return (
    <div className="chart donut">
      <PieChart
        animate
        radius={49}
        data={data}
        lineWidth={15}
        labelPosition={0}
        className="chart__svg"
        label={onSetLabel}
        onClick={onHandleClick}
        segmentsStyle={onSetSegmentsStyle}
      />
    </div>
  );
};