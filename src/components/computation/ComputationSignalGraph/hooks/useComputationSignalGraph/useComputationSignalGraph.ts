import React, { useCallback, useMemo, useRef } from 'react';
import { getElementAtEvent } from 'react-chartjs-2';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { Chart as ChartJS } from 'chart.js';
import { TabMenuTabChangeEvent } from 'primereact/tabmenu';

import {
  computationSignalActivePointIndexState,
  computationSignalDataState,
  computationSignalTimeSpanState,
} from '@/stores';

import { getChartOptions, timeSpans } from './logic';

export function useComputationSignalGraph() {
  const data = useRecoilValue(computationSignalDataState);
  const resetData = useResetRecoilState(computationSignalDataState);

  const [timeSpan, setTimeSpan] = useRecoilState(computationSignalTimeSpanState);
  const resetTimeSpan = useResetRecoilState(computationSignalTimeSpanState);

  const [activePointIndex, setActivePointIndex] = useRecoilState(computationSignalActivePointIndexState);
  const resetActivePointIndex = useResetRecoilState(computationSignalActivePointIndexState);

  const chartData = useMemo(
    () => ({
      datasets: [{ data: data?.graph.data ?? [] }],
      labels: data?.graph.data ?? [],
    }),
    [data?.graph.data],
  );

  const chartRef = useRef<ChartJS<'line'>>();

  const handleChartClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      const chart = chartRef.current;

      if (!chart) return;

      const [interactionItem] = getElementAtEvent(chart, event);

      if (!interactionItem) return;

      const { index } = interactionItem.element.getProps(['$context']).$context;

      setActivePointIndex(index);
    },
    [setActivePointIndex],
  );

  const chartOptions = useMemo(
    () =>
      getChartOptions({
        activePointIndex,
        dates: data?.graph.dates ?? [],
        timeSpan,
      }),
    [activePointIndex, data?.graph.dates, timeSpan],
  );

  const clearData = () => {
    resetData();
    resetTimeSpan();
    resetActivePointIndex();
  };

  const activeTabIndex = timeSpans.indexOf(timeSpan);

  const handleTabChange = useCallback(
    (e: TabMenuTabChangeEvent) => {
      setTimeSpan(timeSpans[e.index]);
    },
    [setTimeSpan],
  );

  return {
    activeTabIndex,
    chartData,
    chartOptions,
    chartRef,
    clearData,
    handleChartClick,
    handleTabChange,
    timeSpan,
  };
}
