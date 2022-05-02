import { useSelector } from 'react-redux';
import { SUPPORTED_NETWORKS_CHAIN_IDS } from '@constants/networks';
import { IReduxState } from '@store/slices/state.interface';
import { IPendingTxn } from '@store/slices/pending-txns-slice';
import CircularProgress from '@material-ui/core/CircularProgress';
import cx from 'classnames';
import { useCommonContext } from '@services/hooks/network';
import { ReactElement } from 'react';

import './styles.scss';

export function ConnectMenu(): ReactElement {
  const { chainId } = useSelector((state: IReduxState) => state.network);
  const { onConnect, onDisconnect, isConnected } = useCommonContext();
  
  const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>((state) => {
    return state.pendingTransactions;
  });
  
  let buttonText: string = 'Connect Wallet';
  let clickFunc: any = onConnect;
  let btnClasses: string = '';
  
  if (isConnected) {
    buttonText = 'Disconnect';
    clickFunc = onDisconnect;
  }
  
  if (pendingTransactions && pendingTransactions.length > 0) {
    buttonText = `${pendingTransactions.length} Pending`;
    clickFunc = () => null;
  }

  if (isConnected && (!SUPPORTED_NETWORKS_CHAIN_IDS.includes(String(chainId)))) {
    buttonText = 'Wrong network';
    btnClasses = 'error';
    clickFunc = () => null;
  }
  
  return (
    <div
      onClick={clickFunc}
      className={cx('button--connect', { [btnClasses]: !!btnClasses })}
    >
      <span>{buttonText}</span>
      {!!pendingTransactions.length && (
        <div className="button--connect--progress">
          <CircularProgress size={15} color="inherit" />
        </div>
      )}
    </div>
  );
}