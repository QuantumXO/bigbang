import { useSelector, useDispatch } from 'react-redux';
import { IBondDetails, redeemBond } from '@store/slices/bond-slice';
import { useWeb3Context } from '@services/hooks';
import { trim, prettifySeconds, prettyVestingPeriod } from '@services/helpers';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';
import { IReduxState } from '@store/slices/state.interface';
import { IAllBondData } from '@services/hooks/bonds';
import { messages } from '@constants/messages';
import { warning } from '@store/slices/messages-slice';
import React, { ReactElement } from 'react';
import BondData from '@view/bond/components/bond-data';
import Togglers from '@view/bond/components/togglers';
import { IBond } from '@models/bond';
import { IAccount } from '@models/account';
import network from '@services/common/network';

import "./styles.scss";

interface IBondRedeem {
  bond: IAllBondData;
  handleChangeTab: () => void;
}

export function BondRedeem({ bond, handleChangeTab }: IBondRedeem): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, chainID } = useWeb3Context();

  const isBondLoading: boolean = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);
  const currentBlockTime: number = useSelector<IReduxState, number>(state => {
    return state.app.currentBlockTime;
  });
  const pendingTransactions: IPendingTxn[] = useSelector<IReduxState, IPendingTxn[]>(state => {
    return state.pendingTransactions;
  });
  const bondingState:IBondDetails = useSelector<IReduxState, IBondDetails>(state => {
    return state.bonding && state.bonding[bond.id];
  });

  const bondDetails: IAccount.IUserBondDetails = useSelector<IReduxState, IAccount.IUserBondDetails>(state => {
    return state.account.bonds && state.account.bonds[bond.id];
  });

  async function onRedeem(autostake: boolean) {
    if (await network.getIsWrongNetwork) return;
    if (bond.interestDue === 0 || bond.pendingPayout === 0) {
      dispatch(warning({ text: messages.nothing_to_claim }));
      return;
    }

    await dispatch(redeemBond({ address, bond, networkID: chainID, provider, autostake }));
  }

  const vestingTime = (): string => {
    if (!bondDetails) {
      return '';
    }
    return prettyVestingPeriod(currentBlockTime, bondDetails.bondMaturationBlock);
  };

  const vestingPeriod = (): string => {
    return prettifySeconds(bondingState?.vestingTerm, 'day');
  };
  
  const onRenderBondData = (): ReactElement => {
    const bondData: IBond.IUserData[] = [
      {
        id: 'pendingRewards',
        label: 'Pending Rewards',
        value: `${trim(bond.interestDue, 8)} ${'BIG'}`,
      },
      {
        isDivided: true,
        id: 'claimableRewards',
        label: 'Claimable Rewards',
        value: `${trim(bond.pendingPayout, 10)} ${'BIG'}`,
      },
      {
        isDivided: true,
        id: 'timeUntilFullyVested',
        label: 'Time until fully vested',
        value: vestingTime(),
      },
      {
        id: 'ROI',
        label: 'Discount',
        value: `${trim(bond.bondDiscount * 100, 2)}%`,
      },
      {
        id: 'vestingTerm',
        label: 'Vesting Term',
        value: vestingPeriod(),
      },
    ];
    return <BondData data={bondData} isBondLoading={isBondLoading} />;
  }
  
  const onRenderActionsBtns = (): ReactElement => {
    return (
      <>
        <div
          className="action__btn btn__primary--fulfilled claim"
          onClick={() => {
            if (isPendingTxn(pendingTransactions, 'redeem_bond_' + bond.id)) return;
            onRedeem(false);
          }}
        >
          {txnButtonText(pendingTransactions, 'redeem_bond_' + bond.id, 'Claim')}
        </div>
        <div
          className="action__btn claim--autostake"
          onClick={() => {
            if (isPendingTxn(pendingTransactions, 'redeem_bond_' + bond.id + '_autostake')) return;
            onRedeem(true);
          }}
        >
          {txnButtonText(
            pendingTransactions,
            'redeem_bond_' + bond.id + '_autostake',
            'Claim and Autostake'
          )}
        </div>
      </>
    );
  };

  return (
    <div className="tab__content redeem">
      <div className="tab__inner">
        {onRenderBondData()}
  
        <div className="form--card card card--custom">
          <Togglers handleChangeView={handleChangeTab} activeTabIndex={1} />
          <div className="form--card__inner">
            {onRenderActionsBtns()}
          </div>
        </div>
      </div>
    </div>
  );
}