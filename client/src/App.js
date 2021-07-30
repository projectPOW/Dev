import React, { useState, useEffect } from "react";
import POW_NFT from "./contracts/marketPlace.json";
import POW_FONG from "./contracts/POWToken.json";
import getWeb3 from "./getWeb3";
import SetUpdatePlayer from "./Components/setUpdatePlayer";
import Homepage from "./Components/homepage";


const App = () => {

  const [web3,setWeb3]= useState(null);
  const [accounts,setAccounts]=useState(null);
  const [contract,setContract]=useState(null);
  const [contract2,setContract2]=useState(null);
  const [currentState,setCurrentState] = useState("We are in voters registration session");
  const [proposalTab,setProposalTab] = useState ([]);
  const [voteVoter,setVoteVoter] = useState (null);
  const [winner,setWinner] = useState ([]);

  useEffect ( () => {

    const initWeb3 = async () =>{
      try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = POW_NFT.networks[networkId];
        const deployedNetwork2 = POW_FONG.networks[networkId];
    
        const instance = new web3.eth.Contract(
          POW_NFT.abi,
          deployedNetwork && deployedNetwork.address,
          );

         const instance2 = new web3.eth.Contract(
          POW_FONG.abi,
          deployedNetwork && deployedNetwork.address,
          );

         /***********Event listener***********/

        instance.events.NewPlayerRegistered()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.playerUpdated()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.rewardWithdrawn()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.fusionnedItemCreate()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.lockItem()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.NewMarketOrder()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.soldMade()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.orderCanceled()
          .on("data", (event) => {
        }).on("error", console.error);

           instance2.events.NewPlayerRegistered()
          .on("data", (event) => {
        }).on("error", console.error);

          instance2.events.playerUpdated()
          .on("data", (event) => {
        }).on("error", console.error);

          instance2.events.rewardWithdrawn()
          .on("data", (event) => {
        }).on("error", console.error);

          instance2.events.newAmountReward()
          .on("data", (event) => {
        }).on("error", console.error);

      /************************************/

        setContract2(instance2);
        setContract(instance);
        setWeb3(web3);
        setAccounts(accounts);

      } catch (error){
        alert(
            `Non-Ethereum browser detected. Can you please try to install MetaMask before starting.`,
          );
          console.error(error);
      }
    }
      initWeb3();
      
  },[accounts]);

  /***********Contract call***********/
  
  const setMultiversePlayer = async(address,login) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.setMultiversePlayer(address,login).send({from: accounts[0]});
      await contract2.methods.setMultiversePlayer(address,login).send({from: accounts[0]});
    }catch (error){
        console.log(error);
        alert('Error: check the address');
      }
  }

  const updateMultiversePlayer = async(login,caseLv1,caseLv2,XP) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.updateMultiversePlayer(login,caseLv1,caseLv2).send({from: accounts[0]});
      await contract2.methods.updateMultiversePlayer(login,XP).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const createItem = async(type, name, continent) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.createItem(type, name, continent).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const getReward = async() => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.getReward().send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const getRewardFONG = async () => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.getReward().send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }
    
  const fusionItem = async(tokenId1,tokenId2) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.fusionItem(tokenId1,tokenId2).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const getLockedItems = async() => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.getLockedItems().call({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const unlock = async (tokenId) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.unlock(tokenId).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const lock = async (tokenId) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.lock(tokenId).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const getRankByContinent = async (continentNum) => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.getRankByContinent(continentNum).call();
  }

  const getItemsOfPlayer = async (address) => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.getItemsOfPlayer(address).call();
  }

  const setMarketOrder = async (amount, tokenId) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.setMarketOrder(amount,tokenId).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const setMarketOrderWhitelisted = async (amount, tokenId, address) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.setMarketOrder(amount, tokenId, address).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const getOrder = async (orderId) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.getOrder(orderId).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const getWhitelistedOrder = async (orderId) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.getWhitelistedOrder(orderId).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const cancelOrder = async (orderId) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.cancelOrder(orderId).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const myMint = async (address,amount) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.withdrawAmount(address,amount).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const burnPow = async (address,amount) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.burnPow(address,amount).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const setReward = async (amount) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.setReward(amount).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }


/************************************/

  return (
    <div>
      <div>
        <SetUpdatePlayer 
        functionToSet = {setMultiversePlayer}
        functionToUpdate = {updateMultiversePlayer} 
        />
      </div>
      <div>
        <Homepage/>
      </div>
    </div>
  );
}

export default App;