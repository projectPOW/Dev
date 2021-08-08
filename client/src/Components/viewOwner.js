import React from 'react';
import SearchBar from "./searchBar";
import BackButtonCleaning from "./backButtonCleaning";
import TabOwner from "./tabOwner";



const ViewOwner = ({setTabItemOwner, tabItemOwner, getItemsOfPlayer, accounts}) => {
	
	const onClick = (address) =>{

		getItemsOfPlayer(address);
	} 

	const cleanFunction = () => {

		setTabItemOwner([]);
	}


	return (

		<div>
			<div style = {{textAlign:'center', paddingTop:'100px' }}>
				<div className="ui raised very padded text container segment" >
					<div>
						<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
						  <p>Current address :{accounts}</p>
						</div>
						<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> View Map PLayer</h1>
					</div> 
					<SearchBar
					textButton = "Explore Map"
					textToEnter = "Please write the Address"
					holder = "0x4b.."
					functionToCall = {onClick}
					/>
					<div style = {{paddingTop:'10px', paddingBottom:'10px' }}>
						<BackButtonCleaning
						textBack = "Back"
						backPath = "/marketplace"
						cleanFunction = {cleanFunction}
						/>
					</div>
					<TabOwner
					entryTab={tabItemOwner}
					/>
				</div>
			</div>
		</div>
	);
}

export default ViewOwner;