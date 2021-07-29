import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Homepage from './Components/homepage';
import CollectReward from "./Components/collectReward";
import MergeItems from "./Components/mergeItems";
import Tournament from "./Components/tournament";
import Marketplace from "./Components/marketplace";
import WatchMaps from "./Components/watchMaps";
import ViewItems from "./Components/viewItems";
import CurrentOrder from "./Components/currentOrder";
import SellingOrder from "./Components/sellingOrder";
import BuyItems from "./Components/buyItems";
import POWHomepage from "./Components/powHomepage";
import POWCreateItem from "./Components/powCreateItem";
import POWLaunchTournament from "./Components/powLaunchTournament";
import POWatchLockItems from "./Components/powAtchLockItems";


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div style = {{background:'#055F89'}}>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h3>Welcome player  {accounts} </h3>
            </div>

            <Homepage />

            {/*<CollectReward />*/}

            {/*<MergeItems />*/}

            {/*<Tournament />*/}

            {/*<Marketplace />*/}

            {/*<WatchMaps />*/}

            {/*<ViewItems />*/}

            {/*<CurrentOrder />*/}

            {/*<SellingOrder />*/}

            {/*<BuyItems />*/}

            {/*<POWHomepage />*/}

            {/*<POWCreateItem />*/}

            {/*<POWLaunchTournament />*/}

            {/*<POWatchLockItems />*/}

        </div>

    );
  }
}

export default App;
