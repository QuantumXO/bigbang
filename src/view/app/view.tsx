import React, { useEffect, useState, useCallback, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddress, useWeb3Context } from '@services/hooks';
import { calcBondDetails } from '@store/slices/bond-slice';
import { loadAppDetails } from '@store/slices/app-slice';
import { loadAccountDetails, calculateUserBondDetails, calculateUserTokenDetails } from '@store/slices/account-slice';
import { IReduxState } from '@store/slices/state.interface';
import Loading from '../common/loader';
import useBonds from '@services/hooks/bonds';
import '@assets/styles/index.scss';
import useTokens from '@services/hooks/tokens';
import { loadTokenPrices } from '@services/helpers';
import SnackMessage from '@view/common/messages/snackbar';
import { SnackbarProvider } from 'notistack';
import Router from '@view/router';
import { Dispatch } from 'redux';

export function App(): ReactElement {
  const dispatch: Dispatch<any> = useDispatch();
  const { connect, provider, hasCachedProvider, chainID, isConnected } = useWeb3Context();
  
  console.log('useWeb3Context(): ', useWeb3Context());
  
  const address = useAddress();
  const { bonds } = useBonds();
  const { tokens } = useTokens();
  let layout: ReactElement;
  
  const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
  const isAppLoaded = useSelector<IReduxState, boolean>(state => !Boolean(state.app.marketPrice));
  
  const [walletChecked, setWalletChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect((): void => {
    loadTokenPrices().then(() => setLoading(false));
  }, []);

  async function loadDetails(whichDetails: string) {
    const loadProvider = provider;

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
    loadProvider => {
      dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
      bonds.map(bond => {
        dispatch(calcBondDetails({ bond, value: null, provider: loadProvider, networkID: chainID }));
      });
      tokens.map(token => {
        dispatch(calculateUserTokenDetails({ address: '', token, provider, networkID: chainID }));
      });
    },
    [isConnected],
  );

  const loadAccount = useCallback(
    loadProvider => {
      dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
    },
    [isConnected],
  );

  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);

  useEffect(() => {
    if (walletChecked) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
      loadDetails('userTokens');
    }
  }, [walletChecked]);

  useEffect(() => {
    if (isConnected) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
      loadDetails('userTokens');
    }
  }, [isConnected]);

  if (isAppLoading || loading) {
    layout = <Loading />;
  }
  else {
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
