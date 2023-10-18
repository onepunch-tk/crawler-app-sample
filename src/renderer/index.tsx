import { createRoot } from "react-dom/client";
import { App } from "@pages/App";
import { RecoilRoot } from "recoil";

document.body.innerHTML = '<div id="root"></div>';

const root = createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
