import React, {useEffect} from 'react';
import Message from "./message";
import DoubleButton from './doubleButton';
import BackButtonCleaning from './backButtonCleaning';


const Reward = ({ accounts, UpdateETHAccount ,getPlayerDataNFT, getPlayerDataFONG ,getRewardNFT,getRewardFONG, dataFongPlayer,dataNftPlayer, rewardEarned,setRewardEarned,setEventWithdrawCrypto,eventWithdrawCrypto}) => {

	useEffect ( () => {

		UpdateETHAccount();
		getPlayerDataNFT();
	 	getPlayerDataFONG();

		
	},[rewardEarned]);

	const onClickNFT = (event) =>{

		event.preventDefault();
		getRewardNFT();
	}

	const onClickFONG = (event) =>{

		event.preventDefault();
		getRewardFONG();
	}

	const cleanListReward = ()=>{

		setRewardEarned([]);
	}	

	const update = () => {

		getPlayerDataNFT();
	 	getPlayerDataFONG();

	}


	return (
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div >
					<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
					  <p>Current address :{accounts}</p>
					</div>
					<h1 className = "ui  huge header"  style = {{textAlign:'center', marginBottom:'50px' }} >Rewards</h1>
					<div>
						<button className = "ui green button" onClick = {update} style = {{ marginBottom:'20px', fontStyle: "italic" }}> Update my Data</button>
					</div>
					<div className = "search-bar">
						<Message
						dataNftPlayer = {dataNftPlayer}
						dataFongPlayer = {dataFongPlayer}
						rewardEarned = {rewardEarned}
						cleanListReward = {cleanListReward}
						eventWithdrawCrypto = {eventWithdrawCrypto}
						setEventWithdrawCrypto = {setEventWithdrawCrypto}
						/>
					<div >
				 		<DoubleButton
						function1= {onClickNFT}
						function2= {onClickFONG}
						textButton1 = "Collect my NFT"
						textButton2 = "Collect my ERC20"
						/>
					</div>
						<div style = {{textAlign :"center"}}>
							<BackButtonCleaning
							textBack = "Back To menu"
							backPath = "/"
							cleanFunction = {cleanListReward}
							/>
						</div>
					</div>				
				</div>
			</div>
		</div>
	) ;
}

export default Reward; 