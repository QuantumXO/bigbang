import React, { useEffect, useCallback, ReactElement, FC, memo, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcBondDetails } from '@store/slices/bond-slice';
import { loadAppDetails } from '@store/slices/app-slice';
import { loadAccountDetails, calculateUserBondDetails, calculateUserTokenDetails } from '@store/slices/account-slice';
import { IReduxState } from '@store/slices/state.interface';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import useTokens, { IAllTokenData } from '@services/hooks/tokens';
import SnackMessage from '@view/common/messages/snackbar';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import Router from '@view/common/router';
import { Dispatch } from 'redux';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useAddress, useCommonContext } from '@services/hooks/network';

import '@assets/styles/index.scss';

export const App: FC = (): ReactElement => {
  const dispatch: Dispatch<any> = useDispatch();
  const { provider, isConnected, isCheckedWallet, getIsWrongNetwork } = useCommonContext();
  const address: string = useAddress();
  const { bonds } = useBonds();
  const { tokens } = useTokens();
  const isAppLoaded: boolean = useSelector<IReduxState, boolean>(state => !Boolean(state.app.marketPrice));
  const { chainId } = useSelector((state: IReduxState) => state.network);
  
  const networkID: number = Number(chainId);
  
  useEffect((): void => {
    // #TODO check && or ||
    if (isCheckedWallet || isConnected) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
      loadDetails('userTokens');
    }
  }, [isCheckedWallet, isConnected]);

  async function loadDetails(whichDetails: string): Promise<void> {
    const loadProvider: JsonRpcProvider = provider;

    if (whichDetails === 'app') {
      loadApp(loadProvider);
    }

    if (whichDetails === 'account' && address && isConnected) {
      loadAccount(loadProvider);
      if (isAppLoaded) return;

      loadApp(loadProvider);
    }

    if (
      whichDetails === 'userBonds'
      && address
      && isConnected
      && !getIsWrongNetwork()
    ) {
      bonds.forEach((bond: IAllBondData): void => {
        dispatch(calculateUserBondDetails({ address, bond, tokens, provider }));
      });
    }

    if (
      whichDetails === 'userTokens'
      && address
      && isConnected
      && !getIsWrongNetwork()
    ) {
      tokens.forEach((token: IAllTokenData): void => {
        dispatch(calculateUserTokenDetails({ address, token, provider, networkID }));
      });
    }
  }
  
  const loadApp = useCallback(
    (loadProvider: JsonRpcProvider): void => {
      dispatch(loadAppDetails({ networkID, provider: loadProvider, bonds, tokens }));
  
      if (!getIsWrongNetwork()) {
        bonds.forEach((bond: IAllBondData): void => {
          dispatch(calcBondDetails({ bond, value: null, provider: loadProvider, networkID, tokens }));
        });
  
        tokens.forEach((token: IAllTokenData): void => {
          dispatch(calculateUserTokenDetails({ address: '', token, provider, networkID }));
        });
      }
    },
    [isConnected, tokens, bonds, getIsWrongNetwork, chainId],
  );

  const loadAccount = useCallback(
    (loadProvider: JsonRpcProvider): void => {
      dispatch(loadAccountDetails({ networkID, address, provider: loadProvider }));
    },
    [isConnected],
  );

  return (
    // @ts-ignore
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      // @ts-ignore
      content={(key: SnackbarKey, message: string): ReactNode => <SnackMessage id={key} message={JSON.parse(message)} />}
      autoHideDuration={10000}
    >
      <Router />
    </SnackbarProvider>
  );
};
