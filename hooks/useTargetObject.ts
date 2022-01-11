import { useState } from "react";

export const useTargetObject = () => {
  return useState({} as object)[0];
};