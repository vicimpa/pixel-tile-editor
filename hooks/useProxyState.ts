import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

export const useProxyState = <T extends object>(init: T) => {
  const [state] = useState(() => proxy(init));
  return (useSnapshot(state), state);
};