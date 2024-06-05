/* eslint-disable @typescript-eslint/no-explicit-any */
export const sortAdherence = function (a: any, b: any) {
  const aBothTrue = a.adherence;
  const bBothTrue = b.adherence;

  if (!aBothTrue && bBothTrue) {
    return -1;
  } else if (aBothTrue && !bBothTrue) {
    return 1;
  } else {
    return 0;
  }
};

export const sortAdherenceRule = function (a: any, b: any) {
  const aBothTrue = a.adherenceRule;
  const bBothTrue = b.adherenceRule;

  if (aBothTrue && !bBothTrue) {
    return -1;
  } else if (!aBothTrue && bBothTrue) {
    return 1;
  } else {
    return 0;
  }
};
