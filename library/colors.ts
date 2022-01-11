export const rgbToNum = (r: number, g: number, b: number) => (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF;
export const rgbaToNum = (r: number, g: number, b: number, a: number) => (r & 0xFF) << 24 | (g & 0xFF) << 16 | (b & 0xFF) << 8 | a & 0xFF;

export const numToRgb = (n: number) => [(n >> 16) & 0xFF, (n >> 8) & 0xFF, n & 0xFF];
export const numToRgba = (n: number) => [(n >> 24) & 0xFF, (n >> 16) & 0xFF, (n >> 8) & 0xFF, n & 0xFF];