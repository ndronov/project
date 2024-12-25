import { ChartOptions, ScriptableContext } from 'chart.js';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { BLACK, FLAWED_WHITE, GRAY, GREEN, TRANSPARENT, WHITE } from '@/common';
import { TimeSpan } from '@/types';

export const timeSpans = [TimeSpan.Day, TimeSpan.Week, TimeSpan.Month, TimeSpan.Year, TimeSpan.Whole];
const LABELS_COUNT = {
  [TimeSpan.Day]: 6,
  [TimeSpan.Week]: 8,
  [TimeSpan.Month]: 6,
  [TimeSpan.Year]: 6,
  [TimeSpan.Whole]: 6,
};

const LABELS_FORMAT = {
  [TimeSpan.Day]: 'HH:mm',
  [TimeSpan.Week]: 'cccccc',
  [TimeSpan.Month]: 'dd.MM',
  [TimeSpan.Year]: "LLL''yy",
  [TimeSpan.Whole]: "LLL''yy",
};

const INTERVALS_COMPENSATION = {
  [TimeSpan.Day]: 0,
  [TimeSpan.Week]: 1,
  [TimeSpan.Month]: 0,
  [TimeSpan.Year]: 0,
  [TimeSpan.Whole]: 0,
};

function getLineColor() {
  let width: number;
  let height: number;
  let gradient: CanvasGradient;

  return function getLineGradient(context: ScriptableContext<'line'>) {
    const { chart } = context;
    const { ctx, chartArea } = chart;

    if (!chartArea) return undefined;

    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    const resized = width !== chartWidth || height !== chartHeight;

    if (!gradient || resized) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
      gradient.addColorStop(0, GRAY);
      gradient.addColorStop(1, GREEN);
    }

    return gradient;
  };
}

function getLabelIndexes(valuesCount: number, labelsCount: number, timeSpan: TimeSpan) {
  const labelInterval = Math.floor(valuesCount / (labelsCount - 1)) + INTERVALS_COMPENSATION[timeSpan];

  const leftIndexes: number[] = [];
  const rightIndexes: number[] = [];
  let i = 0;

  while (labelInterval * i < valuesCount / 2) {
    leftIndexes.push(labelInterval * i);
    rightIndexes.unshift(valuesCount - labelInterval * i - 1);
    i++;
  }

  return [...leftIndexes, ...rightIndexes];
}

function getTickLabels(index: number, dates: number[], timeSpan: TimeSpan) {
  const labelIndexes = getLabelIndexes(dates.length, LABELS_COUNT[timeSpan], timeSpan);

  if (!labelIndexes.includes(index)) return null;

  const labelTime = new Date(dates[index]);

  return format(labelTime, LABELS_FORMAT[timeSpan], { locale: ru });
}

interface GetChartOptionsArgs {
  activePointIndex: number;
  dates: number[];
  timeSpan: TimeSpan;
}

export function getChartOptions(args: GetChartOptionsArgs) {
  const { activePointIndex, timeSpan, dates } = args;

  function getPointBackgroundColor(ctx: ScriptableContext<'line'>) {
    return ctx.dataIndex === activePointIndex ? WHITE : TRANSPARENT;
  }

  function getPointBorderColor(ctx: ScriptableContext<'line'>) {
    return ctx.dataIndex === activePointIndex ? BLACK : TRANSPARENT;
  }

  function getTicks(_value: string | number, index: number) {
    return getTickLabels(index, dates, timeSpan);
  }

  const chartOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        top: 6,
        right: 0,
        bottom: 0,
        left: 0,
      },
      autoPadding: true,
    },
    elements: {
      line: {
        backgroundColor: FLAWED_WHITE,
        borderColor: getLineColor(),
        borderJoinStyle: 'round',
        borderWidth: 3,
        fill: true,
      },
      point: {
        pointStyle: 'circle',
        radius: 4,
        hoverRadius: 4,
        backgroundColor: getPointBackgroundColor,
        hoverBackgroundColor: WHITE,
        borderColor: getPointBorderColor,
        hoverBorderColor: BLACK,
        borderWidth: 3,
        hoverBorderWidth: 3,
        hitRadius: 10,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          padding: 20,
          font: {
            family: 'Manrope',
            size: 12,
            lineHeight: 1,
            weight: 500,
          },
          callback: getTicks,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return chartOptions;
}
