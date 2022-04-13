import React, { useEffect, useState, useCallback, ReactElement, FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddress, useWeb3Context } from '@services/hooks';
import { calcBondDetails } from '@store/slices/bond-slice';
import { loadAppDetails } from '@store/slices/app-slice';
import { loadAccountDetails, calculateUserBondDetails, calculateUserTokenDetails } from '@store/slices/account-slice';
import { IReduxState } from '@store/slices/state.interface';
import useBonds, { IAllBondData } from '@services/hooks/bonds';
import useTokens, { IAllTokenData } from '@services/hooks/tokens';
import SnackMessage from '@view/common/messages/snackbar';
import { SnackbarProvider } from 'notistack';
import Router from '@view/router';
import { Dispatch } from 'redux';
import { JsonRpcProvider } from '@ethersproject/providers';

import '@assets/styles/index.scss';

export const App: FC = memo((): ReactElement => {
  const dispatch: Dispatch<any> = useDispatch();
  const { connect, provider, hasCachedProvider, chainID, isConnected } = useWeb3Context();
  const address: string = useAddress();
  const { bonds } = useBonds();
  const { tokens } = useTokens();
  const isAppLoaded: boolean = useSelector<IReduxState, boolean>(state => !Boolean(state.app.marketPrice));
  
  const [walletChecked, setWalletChecked] = useState<boolean>(false);
  
  useEffect((): void => {
    (async function() {
      if (hasCachedProvider()) {
        await connect();
        setWalletChecked(true);
      } else {
        setWalletChecked(true);
      }
    })()
  }, []);
  
  useEffect((): void => {
    // #TODO check && or ||
    if (walletChecked && isConnected) {
      loadDetails('app');
      loadDetails('account');
      loadDetails('userBonds');
      loadDetails('userTokens');
    }
  }, [walletChecked, isConnected]);

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
      bonds.map((bond: IAllBondData): void => {
        dispatch(calculateUserBondDetails({ address, bond, networkID: chainID, provider }));
      });
    }

    if (whichDetails === 'userTokens' && address && isConnected) {
      tokens.map((token: IAllTokenData): void => {
        dispatch(calculateUserTokenDetails({ address, token, provider, networkID: chainID }));
      });
    }
  }
  
  const loadApp = useCallback(
    (loadProvider: JsonRpcProvider): void => {
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
    (loadProvider: JsonRpcProvider): void => {
      dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
    },
    [isConnected],
  );

  return (
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
});
