import React, {useState} from 'react';
import SetUpPlayer from './setUpPlayer';
import Route from "./route"
import TwoHeaders from "./twoHeaders"
import UpdatePlayer from "./updatePlayer"



const SetUpdatePlayer = ({setMultiversePlayerNFT,setMultiversePlayerFONG,updateMultiversePlayerNFT,updateMultiversePlayerFONG}) => {

	const [screenSet,setScreenSet] = useState(true);
	const [screenUpdate,setScreenUpdate] = useState(false);

	const view = () => {

		if (screenSet) {
			return <SetUpPlayer setMultiversePlayerNFT = {setMultiversePlayerNFT} setMultiversePlayerFONG= {setMultiversePlayerFONG}/>
		}else{
			return <UpdatePlayer updateMultiversePlayerNFT = {updateMultiversePlayerNFT} updateMultiversePlayerFONG = {updateMultiversePlayerFONG}/>
		}
	}

	return(
		<div >
			<h1 className = "ui header" style = {{textAlign:'center', margin:'20px' }} > Set / Update Player </h1>
			<div className="ui container"> 
				<div>
					<TwoHeaders
					viewSet = {setScreenSet}
					viewUpdate = {setScreenUpdate}
					/>
					{view()}
				</div>	
			</div>
			
 		</div>
		);
}

export default SetUpdatePlayer;