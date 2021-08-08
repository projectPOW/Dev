import React from "react";
import Link from "./link";
import SearchBar from "./searchBar";
import BackButton from "./backButton"



const SetLevelReward = ({setReward, accounts}) => {

	
	
	const  activeUnlock = window.location.pathname === "/admin/unlock" ? 'active' : '';
	const  activeLock = window.location.pathname === "/admin/lock" ? 'active' : '';
	const  activeSetReward = window.location.pathname === "/admin/rewardLevel" ? 'active' : '';

	const setLevel = (amountOfXp) => {

		setReward(amountOfXp);
	}

	return (
		<div style = {{textAlign:'center', paddingTop:'100px' }} >
			<div className="ui raised very padded text container segment" > 
				<div>
					<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
					 <p>Current address :{accounts}</p>
					</div>
					<h1 className = "ui  huge header"  style = {{textAlign:'center', marginBottom:'50px' }} >Reward Amount</h1>
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
				<div style = {{marginTop:"30px"}}>
				<SearchBar
				textButton = "Set Amount"
				holder = "Enter an amount of POW"
				functionToCall = {setLevel}
				textToEnter = "Entrer The amount given for each level"
				/>
				<BackButton
				textBack = "Back"
				backPath = "/admin"
				/>
				</div>
			</div>
		</div>

	);
}

export default SetLevelReward;