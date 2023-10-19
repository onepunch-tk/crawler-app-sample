import { createBrowserRouter } from "react-router-dom";
import { Root } from "@routes/Root";
import { App } from "@pages/App";

const rooter = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [{ path: "", element: <App /> }],
  },
]);
export default rooter;
