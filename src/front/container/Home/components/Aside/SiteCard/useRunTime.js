import { useMount,useSafeState } from 'ahooks';
import dayjs from 'dayjs';

const time = '2022-07-12 20:00:00';

export const useRunTime = () => {
  const [runTime, setRunTime] = useSafeState(0);

  useMount(() => {
    const nowTime = new Date().getTime();
    const startTime = new Date(time).getTime();
    const runTime = dayjs(nowTime).diff(dayjs(startTime), 'days');
    setRunTime(runTime);
  });

  return { runTime };
};
