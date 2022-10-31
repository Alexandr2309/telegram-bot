import React from 'react';
import './PayMethodToggle.css';

export enum PayMethod {
  SATS = 'SATS',
  AED = 'AED'
}

export interface IPayMethod {
  currency: PayMethod;
  satoshi: number
}

interface IPayMethodToggleProps {
  onClickHandler: ( value: IPayMethod ) => void;
  currentValue: IPayMethod
}

const PayMethodToggle = ( props: IPayMethodToggleProps ) => {
  const { onClickHandler, currentValue } = props;
  return (
    <div className="pay-method__wrapper">
      <div className="pay-method-container">

        <h3 className="pay-method-title">Выберите способ оплаты</h3>
        <div className="pay-method__buttons">
          <button
            onClick={() => onClickHandler({ ...currentValue, currency: PayMethod.SATS })}
            type="button"
            className={`pay-method-btn ${currentValue?.currency === PayMethod.SATS && 'active'}`}>
            SATS
          </button>
          <button
            onClick={() => onClickHandler({ ...currentValue, currency: PayMethod.AED })}
            type="button"
            className={`pay-method-btn ${currentValue?.currency === PayMethod.AED && 'active'}`}>
            AED
          </button>
        </div>
        <div className="pay-method-container">
        </div>
      </div>
    </div>
  );
};

export default PayMethodToggle;
