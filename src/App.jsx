import "./index.css";

import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import {ethers} from "ethers";

import Home from "./Home";
import Rewards from "./Rewards";
import Profile from "./Profile";
import {Route, Routes} from 'react-router-dom';



const getLibrary = (provider, connector) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const App = () => {
  const web3 = useWeb3React();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Routes>
        <Route path="/" element={HomeComponent()}/>
        <Route path="/Rewards" element={RewardsComponent()}/>
        <Route path="/Profile" element={ProfileComponent()}/>
      </Routes>
      </Web3ReactProvider>
  );
  
};

export default App;

const HomeComponent = () => {
  return (
   <Home/>
  );
}
const RewardsComponent = () => {
  return (
      <Rewards/>
  );
}

const ProfileComponent = () => {
  return (
      <Profile/>
  );
}


