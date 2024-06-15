import React from "react";
import { BlockchainProvider } from "./contexts/BlockchainContext";
import Chat from "./components/Chat";

const App = () => {
  return (
    <BlockchainProvider>
      <Chat />
    </BlockchainProvider>
  );
};

export default App;
