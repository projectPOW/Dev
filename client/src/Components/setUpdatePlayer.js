import React, {useState} from 'react';
import SetUpPlayer from './setUpPlayer';
import TwoHeaders from "./twoHeaders";
import UpdatePlayer from "./updatePlayer";




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
		<div>
			<div style = {{ paddingTop:'100px' }}>
			<div className="ui container"> 
				<h1 className = "ui header" style = {{textAlign:'center', margin:'20px' }} > Set / Update Player </h1>
				<div> 
					<div>
						<TwoHeaders
						viewSet = {setScreenSet}
						viewUpdate = {setScreenUpdate}
						/>
						{view()}
					</div>
				</div>	
			</div>
			</div>		
 		</div>
		);
}

export default SetUpdatePlayer;