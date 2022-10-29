import axios from "axios";

export async function currencySatoshiFromAED(): Promise<{ satoshi: number }> {
  return (await axios.get("https://chunoadmin.cryptopunk.tech/api/satoshi/"))
    .data;
}
