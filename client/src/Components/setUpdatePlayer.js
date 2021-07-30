import React, {useState} from 'react';
import SetUpPlayer from './setUpPlayer';
import Route from "./route"
import TwoHeaders from "./twoHeaders"
import UpdatePlayer from "./updatePlayer"




const SetUpdatePlayer = ({functionToSet,functionToUpdate}) => {

	const [screenSet,setScreenSet] = useState(true);
	const [screenUpdate,setScreenUpdate] = useState(false);

	const view = () => {

		if (screenSet) {
			return <SetUpPlayer setFunction = {functionToSet}/>
		}else{
			return <UpdatePlayer updateFunction = {functionToUpdate}/>
		}
	}
	


	return(
		<div >
			<h1 className = "ui header" style = {{textAlign:'center', margin:'20px' }} > Set / Update Player </h1>
			<div style = {{ margin:'50px 500px ' }}>
				<div>
					<TwoHeaders
					viewSet = {setScreenSet}
					viewUpdate = {setScreenUpdate}
					/>
				</div>	
				<div >
				 {view()}
				</div>
			</div>
			
 		</div>
		);
}

export default SetUpdatePlayer;