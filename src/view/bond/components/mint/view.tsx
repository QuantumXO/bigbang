import { useState, useEffect, useCallback, ReactElement, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OutlinedInput, InputAdornment, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { trim, prettifySeconds } from '@services/helpers';
import { changeApproval, bondAsset, calcBondDetails } from '@store/slices/bond-slice';
import { useWeb3Context } from '@services/hooks';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';
import { IReduxState } from '@store/slices/state.interface';
import { IAllBondData } from '@services/hooks/bonds';
import useDebounce from '@services/hooks/debounce';
import { messages } from '@constants/messages';
import { warning } from '@store/slices/messages-slice';
import BondData from '@view/bond/components/bond-data';
import Togglers from '@view/bond/components/togglers';
import { IBond } from '@models/bond';
import * as React from 'react';
import cx from 'classnames';

import "./styles.scss";

interface IBondPurchaseProps {
  bond: IAllBondData;
  slippage: number;
  handleChangeTab: () => void;
}

export function MintTab({ bond, slippage, handleChangeTab }: IBondPurchaseProps): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, chainID, getIsWrongNetwork } = useWeb3Context();

  const [quantity, setQuantity] = useState<string>('');
  const [useNativeCurrency, setUseNativeCurrency] = useState<boolean>(false);
  
  const bondDetailsDebounce = useDebounce(quantity, 1000);
  const displayUnits: string = useNativeCurrency ? 'AVAX' : bond.displayUnits;
  
  useEffect((): void => {
    dispatch(calcBondDetails({ bond, value: quantity, provider, networkID: chainID }));
  }, [bondDetailsDebounce]);
  
  const hasAllowance = useCallback((): boolean => {
    return bond.allowance > 0;
  }, [bond.allowance]);
  
  const pendingTransactions: IPendingTxn[] = useSelector<IReduxState, IPendingTxn[]>(state => {
    return state.pendingTransactions;
  });

  const vestingPeriod = (): string => prettifySeconds(bond.vestingTerm, 'day');

  async function onBond() {
    if (await getIsWrongNetwork()) return;
    
    if (quantity === '') {
      dispatch(warning({ text: messages.before_minting }));
      //@ts-ignore
    } else if (isNaN(quantity)) {
      dispatch(warning({ text: messages.before_minting }));
    } else if (bond.interestDue > 0 || bond.pendingPayout > 0) {
      const shouldProceed = window.confirm(messages.existing_mint);
      if (shouldProceed) {
        const trimBalance: string = trim(Number(quantity), 10);
        await dispatch(
          bondAsset({
            value: trimBalance,
            slippage,
            bond,
            networkID: chainID,
            provider,
            address,
            useNativeCurrency,
          }),
        );
        clearInput();
      }
    } else {
      const trimBalance: string = trim(Number(quantity), 10);
      await dispatch(
        bondAsset({
          value: trimBalance,
          slippage,
          bond,
          networkID: chainID,
          provider,
          address,
          useNativeCurrency,
        }),
      );
      clearInput();
    }
  }

  const clearInput = (): void => setQuantity('');

  const setMax = (): void => {
    let amount: string | number = Math
      .min(bond.maxBondPriceToken * 0.9999, useNativeCurrency ? bond.nativeCurrencyBalance * 0.99 : bond.balance);

    if (amount) {
      amount = trim(amount);
    }

    setQuantity((amount || '').toString());
  };


  const onSeekApproval = async () => {
    if (!await getIsWrongNetwork()) {
      dispatch(changeApproval({ address, bond, provider, networkID: chainID }));
    }
  };
  
  const onRenderMintBtn = (): ReactElement => {
    let layout: ReactElement;
    
    if (hasAllowance() || useNativeCurrency) {
      layout = (
        <div
          className="action__btn btn__primary--fulfilled"
          onClick={async () => {
            if (isPendingTxn(pendingTransactions, 'bond_' + String(bond.id))) return;
            await onBond();
          }}
        >
          {txnButtonText(pendingTransactions, 'bond_' + String(bond.id), 'Mint')}
        </div>
      );
    } else {
      layout = (
        <div
          className="action__btn btn__primary--fulfilled"
          onClick={async () => {
            if (isPendingTxn(pendingTransactions, 'approve_' + String(bond.id))) return;
            await onSeekApproval();
          }}
        >
          {txnButtonText(pendingTransactions, 'approve_' + String(bond.id), 'Approve')}
        </div>
      );
    }
    
    return layout;
  };
  
  const onRenderBondData = (): ReactElement => {
    const bondData: IBond.IUserData[] = [
      {
        id: 'yourBalance',
        label: 'Your Balance',
        value: `${trim(useNativeCurrency ? bond.nativeCurrencyBalance : bond.balance)} ${displayUnits}`
      },
      {
        isDivided: true,
        id: 'youWillGet',
        label: 'You Will Get',
        value: `${trim(bond.bondQuote, 4)} BIG`
      },
      {
        isDivided: true,
        id: 'maxYouCanBuy',
        label: 'Max You Can Buy',
        value: `${trim(bond.maxBondPrice, 4)} ${'BIG'}`
      },
      {
        id: 'ROI',
        label: 'Discount',
        isDivided: true,
        value: `${trim(bond.bondDiscount * 100, 2)}%`
      },
      {
        id: 'vestingTerm',
        label: 'Vesting Term',
        value: vestingPeriod()
      },
      {
        id: 'minimumPurchase',
        label: 'Minimum purchase',
        value: `${bond.minPurchase} BIG`
      },
    ];
    
    return <BondData data={bondData} />;
  }

  return (
    <div className="tab__content mint">
      <div className="tab__inner">
        {onRenderBondData()}
        
        <div className="form--card card card--custom">
          <Togglers handleChangeView={handleChangeTab} activeTabIndex={0} />
          <div className="form--card__inner">
            {(bond.id === 'wFTM') && (
              <FormGroup className="avax--checkbox__wrapper">
                <FormControlLabel
                  label="Use AVAX"
                  classes={{
                    label: 'label',
                    root: 'root'
                  }}
                  control={(
                    <Switch
                      classes={{
                        switchBase: 'base',
                        thumb: 'thumb',
                        input: 'input',
                        track: 'track',
                        root: cx('switch', { checked: useNativeCurrency }),
                        checked: 'checked',
                      }}
                      onChange={(e: ChangeEvent<HTMLInputElement>, checked: boolean) => setUseNativeCurrency(checked)}
                    />
                  )}
                />
              </FormGroup>
            )}
            <div className="field__wrapper">
              <OutlinedInput
                type="number"
                labelWidth={0}
                value={quantity}
                placeholder="Amount"
                classes={{
                  root: 'input__root',
                  input: 'input',
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <div onClick={setMax} className="input__btn--max">{'Max'}</div>
                  </InputAdornment>
                }
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
  
            {!hasAllowance() && !useNativeCurrency && (
              <p className="description">
                Note: The "Approve" transaction is only needed when minting for the first time; subsequent minting only&nbsp;
                requires you to perform the "Mint" transaction.
              </p>
            )}
  
            {onRenderMintBtn()}
          </div>
        </div>
      </div>
    </div>
  );
}
