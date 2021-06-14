import routes from './routes';
import RenderRoutes from "./components/RenderRoutes";
import React from "react";
import './utils/ethers'
function App() {
  return (
      <>
          <RenderRoutes routes={routes} />
        </>
  );
}

export default App;
