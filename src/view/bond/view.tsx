import { ReactElement, ReactNode, useState } from 'react';
import { Grid, Backdrop, Fade } from '@material-ui/core';
import Header from './components/header';
import Metrics from './components/metrics';
import RedeemTab from './components/redeem';
import MintTab from './components/mint';
import { IAllBondData } from '@services/hooks/bonds';
import cx from 'classnames';

import './styles.scss';

interface IBondProps {
  bond: IAllBondData;
}

export function Bond({ bond }: IBondProps): ReactElement {
  const [slippage, setSlippage] = useState<number>(0.5);
  const [viewTab, setViewTab] = useState<number>(0);

  const onSlippageChange = (value: any): void => setSlippage(value);

  const changeView = (newView: number) => (): void => setViewTab(newView);

  const onRenderTabs = (): ReactNode => {
    let layout: ReactNode = null;
    
    switch (viewTab) {
      case 0: layout = <MintTab bond={bond} slippage={slippage} />; break;
      case 1: layout = <RedeemTab bond={bond} />; break;
    }
    
    return layout;
  }; 
  
  return (
    <Fade in={true} mountOnEnter unmountOnExit>
      <Grid className="bond modal">
        <Backdrop open={true} className="bond__backdrop">
          <Fade in={true}>
            <div className="bond__wrapper">
              <Header bond={bond} slippage={slippage} onSlippageChange={onSlippageChange} />
              <Metrics />
              
              <div className="bond__togglers">
                <div
                  className={cx('bond__togglers__btn', { active: !viewTab })}
                  onClick={changeView(0)}
                >
                  {'Mint'}
                </div>
                <div
                  className={cx('bond__togglers__btn', { active: viewTab })}
                  onClick={changeView(1)}
                >
                  {'Redeem'}
                </div>
              </div>
  
              {onRenderTabs()}
            </div>
          </Fade>
        </Backdrop>
      </Grid>
    </Fade>
  );
}
