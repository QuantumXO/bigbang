import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3Context } from '@services/hooks';
import { DEFAULD_NETWORK } from '@constants/index';
import { IReduxState } from '@store/slices/state.interface';
import { IPendingTxn } from '@store/slices/pending-txns-slice';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles.scss';

export function ConnectMenu() {
  const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork } = useWeb3Context();
  const [isConnected, setConnected] = useState(connected);
  
  const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>((state) => {
    return state.pendingTransactions;
  });
  
  let buttonText = 'Connect Wallet';
  let clickFunc: any = connect;
  let buttonStyle = {};
  
  if (isConnected) {
    buttonText = 'Disconnect';
    clickFunc = disconnect;
  }
  
  if (pendingTransactions && pendingTransactions.length > 0) {
    buttonText = `${pendingTransactions.length} Pending `;
    clickFunc = () => {};
  }
  
  if (isConnected && providerChainID !== DEFAULD_NETWORK) {
    buttonText = 'Wrong network';
    buttonStyle = { backgroundColor: 'rgb(255, 67, 67)' };
    clickFunc = () => {
      checkWrongNetwork();
    };
  }
  
  useEffect((): void => {
    setConnected(connected);
  }, [web3, connected]);
  
  return (
    <div className="button--connect" style={buttonStyle} onClick={clickFunc}>
      <span>{buttonText}</span>
      {!!pendingTransactions.length && (
        <div className="button--connect--progress">
          <CircularProgress size={15} color="inherit" />
        </div>
      )}
    </div>
  );
}