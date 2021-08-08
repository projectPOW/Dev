import Background from "./Components/img/Background.png";
import React, { useState, useEffect } from "react";
import POW_NFT from "./contracts/marketPlace.json";
import POW_FONG from "./contracts/POWStakingTournament.json";
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
import LockItemsScreen from "./Components/lockItemsScreen";
import SuccessMessage from './Components/successMessage';
import SetLevelReward from './Components/setLevelReward';
import ViewRank from './Components/viewRank';
import ViewOwner from './Components/viewOwner';
import ManageOrder from './Components/manageOrder';
import BuyOrder from './Components/buyOrder';
import DeleteOrder from "./Components/deleteOrder";
import ManageOrderOpen from "./Components/manageOrderOpen";
import BuyOrderWhitelisted from './Components/buyOrderWhitelisted';
import SetUpPlayer from "./Components/setUpPlayer";
import UpdatePlayer from "./Components/updatePlayer";
import GetBalance from "./Components/getBalance";
import SetTournament from "./Components/setTournament";
import CloseTournament from "./Components/closeTournament";
import SetWinnerTournament from "./Components/setWinnerTournament";
import WithdrawStakeReward from "./Components/withdrawStakeReward";



const App = () => {

  //Usestate for initialisation
  const [web3,setWeb3]= useState(null);
  const [accounts,setAccounts]=useState(null);
  const [contract,setContract]=useState(null);
  const [contract2,setContract2]=useState(null);
  const [admin,setAdmin] = useState(null);

  //Array containing names of Nft items earned
  const [rewardEarned,setRewardEarned] = useState([]);

  //Indicate a withdrawn made in ERC20 side
  const [eventWithdrawCrypto, setEventWithdrawCrypto] = useState(false);

  //Data of player on NFT side
  const [dataNftPlayer, setDataNftPlayer] = useState (0);

  //Data of player on ERC20 side
  const [dataFongPlayer, setDataFongPlayer] = useState (0);

  //Type of item to create
  const [objectToCreate, setObjectToCreate] = useState(0);

  //The value of the continent for the new item
  const [continentWhereToFind,setContinentWhereToFind] = useState(0);

  //Array on data's items of the current address 
  const [unlockedItemsTab, setUnlockedItemsTab] = useState ([]); 

  //Array of all the locked items
  const [lockedItemsTab, setLockedItemsTab] = useState([]);

  //Data on the new merged Item
  const [eventNewMergedItem, setEventNewMergedItem] = useState([]);

  //Token Id of the new merged item
  const [idMergedItem,setIdMergedItem] = useState (0);

  //Array of rank by continent 
  const [tabRank, setTabRank] = useState([]);

  //Array of data on all the items owned by someone. Access in the market place
  const [tabItemOwner, setTabItemOwner] = useState([]);

  //Array containing all the open orders made
  const [tabOrder, setTabOrder] = useState([]);

  //Array containing all the whitelisted orders made
  const [tabOrderWhitelisted, setTabOrderWhitelisted] = useState([]);

  //Array of all the current open orders made
  const [currentMarketOrders, setCurrentMarketOrders] = useState([]);

  //Array of all the current whitelisted orders made
  const [currentWhitelistedMarketOrders, setCurrentWhitelistedMarketOrders] = useState([]);
  
  //Id of the the new whitelisted order. This function request for an udpate of the array
  const [newOrderId, setNewOrderId] = useState(null);

  //Id of the the new whitelisted order. This function request for an udpate of the array
  const [newOrderIdWhitelisted, setNewOrderIdWhitelisted] = useState(null);
  
  //Array of datas about token owned by the current address and not in sale
  const [dataMyItemInOrder, setDataMyItemInOrder] = useState([]);

  //Array of data currently on sale and owned by the current address 
  const [dataMyItemInCurrentOrder, setDataMyItemInCurrentOrder] = useState([]);

  //Balance of player 
  const [balanceOfPlayer, setBalanceOfPlayer] = useState(0);


  //Update cancel screen 
  const [updateCancelScreen, setUpdateCancelScreen] = useState(false);

  //Update unlock screen 
  const [updateScreenUnlock, setUpdateScreenUnlock] = useState(false);

   //Update Lock screen 
  const [updateScreenLock, setUpdateScreenLock] = useState(false);

  //Update my screen market order 
  const [updateMyScreenMarketOrder, setUpdateMyScreenMarketOrder] = useState(false);

   //Update my screen market order whitelisted
  const [updateMyScreenMarketOrderWhitelisted, setUpdateMyScreenMarketOrderWhitelisted] = useState(false);

  //Update market order  
  const [updateScreenMarketOrder, setUpdateScreenMarketOrder] = useState(false);

  //Update market order whitelisted 
  const [updateScreenMarketOrderWhitelisted, setUpdateScreenMarketOrderWhitelisted] = useState(false);

  //Update money withrawn
  const [updateMoneyWithdrawn, setUpdateMoneyWithdrawn] = useState(false);

  //Array of all tournament waiting for winner to be set
  const [tournamentWaitingForWinner, setTournamentWaitingForWinner] = useState([]);

  //Array of all current staking tournament
  const [currentStakingTournament, setCurrentStakingTournament] = useState([]);

  //Array of all current playable staking tournament
  const [playableTournament, setPlayableTournament] = useState([]);

  //Array of all current playable staking tournament
  const [closedTournament, setClosedTournament] = useState([]);



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

         const owner = await instance.methods.owner().call({from: accounts[0]});

         /***********Event listener***********/

        instance.events.NewPlayerRegistered()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.playerUpdated()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.rewardWithdrawn({ filter: { _to: `${accounts[0]}` } })
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

          instance.events.newMarketOrder()
          .on("data", (event) => {
            setNewOrderId(event.returnValues);
           
            setUpdateScreenMarketOrder(updateScreenMarketOrder => !updateScreenMarketOrder);
            
        }).on("error", console.error);

          

          instance.events.newMarketOrderWithlisted()
          .on("data", (event) => {

            setNewOrderIdWhitelisted(event.returnValues);

            setUpdateScreenMarketOrderWhitelisted(updateScreenMarketOrderWhitelisted => !updateScreenMarketOrderWhitelisted)

        }).on("error", console.error);

          

          instance.events.soldMade()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.soldMadeWhitelisted()
          .on("data", (event) => {
        }).on("error", console.error);

          instance.events.orderCanceled({ filter: { _from: `${accounts[0]}` } })
          .on("data", () => {

            setUpdateCancelScreen(updateCancelScreen => !updateCancelScreen);
       

        }).on("error", console.error);


          instance.events.newItemUnlock()
          .on("data", () => {

            setUpdateScreenUnlock(updateScreenUnlock => !updateScreenUnlock);
           

        }).on("error", console.error);

          instance.events.newItemLock()
          .on("data", () => {

            setUpdateScreenLock(updateScreenLock => !updateScreenLock);
          

        }).on("error", console.error);

           instance.events.myNewMarketOrder({ filter: { _from: `${accounts[0]}` } })
          .on("data", () => {

            setUpdateMyScreenMarketOrder(updateMyScreenMarketOrder => !updateMyScreenMarketOrder);
    

        }).on("error", console.error);

          instance.events.myNewMarketOrderWithlisted({ filter: { _from: `${accounts[0]}` } })
          .on("data", () => {

            setUpdateMyScreenMarketOrderWhitelisted(updateMyScreenMarketOrderWhitelisted => !updateMyScreenMarketOrderWhitelisted);
           

        }).on("error", console.error);

          instance.events.moneyWithdrawn({ filter: { _from: `${accounts[0]}` } })
          .on("data", () => {

            setUpdateMoneyWithdrawn(updateMoneyWithdrawn => !updateMoneyWithdrawn);
           
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

          instance2.events.newTournament()
          .on("data", (event) => {
            updateStakingTournamentTab();
        }).on("error", console.error);

          instance2.events.endPlayTournament()
          .on("data", (event) => {
            updateStakingTournamentTab();
        }).on("error", console.error);

          instance2.events.winnerSet()
          .on("data", (event) => {
            updateTournamentWaitingForWinner();
        }).on("error", console.error);

        setAdmin(owner);
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
     
  },[accounts,newOrderId,newOrderIdWhitelisted, window.location.pathname]);

 /************************************/






  /***********Helper function***********/

  // Update the ETH account
  const UpdateETHAccount = async() =>{
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    }catch (error){
        console.log(error);
      }
  }

  // Get the data of the current player side NFT 
  const getPlayerDataNFT = async() => {
    try{
     
      const data = await contract.methods.multiverseData(accounts[0]).call();
      setDataNftPlayer(data);
    }catch(error){
      console.log(error);
    }
  }

  // Get the data of the current player side ERC20
  const getPlayerDataFONG = async() => {
    try{
     
      const data = await contract2.methods.multiverseData(accounts[0]).call();
      setDataFongPlayer(data);
    }catch(error){
      console.log(error);
    }
  }

  //Get the data off all items locked
  const getDataItemLocked = async(TabTokenId) => {
    const tabData = [];

    for (let i = 0; i < TabTokenId.length ; i++){

      tabData[i] = await contract.methods.items(TabTokenId[i]).call({from: accounts[0]});
     
    } 
    setLockedItemsTab(tabData);
  }

  // Make a rating of an array with address. This fonction comes with the function "getRankByContinent"
  const  makeRank = (arr) => {

      var result2 = [];
      var counts = {};
      
      arr.forEach(function(num) {
          if (!(num in counts)) {
              counts[num] = 0;
          }
          counts[num]++;
      });
      let properties = Object.keys(counts).reverse();
      console.log(typeof(properties));

      var result = Object.keys(properties).map((key) => `${properties[key]}`);

      for (var j = 0; j < result.length; j++){

        result2.push(result[j]);
      }
      setTabRank(result2);
  }

  //Get Data of items own by a player in the market place
  const getDataItemUnlockedOwner = async(TabTokenId) => {
    const tabData = [];

    for (let i = 0; i < TabTokenId.length ; i++){

      tabData[i] = await contract.methods.items(TabTokenId[i]).call({from: accounts[0]});
      
    } 
    setTabItemOwner(tabData);
  }

  // Get data on items of the current address and get all the unlock Item 
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
  }

  //Get data of items owned and currently on sold
  const getDataItemInCurrentOrder = async(TabTokenId) => {
    const tabData = [];
    const tabInt = [];

    for (let i = 0; i < TabTokenId.length ; i++){

      tabInt[i] = await contract.methods.items(TabTokenId[i]).call({from: accounts[0]});
        if(tabInt[i].onSold){
          tabData.push(tabInt[i]);
        }    
    } 
    setDataMyItemInCurrentOrder(tabData);    
  }

   //Get data on new merged Item
  const getDataItemMerged = async() => {
    
    const tabData = await contract.methods.items(idMergedItem).call({from: accounts[0]});
    setEventNewMergedItem(tabData); 
  }

   //Make an array of Items owner by the current account and not on sold
  const getDataItemInOrder = async(TabTokenId) => {
    const tabData = [];
    const int = [];

    for (let i = 0; i < TabTokenId.length ; i++){

      int[i] = await contract.methods.items(TabTokenId[i]).call({from: accounts[0]});
      if (!int[i].onSold){

        tabData.push(int[i]);
      }    
    } 
    setDataMyItemInOrder(tabData);
  }


  //Update the array of current whitelisted order
  const updateTabOrderWhitelisted = async() => {

    if (contract != null) {
    /////////////////////////////////////////////

      let intTab22 = [];

            contract.getPastEvents("newMarketOrderWithlisted", { fromBlock: 0, toBlock: "latest" },
             function(error, event){ 

              for (let i= 0 ; i<event.length;i++){

                intTab22.push(event[i].returnValues.tokenId);

              }
              const cleanTab = [...new Set(intTab22)];
              setTabOrderWhitelisted(cleanTab);
              })
            .then(function(event) {
                        
            });

      /////////////////////////////////////////////////

      let tabInte = [];
      if (tabOrderWhitelisted != []){
        for (let k = 0; k < tabOrderWhitelisted.length; k++ ){

          let check = await contract.methods.marketOrders(tabOrderWhitelisted[k]).call({from: accounts[0]});
          let check2 = await contract.methods.orderWithWithelist(tabOrderWhitelisted[k]).call({from: accounts[0]});

          if(!check.active&&check2.active){
            tabInte.push(check2);
          }
        }
      }
      setCurrentWhitelistedMarketOrders(tabInte);
    }
  }

   //Update the array of current open order
  const updateTabOrder = async() => {

    if (contract != null) {
    ////////////////////////////////////////////

      let intTab11 = [];

            contract.getPastEvents("newMarketOrder", { fromBlock: 0, toBlock: "latest" },
             function(error, event){ 

              for (let i= 0 ; i<event.length;i++){

                intTab11.push(event[i].returnValues.tokenId);
              }
              const cleanTab = [...new Set(intTab11)];
              setTabOrder(cleanTab);
              })
            .then(function(event) {
                          
            });


      ///////////////////////////////////////////

      let tabInte = [];
      if (tabOrder != []){
        for (let k = 0; k < tabOrder.length; k++ ){

          let check = await contract.methods.marketOrders(tabOrder[k]).call({from: accounts[0]});
          let check2 = await contract.methods.orderWithWithelist(tabOrder[k]).call({from: accounts[0]});

          if(check.active && !check2.active ){
            tabInte.push(check);
          }
        }
      }

      setCurrentMarketOrders(tabInte);
    }
  }

  const getBalancePlayer = async() =>{

    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const balance = await contract.methods.balancePlayer(accounts[0]).call({from: accounts[0]});
      setBalanceOfPlayer(balance);
      }catch(error){
      console.log(error);
    } 
  }

  //Update the array of active tournament
  const updateStakingTournamentTab = async () => {

    let allTab2 = [];

    if (contract2 != null){
          contract2.getPastEvents("newTournament", { fromBlock: 0, toBlock: "latest" },
       function(error, event){ 
        for (let i= 0 ; i<event.length;i++){

          allTab2.push(event[i].returnValues.idTournament);
        } 
      })
      .then(async function (event) {

        let intArr = [];

        for (let k = 0; k < allTab2.length; k++){

          let check =  await contract2.methods.tournaments(allTab2[k]).call();
             if (check.isActive) {

              let status;

              switch (check.tournamentStatus){

                case "1":
                  status = "Running";
                  break;
                case "2":
                  status= "Waiting for winner";
                  break;
                case "3":
                   status= "Closed";
                  break;
              }


              let timeRemain = Math.round(((check.durationTournament- Math.floor(Date.now() / 1000))/60/60/24)*100)/100;
              check.timeLeft = timeRemain;
              check.state = `${status}`;
              intArr.push(check);
             }
        }
        setCurrentStakingTournament(intArr); 
        console.log(); 
      });
     }
  }


  //Update the array of waiting for winner
  const updateTournamentWaitingForWinner = async () => {

    let allTab3 = [];

    if (contract2 != null){
          contract2.getPastEvents("newTournament", { fromBlock: 0, toBlock: "latest" },
       function(error, event){ 
        for (let i= 0 ; i<event.length;i++){

          allTab3.push(event[i].returnValues.idTournament);
        } 
      })
      .then(async function (event) {

        let intArr = [];

        for (let k = 0; k < allTab3.length; k++){

          let check =  await contract2.methods.tournaments(allTab3[k]).call();
             if (check.tournamentStatus == 2 ) {

              let status;

              switch (check.tournamentStatus){

                case "1":
                  status = "Running";
                  break;
                case "2":
                  status= "Waiting for winner";
                  break;
                case "3":
                   status= "Closed";
                  break;
              }

              check.state = `${status}`;
              intArr.push(check);
             }
        }
        setTournamentWaitingForWinner(intArr); 
      });
     }
  }

  //Update the array of playable tournaments
  const updateTournamentPlayable = async () => {

    let allTab4 = [];

    if (contract2 != null){
          contract2.getPastEvents("newTournament", { fromBlock: 0, toBlock: "latest" },
       function(error, event){ 
        for (let i= 0 ; i<event.length;i++){

          allTab4.push(event[i].returnValues.idTournament);
        } 
      })
      .then(async function (event) {

        let intArr = [];

        for (let k = 0; k < allTab4.length; k++){

          let check =  await contract2.methods.tournaments(allTab4[k]).call();
             if (check.tournamentStatus == 1 ) {

              let status;

              switch (check.tournamentStatus){

                case "1":
                  status = "Running";
                  break;
                case "2":
                  status= "Waiting for winner";
                  break;
                case "3":
                   status= "Closed";
                  break;
              }

              let timeRemain = Math.round(((check.durationTournament- Math.floor(Date.now() / 1000))/60/60/24)*100)/100;
              check.timeLeft = timeRemain;
              intArr.push(check);
             }
        }
        setPlayableTournament(intArr); 
      });
     }
  }



   //Update the array of finishedTournament
  const updateTournamentFinished = async () => {

    let allTab5 = [];

    if (contract2 != null){
          contract2.getPastEvents("newTournament", { fromBlock: 0, toBlock: "latest" },
       function(error, event){ 
        for (let i= 0 ; i<event.length;i++){

          allTab5.push(event[i].returnValues.idTournament);
        } 
      })
      .then(async function (event) {

        let intArr = [];

        for (let k = 0; k < allTab5.length; k++){

          let check =  await contract2.methods.tournaments(allTab5[k]).call();
             if (check.tournamentStatus == 3 ) {

              let status;

              switch (check.tournamentStatus){

                case "1":
                  status = "Running";
                  break;
                case "2":
                  status= "Waiting for winner";
                  break;
                case "3":
                   status= "Closed";
                  break;
              }

              intArr.push(check);
             }
        }
        setClosedTournament(intArr); 
      });
     }
  }

   

