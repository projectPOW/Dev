import React, {useEffect} from "react";
import TabLockedItems from "./tabLockedItems";
import DoubleButtonActionBack from "./doubleButtonActionBack";
import Link from "./link";
import SearchBar from "./searchBar";



const Unlock = ({entryTab, getLockedItems, unlock}) => {

	useEffect(() => {

		getLockedItems();

	},[] )


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
		<div className="ui raised very padded text container segment" style = {{textAlign:'center', marginTop:'100px' }}> 
			<div>
				<div className="ui inverted top attached tabular menu">
				  <Link href = "/admin/unlock" className={`item ${activeUnlock}`}>
				    Unlock Items 
				  </Link>
				  <Link href = "/admin/lock"  className={`item ${activeLock}`}>
				    Lock Item
				  </Link>
				  <Link href = "/admin/rewardLevel"  className={`item ${activeLock}`}>
				    Set level reward
				  </Link>
				</div>	
			</div>
			<div>
				<TabLockedItems
				entryTab = {entryTab}
				/>
			</div>
			<div style = {{ textAlign:'center', marginBottom:'50px'}}>
		 		<DoubleButtonActionBack
				function1= {onClick}
				backPath= "/admin"
				textButton = "Update List"
				textBack = "Back"
				/>
			</div>
			<SearchBar
				textButton = "Unlock item"
				holder = "Enter an ID"
				functionToCall = {unclockItem}
				/>
		</div>
	);


} 

export default Unlock;