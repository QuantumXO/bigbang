import React, { useEffect, useState, useCallback, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddress, useWeb3Context } from '@services/hooks';
import { calcBondDetails } from '@store/slices/bond-slice';
import { loadAppDetails } from '@store/slices/app-slice';
import { loadAccountDetails, calculateUserBondDetails, calculateUserTokenDetails } from '@store/slices/account-slice';
import { IReduxState } from '@store/slices/state.interface';
import Loading from '../common/loader';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import useTokens, { IAllTokenData } from '@services/hooks/tokens';
import { loadTokenPrices } from '@services/helpers';
import SnackMessage from '@view/common/messages/snackbar';
import { SnackbarProvider } from 'notistack';
import Router from '@view/router';
import { Dispatch } from 'redux';
import { JsonRpcProvider } from '@ethersproject/providers';

import '@assets/styles/index.scss';

export function App(): ReactElement {
  const dispatch: Dispatch<any> = useDispatch();
  const { connect, provider, hasCachedProvider, chainID, isConnected } = useWeb3Context();
  const address: string = useAddress();
  const { bonds } = useBonds();
  const { tokens } = useTokens();
  const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
  const isAppLoaded = useSelector<IReduxState, boolean>(state => !Boolean(state.app.marketPrice));
  let layout: ReactElement;
  
  const [walletChecked, setWalletChecked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  useEffect((): void => {
    loadTokenPrices().then(() => setLoading(false));
  }, []);

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

    if (whichDetails === 'userBonds' && address && isConnected) {
      bonds.map(bond => {
        dispatch(calculateUserBondDetails({ address, bond, provider, networkID: chainID }));
      });
    }

    if (whichDetails === 'userTokens' && address && isConnected) {
      tokens.map(token => {
        dispatch(calculateUserTokenDetails({ address, token, provider, networkID: chainID }));
      });
    }
  }

  const loadApp = useCallback(
    (loadProvider) => {
      dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
      bonds.map((bond: IAllBondData): void => {
        dispatch(calcBondDetails({ bond, value: null, provider: loadProvider, networkID: chainID }));
      });
      tokens.map((token: IAllTokenData): void => {
        dispatch(calculateUserTokenDetails({ address: '', token, provider, networkID: chainID }));
      });
    },
    [isConnected],
  );

  const loadAccount = useCallback(
    (loadProvider) => {
      dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
    },
    [isConnected],
  );

  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => setWalletChecked(true));
    } else {
      setWalletChecked(true);
    }
  }, []);

  useEffect((): void => {
    if (walletChecked) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
      loadDetails('userTokens');
    }
  }, [walletChecked]);

  useEffect((): void => {
    if (isConnected) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
      loadDetails('userTokens');
    }
  }, [isConnected]);

  if (isAppLoading || isLoading) {
    layout = <Loading />;
  } else {
    layout = (
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        content={(key, message: string) => <SnackMessage id={key} message={JSON.parse(message)} />}
        autoHideDuration={10000}
      >
        <Router />
      </SnackbarProvider>
    );
  }

  return layout;
}
