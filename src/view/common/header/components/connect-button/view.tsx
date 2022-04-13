import { useSelector } from 'react-redux';
import { useWeb3Context } from '@services/hooks';
import { SUPPORTED_NETWORKS_CHAIN_IDS } from '@constants/networks';
import { IReduxState } from '@store/slices/state.interface';
import { IPendingTxn } from '@store/slices/pending-txns-slice';
import CircularProgress from '@material-ui/core/CircularProgress';
import cx from 'classnames';
import network from '@services/common/network';

import './styles.scss';

export function ConnectMenu() {
  const { connect, disconnect, isConnected, chainID } = useWeb3Context();
  
  const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>((state) => {
    return state.pendingTransactions;
  });
  
  let buttonText: string = 'Connect Wallet';
  let clickFunc: any = connect;
  let btnClasses: string = '';
  
  if (isConnected) {
    buttonText = 'Disconnect';
    clickFunc = disconnect;
  }
  
  if (pendingTransactions && pendingTransactions.length > 0) {
    buttonText = `${pendingTransactions.length} Pending `;
    clickFunc = () => null;
  }

  if (isConnected && (!SUPPORTED_NETWORKS_CHAIN_IDS.includes(String(chainID)))) {
    buttonText = 'Wrong network';
    btnClasses = 'error';
    clickFunc = () => network.getIsWrongNetwork;
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