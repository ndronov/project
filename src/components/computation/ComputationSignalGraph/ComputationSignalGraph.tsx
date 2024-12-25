import { Line } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import clsx from 'clsx';
import { useUpdateEffect } from 'primereact/hooks';
import { TabMenu } from 'primereact/tabmenu';

import { useComputationSignalData, useSomeUserReference } from '@/hooks';
import { ComputationSignalVariant } from '@/types';

import styles from './EmotionGraph.module.css';
import { useComputationSignalGraph } from './hooks';
import { tabMenuModel } from './logic';

ChartJS.register(CategoryScale, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip);

interface Props {
  variant?: ComputationSignalVariant;
}

export function ComputationSignalGraph(props: Props) {
  const { variant = 'global' } = props;

  useComputationSignalData({ variant, prefetch: true });

  const { activeTabIndex, chartData, chartOptions, chartRef, clearData, handleChartClick, handleTabChange } =
    useComputationSignalGraph();

  const { userId } = useSomeUserReference();

  useUpdateEffect(clearData, [userId]);

  return (
    <div className="bg-white">
      <TabMenu
        activeIndex={activeTabIndex}
        className={clsx('p-4', styles.tabMenu)}
        model={tabMenuModel}
        onTabChange={handleTabChange}
      />

      <div className={clsx('relative', styles.chart)}>
        <Line options={chartOptions} data={chartData} ref={chartRef} onClick={handleChartClick} />
      </div>
    </div>
  );
}
