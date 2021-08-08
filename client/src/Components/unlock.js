import React, {useEffect} from "react";
import TabLockedItems from "./tabLockedItems";
import DoubleButtonActionBack from "./doubleButtonActionBack";
import Link from "./link";
import SearchBar from "./searchBar";



const Unlock = ({updateScreenUnlock,entryTab, getLockedItems, unlock, accounts}) => {

	useEffect(() => {

		getLockedItems();

	},[updateScreenUnlock] )


	const onClick = (event) => {

		getLockedItems();

	}

	const unclockItem = (tokenId) =>{

		unlock(tokenId);
	}
	
	const  activeUnlock = window.location.pathname === "/admin/unlock" ? 'active' : '';
	const  activeLock = window.location.pathname === "/admin/lock" ? 'active' : '';
	const  activeSetReward = window.location.pathname === "/admin/rewardLevel" ? 'active' : '';


	return (
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment" > 
				<div>
					<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
					  <p>Current address :{accounts}</p>
					</div>
					<h1 className = "ui  huge header"  style = {{textAlign:'center', marginBottom:'50px' }} >Unlock Item</h1>
					<div className="ui tabular menu">
					  <Link href = "/admin/unlock" className={`item ${activeUnlock}`}>
					    Unlock Items 
					  </Link>
					  <Link href = "/admin/lock"  className={`item ${activeLock}`}>
					    Lock Item
					  </Link>
					  <Link href = "/admin/rewardLevel"  className={`item ${activeSetReward}`}>
					    Set level reward
					  </Link>
					</div>	
				</div>
				<div style = {{ marginTop:"30px"}}>
					<SearchBar
					textToEnter = "Entrer an Id token to unlock"
					textButton = "Unlock"
					holder = "Enter an ID"
					functionToCall = {unclockItem}
					/>	
				</div>	

				<div style = {{ textAlign:'center'}}>
			 		<DoubleButtonActionBack
					function1= {onClick}
					backPath= "/admin"
					textButton = "Update List"
					textBack = "Back"
					/>				
				</div>		
				<div>
					<TabLockedItems
					entryTab = {entryTab}
					/>
				</div>
			</div>
		</div>
	);


} 

export default Unlock;