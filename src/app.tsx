import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Router } from "./routes";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
