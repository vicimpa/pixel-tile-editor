const {
  max,
  min,
  abs,
  acos,
  acosh,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  cbrt,
  ceil,
  clz32,
  cos,
  cosh,
  E,
  exp,
  expm1,
  floor,
  fround,
  hypot,
  imul,
  log,
  log10,
  log1p,
  log2,
  LN10,
  LN2,
  LOG10E,
  LOG2E,
  pow,
  PI,
  random,
  round,
  sign,
  sin,
  sinh,
  sqrt,
  SQRT1_2,
  SQRT2,
  tan,
  tanh,
  trunc
} = Math;

export const minMax = (value: number, minValue: number, maxValue: number) => {
  return min(maxValue, max(minValue, value));
};

export {
  max,
  min,
  abs,
  acos,
  acosh,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  cbrt,
  ceil,
  clz32,
  cos,
  cosh,
  E,
  exp,
  expm1,
  floor,
  fround,
  hypot,
  imul,
  log,
  log10,
  log1p,
  log2,
  LN10,
  LN2,
  LOG10E,
  LOG2E,
  pow,
  PI,
  random,
  round,
  sign,
  sin,
  sinh,
  sqrt,
  SQRT1_2,
  SQRT2,
  tan,
  tanh,
  trunc
};