import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes/RootContainer";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
