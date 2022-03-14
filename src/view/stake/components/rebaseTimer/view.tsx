import { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { secondsUntilBlock, prettifySeconds } from '@services/helpers';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { IReduxState } from '@store/slices/state.interface';

import './styles.scss';

export function RebaseTimer(): ReactElement {
  let layout: ReactElement;
  
  const currentBlockTime: number = useSelector<IReduxState, number>(state => {
    return state.app.currentBlockTime;
  });
  const nextRebase: number = useSelector<IReduxState, number>(state => {
    return state.app.nextRebase;
  });

  const timeUntilRebase = useMemo(() => {
    if (currentBlockTime && nextRebase) {
      const seconds = secondsUntilBlock(currentBlockTime, nextRebase);
      return prettifySeconds(seconds);
    }
  }, [currentBlockTime, nextRebase]);

  if (currentBlockTime) {
    if (timeUntilRebase) {
      layout = (
        <>
          <strong>{timeUntilRebase}</strong> to Next Rebase
        </>
      );
    } else {
      layout = <strong>Rebasing</strong>;
    }
  } else {
    layout = <Skeleton width="200px" />;
  }
  
  return (
    <Box className="rebase--timer">
      <div>{layout}</div>
    </Box>
  );
}
