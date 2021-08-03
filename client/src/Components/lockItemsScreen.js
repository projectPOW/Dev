import React from 'react';
import Link from './link';
import TabUnlockedItems from './tabUnlockedItems';
import SearchBar from './searchBar';



const LockItemsScreen = ({getMyItems, unlockedItemsTab,lock}) => {

	const  activeUnlock = window.location.pathname === "/admin/unlock" ? 'active' : '';
	const  activeLock = window.location.pathname === "/admin/lock" ? 'active' : '';
	const  activeSetReward = window.location.pathname === "/admin/rewardLevel" ? 'active' : '';


	const onClick = (event) => {

		event.preventDefault();
		getMyItems();
	} 

	const lockId = (tokenId) => {

		lock(tokenId);
	}
	
	const Test = [1,2,3];
	
	return(
		<div className="ui raised very padded text container segment" style = {{textAlign:'center', marginTop:'100px' }} > 
			<div >
				<div className="ui inverted top attached tabular menu">
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
			<div>
			<TabUnlockedItems
				entryTab = {unlockedItemsTab}
			/>
			</div>
			<div>
				<div className = "ui button centered" onClick = {onClick}>View available items </div>
			</div>
			<div>
				<SearchBar
				textButton = "lock this item"
				holder = "Enter an ID"
				functionToCall = {lockId}
				/>

			</div>
		 </div>

	);


} 

export default LockItemsScreen;