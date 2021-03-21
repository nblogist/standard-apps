import BN from "bn.js";
import { BitLength } from "@canvas-ui/react-components/types";
import { BN_TEN, BN_ZERO, formatBalance, isBn } from "@polkadot/util";
import { BitLengthOption } from "@canvas-ui/react-components/constants";
import { SiDef } from "@polkadot/util/types";

const DEFAULT_BITLENGTH = BitLengthOption.NORMAL_NUMBERS as BitLength;

export function getGlobalMaxValue(bitLength?: number): BN {
  return new BN(2).pow(new BN(bitLength || DEFAULT_BITLENGTH)).subn(1);
}

export function isValidNumber(
  bn: BN,
  bitLength: BitLength = DEFAULT_BITLENGTH,
  isZeroable: boolean,
  maxValue?: BN
): boolean {
  if (
    // cannot be negative
    bn.lt(BN_ZERO) ||
    // cannot be > than allowed max
    !bn.lt(getGlobalMaxValue(bitLength)) ||
    // check if 0 and it should be a value
    (!isZeroable && bn.isZero()) ||
    // check that the bitlengths fit
    bn.bitLength() > (bitLength || DEFAULT_BITLENGTH) ||
    // cannot be > max (if specified)
    (maxValue && maxValue.gtn(0) && bn.gt(maxValue))
  ) {
    return false;
  }

  return true;
}

function getSiPowers(si: SiDef | null): [BN, number, number] {
  if (!si) {
    return [BN_ZERO, 0, 0];
  }

  const basePower = formatBalance.getDefaults().decimals;

  return [new BN(basePower + si.power), basePower, si.power];
}

export default function inputToBn(
  input: string,
  si: SiDef | null,
  bitLength: BitLength = DEFAULT_BITLENGTH,
  isZeroable: boolean,
  maxValue?: BN
): [BN, boolean] {
  const [siPower, basePower, siUnitPower] = getSiPowers(si);

  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/);

  let result;

  if (isDecimalValue) {
    if (siUnitPower - isDecimalValue[2].length < -basePower) {
      result = new BN(-1);
    }

    const div = new BN(input.replace(/\.\d*$/, ""));
    const modString = input.replace(/^\d+\./, "");
    const mod = new BN(modString);

    result = div.mul(BN_TEN.pow(siPower)).add(mod.mul(BN_TEN.pow(new BN(basePower + siUnitPower - modString.length))));
  } else {
    result = new BN(input.replace(/[^\d]/g, "")).mul(BN_TEN.pow(siPower));
  }

  return [result, isValidNumber(result, bitLength, isZeroable, maxValue)];
}
