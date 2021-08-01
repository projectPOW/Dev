import React from "react";
import Link from "./link";
import SearchBar from "./searchBar";



const SetLevelReward = ({setReward}) => {
	
	const  activeUnlock = window.location.pathname === "/admin/unlock" ? 'active' : '';
	const  activeLock = window.location.pathname === "/admin/lock" ? 'active' : '';
	const  activeSetReward = window.location.pathname === "/admin/rewardLevel" ? 'active' : '';

	const setLevel = (amountOfXp) => {

		setReward(amountOfXp);
	}

	return (

		<div>
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
			<SearchBar
			textButton = "Set level"
			holder = "Enter a level of XP"
			functionToCall = {setLevel}
			/>

		</div>

	);
}

export default SetLevelReward;