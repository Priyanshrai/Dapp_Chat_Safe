import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import Chat from "../contracts/Chat.json";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chatContract, setChatContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Chat.networks[networkId];
        const chatInstance = new web3.eth.Contract(Chat.abi, deployedNetwork && deployedNetwork.address);
        setChatContract(chatInstance);
      }
    };

    init();
  }, []);

  return (
    <BlockchainContext.Provider value={{ web3, account, chatContract }}>
      {children}
    </BlockchainContext.Provider>
  );
};
