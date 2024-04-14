import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CustomButton, CustomInput, PageHOC } from "../components";
import { useGlobalContext } from "../context/index";

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log("Checking if player exists...");
      if (contract) {
        const playerExists = await contract.isPlayer(walletAddress);
        console.log("Player exists:", playerExists);

        if (!playerExists) {
          console.log("Registering player...");
          await contract.registerPlayer(playerName, playerName, {
            gasLimit: 500000,
          });

          setShowAlert({
            status: true,
            type: "info",
            message: `${playerName} is being summoned!`,
          });

          setTimeout(() => navigate("/create-battle"), 8000);
        }
      } else {
        console.error("Contract is not initialized");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      console.log("Contract changed or component mounted!");
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate("/create-battle");
    };

    if (contract) createPlayerToken();
  }, [contract]);

  useEffect(() => {
    // console.log("Game data changed!");
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    )
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to BMK
    <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);
