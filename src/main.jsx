import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Battleground, CreateBattle, Battle, Home, JoinBattle } from "./page";
import { OnboardModal } from "./components";
import { GlobalContextProvider } from "./context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal />
      <Routes>
        <Route path="/NFT-card-Game" element={<Home />} />
        <Route path="/NFT-card-Game/battleground" element={<Battleground />} />
        <Route path="/NFT-card-Game/battle/:battleName" element={<Battle />} />
        <Route path="/NFT-card-Game/create-battle" element={<CreateBattle />} />
        <Route path="/NFT-card-Game/join-battle" element={<JoinBattle />} />
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
);
