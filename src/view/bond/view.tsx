import { ReactElement, ReactNode, useState } from 'react';
import { Zoom } from '@material-ui/core';
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
interface IUserData {
  title: string;
  value: string;
  isDivided?: boolean;
}

export function Bond({ bond }: IBondProps): ReactElement {
  const [viewTab, setViewTab] = useState<number>(0);
  const [userData, handleUserData] = useState<IUserData[]>([]);

  const changeView = (newView: number) => (): void => setViewTab(newView);

  const onRenderTabContent = (): ReactNode => {
    let layout: ReactNode = null;
    
    switch (viewTab) {
      case 0: layout = <MintTab bond={bond} slippage={0.5} />; break;
      case 1: layout = <RedeemTab bond={bond} />; break;
    }
    
    return layout;
  };
  
  const onRenderUserData = (): ReactElement => {
    return (
      <div className="user--data card card--custom">
      
      </div>
    );
  };
  
  return (
    <div className="bond page">
      <Zoom in>
        <div className="bond__wrapper">
          <Header bond={bond} />
          <Metrics />
          <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', marginTop: 30 }}>
            {onRenderUserData()}
            <div className="form card card--custom">
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
            </div>
          </div>
          {onRenderTabContent()}
        </div>
      </Zoom>
    </div>
  );
}
