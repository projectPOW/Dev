import React from 'react';
import SearchBar from "./searchBar";
import BackButtonCleaning from "./backButtonCleaning";
import TabOwner from "./tabOwner";



const ViewOwner = ({setTabItemOwner, tabItemOwner, getItemsOfPlayer}) => {
	
	const onClick = (address) =>{

		getItemsOfPlayer(address);
	} 

	const cleanFunction = () => {

		setTabItemOwner([]);
	}


	return (

		<div>
			<SearchBar
			textButton = "View"
			textToEnter = "Please write the Address"
			holder = "0x4b.."
			functionToCall = {onClick}
			/>
			<BackButtonCleaning
			textBack = "Back"
			backPath = "/marketplace"
			cleanFunction = {cleanFunction}
			/>
			<TabOwner
			entryTab={tabItemOwner}
			/>

		</div>
	);
}

export default ViewOwner;