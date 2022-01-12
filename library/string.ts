const encoder = new TextEncoder();
const decored = new TextDecoder();

export const strSerialize = (inp: string) => {
  return encoder.encode(inp);
};

export const strDeserialize = (inp: Uint8Array) => {
  return decored.decode(inp);
};
