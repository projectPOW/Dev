import React, {useEffect} from 'react';
import Link from './link';
import TabUnlockedItems from './tabUnlockedItems';
import SearchBar from './searchBar';
import DoubleButtonActionBack from "./doubleButtonActionBack";



const LockItemsScreen = ({updateScreenLock,getMyItems, unlockedItemsTab,lock, accounts}) => {

	const  activeUnlock = window.location.pathname === "/admin/unlock" ? 'active' : '';
	const  activeLock = window.location.pathname === "/admin/lock" ? 'active' : '';
	const  activeSetReward = window.location.pathname === "/admin/rewardLevel" ? 'active' : '';

	useEffect(() => {

		getMyItems();
		
	},[updateScreenLock] )


	const onClick = (event) => {

		event.preventDefault();
		getMyItems();
	} 

	const lockId = (tokenId) => {

		lock(tokenId);
	}
	
	
	return(
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment"  > 
				<div >
					<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
					  <p>Current address :{accounts}</p>
					</div>
					<h1 className = "ui  huge header"  style = {{textAlign:'center', marginBottom:'50px' }} >Lock Items</h1>
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
				<div style = {{ marginTop:'30px'}}>
					<SearchBar
					textButton = "Lock"
					holder = "Enter an ID"
					functionToCall = {lockId}
					textToEnter = "Entrer an Id token to lock"
					/>
				</div>
				<div style = {{ marginBottom:'30px' }} >
					<div style = {{ textAlign:'center'}}>
			 		<DoubleButtonActionBack
					function1= {onClick}
					backPath= "/admin"
					textButton = "Update List"
					textBack = "Back"
					/>				
				</div>	
				</div>
				<div>
				<TabUnlockedItems
					entryTab = {unlockedItemsTab}
				/>
				</div>	
			 </div>
		</div>

	);


} 

export default LockItemsScreen;