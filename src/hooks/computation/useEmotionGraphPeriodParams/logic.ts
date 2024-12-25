import { subDays, subMonths, subWeeks, subYears } from 'date-fns';

import { TimeSpan } from '@/types';

const APP_START_TIME = '2019-12-31T04:16:11+0000'; // Tue Dec 31 2019 11:16:11 GMT+0700 (Novosibirsk Standard Time)

export function getDateRange(timeSpan: TimeSpan): {
  dateStart: number;
  dateEnd: number;
} {
  const now = Date.now();

  switch (timeSpan) {
    case TimeSpan.Day: {
      const oneDayBefore = subDays(now, 1);

      return {
        dateStart: oneDayBefore.valueOf(),
        dateEnd: now,
      };
    }

    case TimeSpan.Week: {
      const oneWeekBefore = subWeeks(now, 1);

      return {
        dateStart: oneWeekBefore.valueOf(),
        dateEnd: now,
      };
    }

    case TimeSpan.Month: {
      const oneMonthBefore = subMonths(now, 1);

      return {
        dateStart: oneMonthBefore.valueOf(),
        dateEnd: now,
      };
    }

    case TimeSpan.Year: {
      const oneYearBefore = subYears(now, 1);

      return {
        dateStart: oneYearBefore.valueOf(),
        dateEnd: now,
      };
    }

    case TimeSpan.Whole: {
      return {
        dateStart: new Date(APP_START_TIME).valueOf(),
        dateEnd: now,
      };
    }

    default:
      return {
        dateStart: -1,
        dateEnd: -1,
      };
  }
}
