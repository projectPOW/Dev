import React, { useState, useEffect } from "react";
import POW_NFT from "./contracts/marketPlace.json";
import POW_FONG from "./contracts/POWToken.json";
import getWeb3 from "./getWeb3";
import SetUpdatePlayer from "./Components/setUpdatePlayer";
import Homepage from "./Components/homepage";
import Fusion from "./Components/fusion";
import Reward from "./Components/reward";
import Tournament from "./Components/tournament";
import Route from "./Components/route";
import MarketPlace from "./Components/marketPlace";
import Admin from "./Components/admin";
import Factory from "./Components/factory";
import Unlock from "./Components/unlock";
import LockItemsScreen from "./Components/lockItemsScreen"
import SuccessMessage from './Components/successMessage'
import SetLevelReward from './Components/setLevelReward'


const App = () => {

  const [web3,setWeb3]= useState(null);
  const [accounts,setAccounts]=useState(null);
  const [contract,setContract]=useState(null);
  const [contract2,setContract2]=useState(null);
  const [rewardNFT,setRewardNFT] = useState('');
  const [rewardFONG,setRewardFONG] = useState(false);
  const [proposalTab,setProposalTab] = useState ([]);
  const [voteVoter,setVoteVoter] = useState (null);
  const [winner,setWinner] = useState ([]);
  const [dataNftPlayer, setDataNftPlayer] = useState (0);
  const [dataFongPlayer, setDataFongPlayer] = useState (0);
  const [objectToCreate, setObjectToCreate] = useState(0);
  const [continentWhereToFind,setContinentWhereToFind] = useState(0);
  const [lockedItems, setLockedItems] = useState([]);
  const [rewardEarned,setRewardEarned] = useState([]);
  const [unlockedItemsTab, setUnlockedItemsTab] = useState ([]); 
  const [lockedItemsTab, setLockedItemsTab] = useState([]);
  const [eventWithdrawCrypto, setEventWithdrawCrypto] = useState(false);
  const [eventNewMergedItem, setEventNewMergedItem] = useState([])
  const [idMergedItem,setIdMergedItem] = useState (0);


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
          deployedNetwork2 && deployedNetwork2.address,
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

          setRewardEarned((rewardEarned) =>{ return [...rewardEarned, event.returnValues['tokenName']];});
          console.log("call");

        }).on("error", console.error);

           instance2.events.rewardWithdrawn()
          .on("data", (event) => {

            setEventWithdrawCrypto(true);

        }).on("error", console.error);

          instance.events.fusionnedItemCreate()
          .on("data", (event) => {

            setIdMergedItem(event.returnValues['tokenId']);

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

      return () =>{
        setRewardNFT('');
      }
      
  },[accounts]);

  /***********Helper function***********/
  const UpdateETHAccount = async() =>{
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    }catch (error){
        console.log(error);
        alert('Error: check the address');
      }
  }

  const getPlayerDataNFT = async() => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const data = await contract.methods.multiverseData(accounts[0]).call();
      setDataNftPlayer(data);
    }catch(error){
      console.log(error);
    }
  }

  const getPlayerDataFONG = async() => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const data = await contract2.methods.multiverseData(accounts[0]).call();
      setDataFongPlayer(data);
    }catch(error){
      console.log(error);
    }
  }



  /***********Contract call***********/
  
  const setMultiversePlayerNFT = async(address,login) => {
    try{
      UpdateETHAccount()
      await contract.methods.setMultiversePlayer(address,login).send({from: accounts[0]});
    }catch (error){
        console.log(error);
      }
  }

  const setMultiversePlayerFONG = async(address,login) => {
    try{
      UpdateETHAccount()
      await contract2.methods.setMultiversePlayer(address,login).send({from: accounts[0]});
    }catch (error){
        console.log(error);
      }
  }

  const updateMultiversePlayerNFT = async(login,caseLv1,caseLv2) => {
    
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.updateMultiversePlayer(login,caseLv1,caseLv2).send({from: accounts[0]});
    }catch(error){
      console.log(error);
    }
  }

  const updateMultiversePlayerFONG = async(login,XP) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.updateMultiversePlayer(login,XP).send({from: accounts[0]});
    }catch(error){
      console.log(error);
    }
  }

  const createItem = async(type, name, continent) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.createItem(type, name, continent).send({from: accounts[0]});
    }catch(error){
      console.log(error);
    }
  }

  const getRewardNFT = async() => {
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
      const TablockItem = []
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const lockedTab = await contract.methods.getLockedItems().call({from: accounts[0]});
      getDataItemLocked(lockedTab);
    }catch(error){
      console.log(error);
      alert(error.message.reason);
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

  const getMyItems = async () => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const returnTab = await contract.methods.getItemsOfPlayer(accounts[0]).call();
      getDataItemUnlocked (returnTab);
      }catch(error){
      console.log(error);
    }
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

  const getDataItemUnlocked = async(TabTokenId) => {
    const tabInt = [];
    const tabData = [];

    for (let i = 0; i < TabTokenId.length ; i++){

      tabInt[i] = await contract.methods.items(TabTokenId[i]).call({from: accounts[0]});
      if (!tabInt[i].locked){
        tabData[i] = tabInt[i]
      }
    } 
    setUnlockedItemsTab(tabData);
    console.log(unlockedItemsTab);
  }

  const getDataItemMerged = async() => {
    
    const tabData = await contract.methods.items(idMergedItem).call({from: accounts[0]});
    setEventNewMergedItem(tabData); 
    console.log(tabData);
    console.log(eventNewMergedItem);   
  }

 const getDataItemLocked = async(TabTokenId) => {
    const tabData = [];

    for (let i = 0; i < TabTokenId.length ; i++){

      tabData[i] = await contract.methods.items(TabTokenId[i]).call({from: accounts[0]});
     
    } 
    setLockedItemsTab(tabData);
    console.log(lockedItemsTab);
  }