/************************************/





  /***********Contract call***********/
  
  // Set a player on NFT side
  const setMultiversePlayerNFT = async(address,login) => {
    try{
      UpdateETHAccount();
      await contract.methods.setMultiversePlayer(address,login).send({from: accounts[0]});
    }catch (error){
        console.log(error);
      }
  }

  // Set a player on ERC20 side
  const setMultiversePlayerFONG = async(address,login) => {
    try{
      UpdateETHAccount()
      await contract2.methods.setMultiversePlayer(address,login).send({from: accounts[0]});
    }catch (error){
        console.log(error);
      }
  }

  //Update data of player on NFT side
  const updateMultiversePlayerNFT = async(login,caseLv1,caseLv2) => {
    
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.updateMultiversePlayer(login,caseLv1,caseLv2).send({from: accounts[0]});
    }catch(error){
      console.log(error);
    }
  }

  //Update data of player on ERC20 side
  const updateMultiversePlayerFONG = async(login,XP) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.updateMultiversePlayer(login,XP).send({from: accounts[0]});
    }catch(error){
      console.log(error);
    }
  }

  // Create an item on NFT side
  const createItem = async(type, name, continent) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.createItem(type, name, continent).send({from: accounts[0]});
    }catch(error){
      console.log(error);
    }
  }

  //Convert case in item NFT side. Generate an event rewardWithdrawn 
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

  //Convert XP in ERC20. Generates an event rewardWithdrawn
  const getRewardFONG = async () => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.getReward().send({from: accounts[0]});
    }catch(error){
      console.log(error);
      
    }
  }
   
   //Fusion Item on NFT side  
  const fusionItem = async(tokenId1,tokenId2) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.fusionItem(tokenId1,tokenId2).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      
    }
  }

  //Get an array of token Id owned by the current account. Only admin function
  const getLockedItems = async() => {
    try{
      const TablockItem = []
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const lockedTab = await contract.methods.getLockedItems().call({from: accounts[0]});
      getDataItemLocked(lockedTab);
    }catch(error){
      console.log(error);
    }
  }

  // Unlock an item
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

  // Lock an item
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

  // Get an array of ETH address possesing token on a specify continent
  const getRankByContinent = async (continentNum) => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const tabInt = await contract.methods.getRankByContinent(continentNum).call();
      makeRank(tabInt);
  }

  // Get an array of token Id owned player. Access from the market place viewer
  const getItemsOfPlayer = async (address) => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
     const returnTab = await contract.methods.getItemsOfPlayer(address).call();
     getDataItemUnlockedOwner(returnTab);
  }

  //Get an array of token Id owned by the current address and send them to sort Unlocked
  const getMyItems = async () => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const returnTab = await contract.methods.getItemsOfPlayer(accounts[0]).call();
      getDataItemUnlocked(returnTab);
      }catch(error){
      console.log(error);
    }
  }

  //Get an array of token Id owned by the current address and send them to sort
  const getMyItemsInOrder = async () => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const returnTab = await contract.methods.getItemsOfPlayer(accounts[0]).call();
      getDataItemInOrder(returnTab);
      }catch(error){
      console.log(error);
    }
  }

  //Get an array of token Id owned by the current address and send them to sort onSale
  const getMyItemsInCurrentOrder = async () => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const returnTab = await contract.methods.getItemsOfPlayer(accounts[0]).call();
      getDataItemInCurrentOrder(returnTab);
      }catch(error){
      console.log(error);
    }
  }

  //Set an open market order
  const setMarketOrder = async (amount, tokenId) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.setMarketOrder(amount,tokenId).send({from: accounts[0]});
    }catch(error){
      console.log(error);
    }
  }

  //Set a whitelisted market order
  const setMarketOrderWhitelisted = async (amount, tokenId, address) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.setMarketOrderWhitelisted(amount, tokenId, address).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  //Buy an open order
  const getOrder = async (orderId) => {

    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
     
   let check = await contract.methods.marketOrders(orderId).call({from: accounts[0]});

   let etherAmount = check.priceRequested;
   
     try{
      await contract.methods.getOrder(orderId).send({from:accounts[0], value : web3.utils.toWei(etherAmount ,"ether" ) });
    }catch(error){
      console.log(error)
    }
 
  }

  //Buy a whitelisted order  
  const getWhitelistedOrder = async (orderId) => {

    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);

   let check2 = await contract.methods.orderWithWithelist(orderId).call({from: accounts[0]});
    
   let etherAmount = check2.priceRequested;

   try{
      await contract.methods.getWhitelistedOrder(orderId).send({from:accounts[0], value : web3.utils.toWei(etherAmount ,"ether" ) });
    }catch(error){
      console.log(error)
    }
  
  }

  //Cancel a market order
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

  //Withdraw money from sold
  const getMoney = async () => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract.methods.withdrawAmount().send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  //Mint ERC20 for an address
  const myMint = async (address,amount) => {
    try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.myMint(address,amount).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  //Burn ERC20
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

  //Set the amount rewarded for each stage of experience
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

  //Set the tournament
  const setTournament = async (subject, stake, duration, reward) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.setTournament(subject, stake, duration, reward).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const endTournament = async (idTournament) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.endTournament(idTournament).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const setWinner = async (idTournament, winner) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.setWinner(idTournament, winner).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

  const registerPlayer = async (idTournament) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.registerPlayer(idTournament).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  }

   const withdrawStaking = async (idTournament) => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.withdrawStaking(idTournament).send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
  } 

  const withdrawReward = async () => {
     try{
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      await contract2.methods.withdrawReward().send({from: accounts[0]});
    }catch(error){
      console.log(error);
      alert('Error transaction');
    }
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


/************************************/

  
  return (
    <div style = {{backgroundImage: `url(${Background})`, backgroundSize: "cover", paddingBottom:'100px' }}>
      <Route path = "/" >
        <Homepage
        admin = {admin}
        accounts = {accounts}
        UpdateETHAccount = {UpdateETHAccount}
        />
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
        setRewardEarned = {setRewardEarned}
        setEventWithdrawCrypto = {setEventWithdrawCrypto}
        eventWithdrawCrypto = {eventWithdrawCrypto}
        accounts = {accounts}
        UpdateETHAccount = {UpdateETHAccount}

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
        accounts = {accounts}
        />
      </Route>
      <Route path = "/marketplace" >
        <MarketPlace
        accounts = {accounts}
        />
      </Route> 
      <Route path = "/tournament" >
        <Tournament
        updateTournamentPlayable = {updateTournamentPlayable}
        setPlayableTournament = {setPlayableTournament}
        playableTournament = {playableTournament}
        accounts = {accounts}
        registerPlayer = {registerPlayer}
        />
      </Route> 
      <Route path = "/admin/setUpdate" >
        <SetUpdatePlayer 
        setMultiversePlayerNFT = {setMultiversePlayerNFT}
        setMultiversePlayerFONG = {setMultiversePlayerFONG}
        updateMultiversePlayerNFT = {updateMultiversePlayerNFT} 
        updateMultiversePlayerFONG = {updateMultiversePlayerFONG}
        accounts = {accounts} 
        />
      </Route> 
      <Route path = "/admin/setupplayer" >
        <SetUpPlayer 
        setMultiversePlayerNFT = {setMultiversePlayerNFT}
        setMultiversePlayerFONG = {setMultiversePlayerFONG}
        accounts = {accounts} 
        />
      </Route>
      <Route path = "/admin/updateplayer" >
        <UpdatePlayer
        updateMultiversePlayerNFT = {updateMultiversePlayerNFT} 
        updateMultiversePlayerFONG = {updateMultiversePlayerFONG}
        accounts = {accounts} 
        />
      </Route>
      <Route path = "/admin" >
        <Admin
        accounts = {accounts}
        />
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
        accounts = {accounts}
        />
      </Route>     
      <Route path = "/admin/unlock" >
        <Unlock
        entryTab = {lockedItemsTab}
        getLockedItems = {getLockedItems}
        unlock = {unlock}
        accounts = {accounts}
        updateScreenUnlock = {updateScreenUnlock}
        />
      </Route>    
      <Route path = "/admin/lock" >
        <LockItemsScreen
        getMyItems = {getMyItems}
        unlockedItemsTab = {unlockedItemsTab}
        lock={lock}
        accounts = {accounts}
        updateScreenLock = {updateScreenLock}
        />
      </Route> 
      <Route path = "/admin/rewardLevel" >
        <SetLevelReward
        setReward  = {setReward}
        accounts = {accounts}
        />
      </Route>
      <Route path = "/marketplace/viewRank" >
        <ViewRank
        list = {continent}
        getRankByContinent = {getRankByContinent }
        tabRank = {tabRank}
        accounts = {accounts}
        />
      </Route> 
      <Route path = "/marketplace/viewOwner" >
        <ViewOwner
        setTabItemOwner = {setTabItemOwner}
        tabItemOwner = {tabItemOwner}
        getItemsOfPlayer = {getItemsOfPlayer}
        accounts = {accounts}
       

        />
      </Route> 
      <Route path = "/marketplace/manageOrder" >
        <ManageOrder
        createMarketOrder = {setMarketOrder} 
        getMyItemsInOrder = {getMyItemsInOrder}
        setDataMyItemInOrder = {setDataMyItemInOrder}
        dataMyItemInOrder = {dataMyItemInOrder}
        accounts = {accounts}
        updateMyScreenMarketOrder = {updateMyScreenMarketOrder}
        />
      </Route> 
      <Route path = "/marketplace/manageOrderWhitelisted" >
        <ManageOrderOpen
        createMarketOrderWhitelisted = {setMarketOrderWhitelisted} 
        getMyItemsInOrder = {getMyItemsInOrder}
        setDataMyItemInOrder = {setDataMyItemInOrder}
        dataMyItemInOrder = {dataMyItemInOrder}
        accounts = {accounts}
        updateMyScreenMarketOrderWhitelisted = {updateMyScreenMarketOrderWhitelisted}
        />
      </Route>  
      <Route path = "/marketplace/buyOrder" >
        <BuyOrder
        getOrder = {getOrder}
        setTabOrder = {setTabOrder}
        setCurrentMarketOrders = {setCurrentMarketOrders}
        currentMarketOrders = {currentMarketOrders}
        updateTabOrder = {updateTabOrder}
        accounts = {accounts}
        UpdateETHAccount = {UpdateETHAccount}
        updateScreenMarketOrder = {updateScreenMarketOrder}
        />
      </Route>
      <Route path = "/marketplace/buyOrderWhitelisted" >
        <BuyOrderWhitelisted
        getWhitelistedOrder = {getWhitelistedOrder}
        setCurrentWhitelistedMarketOrders = {setCurrentWhitelistedMarketOrders}
        currentWhitelistedMarketOrders = {currentWhitelistedMarketOrders}
        updateTabOrderWhitelisted = {updateTabOrderWhitelisted}
        accounts = {accounts}
        setTabOrderWhitelisted = {setTabOrderWhitelisted}
        setTabOrder = {setTabOrder}
        UpdateETHAccount = {UpdateETHAccount}
        updateScreenMarketOrderWhitelisted = {updateScreenMarketOrderWhitelisted}
        />
      </Route>
      <Route path = "/marketplace/deleteOrder" >
        <DeleteOrder
        cancelOrder = {cancelOrder}
        getMyItemsInCurrentOrder = {getMyItemsInCurrentOrder}
        setDataMyItemInCurrentOrder = {setDataMyItemInCurrentOrder}
        dataMyItemInCurrentOrder = {dataMyItemInCurrentOrder}
        accounts = {accounts}
        updateCancelScreen = {updateCancelScreen}
        />
      </Route> 
      <Route path = "/marketplace/getbalance" >
        <GetBalance
        getMoney = {getMoney}
        getBalancePlayer = {getBalancePlayer}
        balanceOfPlayer = {balanceOfPlayer}
        accounts = {accounts}
        setBalanceOfPlayer = {setBalanceOfPlayer}
        updateMoneyWithdrawn = {updateMoneyWithdrawn}
        />
      </Route>
      <Route path = "/admin/tournament" >
        <SetTournament
        accounts = {accounts}
        setTournament = {setTournament}
        />
      </Route> 
      <Route path = "/admin/closetournament" >
        <CloseTournament
        accounts = {accounts}
        updateStakingTournamentTab = {updateStakingTournamentTab}
        currentStakingTournament = {currentStakingTournament}
        endTournament = {endTournament}
        setCurrentStakingTournament = {setCurrentStakingTournament}
        />
      </Route> 

      <Route path = "/admin/setwinnertournament" >
        <SetWinnerTournament
        accounts = {accounts}
        setWinner = {setWinner}
        updateTournamentWaitingForWinner = {updateTournamentWaitingForWinner}
        tournamentWaitingForWinner = {tournamentWaitingForWinner}
        setTournamentWaitingForWinner = {setTournamentWaitingForWinner}
        />
      </Route> 
       <Route path = "/stakingtournament" >
        <WithdrawStakeReward 
        accounts = {accounts}
        setClosedTournament = {setClosedTournament}
        closedTournament = {closedTournament}
        updateTournamentFinished = {updateTournamentFinished}
        withdrawStaking = {withdrawStaking}
        withdrawReward = {withdrawReward}
        />
      </Route>     

                             
    </div>
  );
}

export default App;