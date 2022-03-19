import { useSelector, useDispatch } from 'react-redux';
import { Box, Slide } from '@material-ui/core';
import { IBondDetails, redeemBond } from '@store/slices/bond-slice';
import { useWeb3Context } from '@services/hooks';
import { trim, prettifySeconds, prettyVestingPeriod } from '@services/helpers';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';
import { Skeleton } from '@material-ui/lab';
import { IReduxState } from '@store/slices/state.interface';
import { IAllBondData } from '@services/hooks/bonds';
import { IUserBondDetails } from '@store/slices/account-slice';
import { messages } from '@constants/messages';
import { warning } from '@store/slices/messages-slice';
import { ReactElement } from 'react';

import "./styles.scss";

interface IBondRedeem {
  bond: IAllBondData;
}

export function BondRedeem({ bond }: IBondRedeem): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, chainID, checkIsWrongNetwork } = useWeb3Context();

  const isBondLoading: boolean = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);
  const currentBlockTime: number = useSelector<IReduxState, number>(state => {
    return state.app.currentBlockTime;
  });
  const pendingTransactions: IPendingTxn[] = useSelector<IReduxState, IPendingTxn[]>(state => {
    return state.pendingTransactions;
  });
  const bondingState:IBondDetails = useSelector<IReduxState, IBondDetails>(state => {
    return state.bonding && state.bonding[bond.name];
  });

  const bondDetails: IUserBondDetails = useSelector<IReduxState, IUserBondDetails>(state => {
    return state.account.bonds && state.account.bonds[bond.name];
  });

  async function onRedeem(autostake: boolean) {
    if (await checkIsWrongNetwork()) return;

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
    return prettifySeconds(bondingState.vestingTerm, 'day');
  };
  
  const onRenderBondData = (): ReactElement => {
    return (
      <Slide direction="right" in={true} mountOnEnter unmountOnExit {...{ timeout: 533 }}>
        <Box className="data">
          <div className="data__row">
            <div className="data__row__title">{'Pending Rewards'}</div>
            <div className="data__row__value">
              {isBondLoading
                ? <Skeleton width="100px" />
                : `${trim(bond.interestDue, 4)} ${'tokenType'}`
              }
            </div>
          </div>
          <div className="data__row">
            <div className="data__row__title">{'Claimable Rewards'}</div>
            <div className="data__row__value">
              {isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.pendingPayout, 4)} ${'tokenType'}`}
            </div>
          </div>
          <div className="data__row">
            <div className="data__row__title">{'Time until fully vested'}</div>
            <div className="data__row__value">
              {isBondLoading ? <Skeleton width="100px" /> : vestingTime()}
            </div>
          </div>
          <div className="data__row">
            <div className="data__row__title">ROI</div>
            <div className="data__row__value">
              {isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}
            </div>
          </div>
          <div className="data__row">
            <div className="data__row__title">Vesting Term</div>
            <div className="data__row__value">{isBondLoading ? <Skeleton width="100px" /> : vestingPeriod()}</div>
          </div>
        </Box>
      </Slide>
    );
  }

  return (
    <div className="redeem__tab">
      <div className="redeem__tab__inner">
        <div
          className="action__btn"
          onClick={() => {
            if (isPendingTxn(pendingTransactions, 'redeem_bond_' + bond.name)) return;
            onRedeem(false);
          }}
        >
          {txnButtonText(pendingTransactions, 'redeem_bond_' + bond.name, 'Claim')}
        </div>
        <div
          className="action__btn"
          onClick={() => {
            if (isPendingTxn(pendingTransactions, 'redeem_bond_' + bond.name + '_autostake')) return;
            onRedeem(true);
          }}
        >
          {txnButtonText(
            pendingTransactions,
            'redeem_bond_' + bond.name + '_autostake',
            'Claim and Autostake'
          )}
        </div>
      </div>
  
      {onRenderBondData()}
    </div>
  );
}