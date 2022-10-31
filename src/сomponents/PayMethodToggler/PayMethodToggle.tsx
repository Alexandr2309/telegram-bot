import React from 'react';

export enum PayMethod {
  SATS = 'SATS',
  AED = 'AED'
}

export interface IPayMethod {
 currency: PayMethod;
  satoshi: number
}

interface IPayMethodToggleProps {
  onClickHandler: ( value:  IPayMethod) => void;
  currentValue: IPayMethod
}

const PayMethodToggle = ( props: IPayMethodToggleProps ) => {
  const { onClickHandler, currentValue } = props;
  return (
    <div className="pay-method-container">
      <h3 className="pay-method-title">Выберите способ оплаты</h3>
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
  );
};

export default PayMethodToggle;
