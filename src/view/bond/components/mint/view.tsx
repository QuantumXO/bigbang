import { useState, useEffect, useCallback, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, OutlinedInput, InputAdornment, Slide, FormControl } from '@material-ui/core';
import { trim, prettifySeconds } from '@services/helpers';
import { changeApproval, bondAsset, calcBondDetails } from '@store/slices/bond-slice';
import { useWeb3Context } from '@services/hooks';
import { IPendingTxn, isPendingTxn, txnButtonText } from '@store/slices/pending-txns-slice';
import { Skeleton } from '@material-ui/lab';
import { IReduxState } from '@store/slices/state.interface';
import { IAllBondData } from '@services/hooks/bonds';
import useDebounce from '@services/hooks/debounce';
import { messages } from '@constants/messages';
import { warning } from '@store/slices/messages-slice';

import "./styles.scss";

interface IBondPurchaseProps {
  bond: IAllBondData;
  slippage: number;
}

export function MintTab({ bond, slippage }: IBondPurchaseProps): ReactElement {
  const dispatch = useDispatch();
  const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

  const [quantity, setQuantity] = useState<string>('');
  const [useAvax, setUseAvax] = useState<boolean>(false);
  
  const bondDetailsDebounce = useDebounce(quantity, 1000);
  const displayUnits: string = useAvax ? 'AVAX' : bond.displayUnits;
  
  useEffect((): void => {
    dispatch(calcBondDetails({ bond, value: quantity, provider, networkID: chainID }));
  }, [bondDetailsDebounce]);
  
  const hasAllowance = useCallback(() => {
    return bond.allowance > 0;
  }, [bond.allowance]);
  
  const isBondLoading: boolean = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);
  const pendingTransactions: IPendingTxn[] = useSelector<IReduxState, IPendingTxn[]>(state => {
    return state.pendingTransactions;
  });

  const vestingPeriod = (): string => {
    return prettifySeconds(bond.vestingTerm, 'day');
  };

  async function onBond() {
    if (await checkWrongNetwork()) return;

    if (quantity === '') {
      dispatch(warning({ text: messages.before_minting }));
      //@ts-ignore
    } else if (isNaN(quantity)) {
      dispatch(warning({ text: messages.before_minting }));
    } else if (bond.interestDue > 0 || bond.pendingPayout > 0) {
      const shouldProceed = window.confirm(messages.existing_mint);
      if (shouldProceed) {
        const trimBalance = trim(Number(quantity), 10);

        await dispatch(
          bondAsset({
            value: trimBalance,
            slippage,
            bond,
            networkID: chainID,
            provider,
            address,
            useAvax,
          }),
        );
        clearInput();
      }
    } else {
      const trimBalance = trim(Number(quantity), 10);
      await dispatch(
        //@ts-ignore
        bondAsset({
          value: trimBalance,
          slippage,
          bond,
          networkID: chainID,
          provider,
          address,
          useAvax,
        }),
      );
      clearInput();
    }
  }

  const clearInput = (): void => setQuantity('');

  const setMax = (): void => {
    let amount: string | number = Math
      .min(bond.maxBondPriceToken * 0.9999, useAvax ? bond.avaxBalance * 0.99 : bond.balance);

    if (amount) {
      amount = trim(amount);
    }

    setQuantity((amount || '').toString());
  };


  const onSeekApproval = async () => {
    if (!await checkWrongNetwork()) {
      dispatch(changeApproval({ address, bond, provider, networkID: chainID }));
    }
  };
  
  const onRenderMintBtn = (): ReactElement => {
    let layout: ReactElement;
    
    if (hasAllowance() || useAvax) {
      layout = (
        <div
          className="action__btn"
          onClick={async () => {
            if (isPendingTxn(pendingTransactions, 'bond_' + bond.name)) return;
            await onBond();
          }}
        >
          <p>{txnButtonText(pendingTransactions, 'bond_' + bond.name, 'Mint')}</p>
        </div>
      );
    } else {
      layout = (
        <div
          className="action__btn"
          onClick={async () => {
            if (isPendingTxn(pendingTransactions, 'approve_' + bond.name)) return;
            await onSeekApproval();
          }}
        >
          <p>{txnButtonText(pendingTransactions, 'approve_' + bond.name, 'Mint')}</p>
        </div>
      );
    }
    
    return layout;
  };
  
  const onRenderBondData = (): ReactElement => {
    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit {...{ timeout: 533 }}>
        <Box className="data">
          <div className="data__row">
            <div className="data__row__title">Your Balance</div>
            <div className="data__row__value">
              {isBondLoading ? (
                <Skeleton width="100px" />
              ) : (
                <>
                  {trim(useAvax ? bond.avaxBalance : bond.balance, 4)} {displayUnits}
                </>
              )}
            </div>
          </div>
      
          <div className="data__row">
            <div className="data__row__title">You Will Get</div>
            <div className="data__row__value">
              {isBondLoading
                ? <Skeleton width="100px" />
                : `${trim(bond.bondQuote, 4)} ${'tokenType'}`
              }
            </div>
          </div>
      
          <div className="data__row">
            <div className="data__row__title">Max You Can Buy</div>
            <div className="data__row__value">
              {isBondLoading
                ? <Skeleton width="100px" />
                : `${trim(bond.maxBondPrice, 4)} ${'tokenType'}`
              }
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
      
          <div className="data__row">
            <div className="data__row__title">Minimum purchase</div>
            <div className="data__row__value">{`0.01 ${'tokenType'}`}</div>
          </div>
        </Box>
      </Slide>
    );
  }

  return (
    <div className="mint__tab">
      <div className="mint__tab__inner">
        {(bond.name === 'wavax') && (
          <FormControl className="avax--checkbox__wrapper" variant="outlined" color="primary" fullWidth>
            <div className="avax--checkbox">
              <input type="checkbox" checked={useAvax} onClick={() => setUseAvax(!useAvax)} />
              <p>Use AVAX</p>
            </div>
          </FormControl>
        )}
        <div className='field__wrapper'>
          <OutlinedInput
            type="number"
            labelWidth={0}
            value={quantity}
            placeholder="Amount"
            inputProps={{
              className: "input",
            }}
            className="input__wrapper"
            endAdornment={
              <InputAdornment position="end">
                <div onClick={setMax} className="input__btn">
                  <p>Max</p>
                </div>
              </InputAdornment>
            }
            onChange={e => setQuantity(e.target.value)}
          />
          {onRenderMintBtn()}
        </div>

        {!hasAllowance() && !useAvax && (
          <p className="description">
            Note: The "Approve" transaction is only needed when minting for the first time; subsequent minting only&nbsp;
            requires you to perform the "Mint" transaction.
          </p>
        )}
      </div>
      {onRenderBondData()}
    </div>
  );
}
