import React, {useEffect} from "react";
import DoubleButtonWithdraw from "./doubleButtonWithdraw";
import BackButtonCleaning from "./backButtonCleaning"


const GetBalance = ({getMoney, getBalancePlayer, balanceOfPlayer, accounts, setBalanceOfPlayer, updateMoneyWithdrawn}) => {


	useEffect(() => {

		getBalancePlayer();

	},[updateMoneyWithdrawn])

	const messageToWithdraw = () => {

		if( balanceOfPlayer > 0) {


			return (

				<div className="ui positive message">
				  <div className="header">
				    You have {balanceOfPlayer/1000000000000000000} eth to withdraw 
				  </div>
				</div>
			);
		}else{
			return (

				<div className="ui negative message">
				  <div className="header">
				    You have {balanceOfPlayer} eth to withdraw 
				  </div>
				</div>
			);
		}

	}

	const update = (event) => {

		event.preventDefault();
		getBalancePlayer();
	}

	const clean = () => {

		setBalanceOfPlayer(0);

	}
	
	return(
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className ="ui header huge" style = {{paddingBottom:'40px' }}> Withdraw Your ETH</h1>
				<div>
					{messageToWithdraw()}
				</div>
				<div>
					<DoubleButtonWithdraw
					textButton1 = "Withdraw"
					textButton2 = "Updtate"
					function1 = {getMoney}
					function2 = {update}
					/>
				</div>
				<div>
					<BackButtonCleaning
					backPath= "/marketplace"
					cleanFunction = {clean}
					textBack = "Back"
					/>
				</div>
			</div>
		</div>
	);

}

export default GetBalance;