/************************************/

/***********Table options***********/ 

  const type = [
      {
        label: "Monument",
        value: "1",
      },
      {
        label: "Material",
        value: "2",
      },
      {
        label: "Card",
        value: "3",
      },
    ];

    const continent = [
      {
        label: "North America",
        value: "1",
      },
      {
        label: "South America",
        value: "2",
      },
      {
        label: "Antartique",
        value: "3",
      },
      {
        label: "Asia",
        value: "4",
      },
      {
        label: "Europe",
        value: "5",
      },
      {
        label: "Africa",
        value: "6",
      },
      {
        label: "Oceania",
        value: "7",
      },
      {
        label: "All over the world",
        value: "8",
      },
    ];

    const entryTab = [1,2,3];

/************************************/


  return (
    <div>
      <Route path = "/" >
        <Homepage/>
      </Route>
      <Route path = "/reward" >
        <Reward 
        getPlayerDataNFT = {getPlayerDataNFT} 
        getPlayerDataFONG = {getPlayerDataFONG} 
        getRewardFONG = {getRewardFONG}
        getRewardNFT = {getRewardNFT}
        dataNftPlayer = {dataNftPlayer}
        dataFongPlayer = {dataFongPlayer}
        rewardEarned = {rewardEarned}
        rewardFONG = {rewardFONG}
        setRewardEarned = {setRewardEarned}
        setEventWithdrawCrypto = {setEventWithdrawCrypto}
        eventWithdrawCrypto = {eventWithdrawCrypto}
        />
      </Route>
      <Route path = "/fusion" >
        <Fusion
        getMyItems = {getMyItems}
        unlockedItemsTab = {unlockedItemsTab}
        fusionItem = {fusionItem}
        eventNewMergedItem = {eventNewMergedItem}
        setEventNewMergedItem = {setEventNewMergedItem}
        getDataItemMerged = {getDataItemMerged}
        idMergedItem = {idMergedItem}
        setIdMergedItem = {setIdMergedItem}
        />
      </Route>
      <Route path = "/marketplace" >
        <div> test</div>
      </Route> 
      <Route path = "/tournament" >
        Nothing
      </Route> 
      <Route path = "/setUpdate" >
        <SetUpdatePlayer 
        setMultiversePlayerNFT = {setMultiversePlayerNFT}
        setMultiversePlayerFONG = {setMultiversePlayerFONG}
        updateMultiversePlayerNFT = {updateMultiversePlayerNFT} 
        updateMultiversePlayerFONG = {updateMultiversePlayerFONG}
        account = {accounts} 
        />
      </Route> 
      <Route path = "/admin" >
        <Admin/>
      </Route> 
      <Route path = "/admin/factory" >
       <Factory
        setObjectToCreate = {setObjectToCreate}
        objectToCreate = {objectToCreate}
        createItem = {createItem}
        continentWhereToFind={continentWhereToFind}
        setContinentWhereToFind = {setContinentWhereToFind}
        continent = {continent}
        type = {type}
        />
      </Route>     
      <Route path = "/admin/unlock" >
        <Unlock
          entryTab = {lockedItemsTab}
          getLockedItems = {getLockedItems}
          unlock = {unlock}
          />
      </Route>    
      <Route path = "/admin/lock" >
        <LockItemsScreen
        getMyItems = {getMyItems}
        unlockedItemsTab = {unlockedItemsTab}
        lock={lock}
        />
      </Route> 
      <Route path = "/admin/rewardLevel" >
        <SetLevelReward
        setReward  = {setReward}
        />
      </Route>
      <Route path = "/success" >
        <SuccessMessage/>
      </Route>               
    </div>
  );
}

export default App;