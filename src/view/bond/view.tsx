import { ReactElement, ReactNode, useState } from 'react';
import { Zoom } from '@material-ui/core';
import Header from './components/header';
import Metrics from './components/metrics';
import RedeemTab from './components/redeem';
import MintTab from './components/mint';
import { IAllBondData } from '@services/hooks/bonds';

import './styles.scss';

interface IBondProps {
  bond: IAllBondData;
}

export function Bond({ bond }: IBondProps): ReactElement {
  const [viewTab, setViewTab] = useState<number>(0);

  const onRenderTabContent = (): ReactNode => {
    let layout: ReactNode = null;
    switch (viewTab) {
      case 0: layout = <MintTab bond={bond} slippage={0.5} handleChangeTab={() => setViewTab(1)}/>; break;
      case 1: layout = <RedeemTab bond={bond} handleChangeTab={() => setViewTab(0)} />; break;
    }
    
    return layout;
  };
  
  return (
    <div className="bond page">
      <Zoom in>
        <div className="bond__wrapper">
          <Header bond={bond} />
          <Metrics />
          {onRenderTabContent()}
        </div>
      </Zoom>
    </div>
  );
}
