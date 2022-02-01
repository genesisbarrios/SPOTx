import "./index.css";
import { useMemo } from "react";

import Home from "./Home";
import Rewards from "./Rewards";
import Profile from "./Profile";
import {Route, Routes} from 'react-router-dom';

const App = () => {

  return (
      <Routes>
        <Route path="/" element={HomeComponent()}/>
        <Route path="/Rewards" element={RewardsComponent()}/>
        <Route path="/Profile" element={ProfileComponent()}/>
      </Routes>
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


