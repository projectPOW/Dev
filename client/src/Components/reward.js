import React, {useEffect, useState} from 'react';
import Message from "./message";
import DoubleButton from './doubleButton';
import BackButtonCleaning from './backButtonCleaning';


const Reward = ({getPlayerDataNFT, getPlayerDataFONG ,getRewardNFT,getRewardFONG, dataFongPlayer,dataNftPlayer, rewardEarned, rewardFONG,setRewardEarned,setEventWithdrawCrypto,eventWithdrawCrypto}) => {


	useEffect ( () => {

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


	return (
		<div>
			<div className="ui raised very padded text container segment" style = {{ marginTop:'100px' }}>
				<h1 className = "ui header" style = {{textAlign:'center', marginBottom:'50px' }} > Reward </h1>
				<div className = "search-bar">
					<Message
					dataNftPlayer = {dataNftPlayer}
					dataFongPlayer = {dataFongPlayer}
					rewardEarned = {rewardEarned}
					rewardFONG = {rewardFONG}
					setRewardEarned = {setRewardEarned}
					cleanListReward = {cleanListReward}
					eventWithdrawCrypto = {eventWithdrawCrypto}
					setEventWithdrawCrypto = {setEventWithdrawCrypto}
					/>
				<div style = {{ textAlign:'center', marginBottom:'50px'}}>
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
	) ;
}

export default Reward; 