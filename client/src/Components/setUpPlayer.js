import React, {useState} from 'react';
import DoubleSearchBar from './doubleSearchBar';
import BackButton from "./backButton";
import Link from "./link";


const SetUpPlayer = ({setMultiversePlayerNFT, setMultiversePlayerFONG, accounts}) => {

	const [userAddress,setUserAddress] = useState(null);
	const [userLogin, setUserLogin] = useState(null);
	

	return (
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment" >
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Set Up </h1>
				<div className="ui tabular menu" >
				  <Link href = "/admin/setupplayer" className="active item">
				    Set Up Player
				  </Link>
				  <Link href = "/admin/updateplayer" className=" item">
				    Update Player
				  </Link>
				</div>
				<DoubleSearchBar
				title1 = "Enter an ETH address"
				title2 = "Enter POW login"
				state1 = {setUserAddress}
				state2 = {setUserLogin}
				holder1 = "Eth address : 0x123..."
				holder2 = "Your POW login"
				functionToCall1 = {setMultiversePlayerNFT}
				functionToCall2 = {setMultiversePlayerFONG}
				textButton1 = "Set Player -Address NFT"
				textButton2 = "Set Player -Address FONG"
				accounts = {accounts}
				style = {{paddingTop: "30px"}}
				/>
				<BackButton
				textBack = "Back"
				backPath = "/admin"
				/>
			</div>
		</div>
	);


}

export default SetUpPlayer;