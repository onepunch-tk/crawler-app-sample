import { createRoot } from "react-dom/client";
import { App } from "./pages/App";

document.body.innerHTML = '<div id="root"></div>';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
