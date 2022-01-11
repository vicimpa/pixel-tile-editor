import { Main } from "components/main";
import { StrictMode } from "react";
import { render } from "react-dom";

render(
  <StrictMode>
    <Main />
  </StrictMode>,
  document.getElementById('root')
);