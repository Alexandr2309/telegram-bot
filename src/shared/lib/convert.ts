const SATS_TO_USD = 0.0002035;
const AED_TO_USD = 3.6719;

export const convertSATSToAED = (cost: number) => Math.ceil(cost * SATS_TO_USD * AED_TO_USD);
