import React,{useState} from 'react';

const Message = ({dataNftPlayer,dataFongPlayer,rewardEarned, rewardFONG,setRewardEarned, cleanListReward, setEventWithdrawCrypto, eventWithdrawCrypto}) => {

	
	const [active,setActive] = useState(false);

	const test = [1,2,3];

	const onClick = (event) => {
		setActive(true);
		event.preventDefault();
	}

	const onClickClose = (event) =>{
		setActive(false);
		cleanListReward();
	}

	const timerBubble = () =>{

		if (active === true){
		setTimeout(() =>{setActive(false);}, 4000);
		}
	}

	const onClickCloseERC20 = () =>{
		setEventWithdrawCrypto(false);
	}

	const timerBubbleERC20 = () =>{
		if (eventWithdrawCrypto === true){
		setTimeout(() =>{setEventWithdrawCrypto(false);}, 3000);
		}
	}

	const listEarnings = rewardEarned.map( (Tab,index) => {return (<li key = {index}>{Tab}</li>);})

	const withrawn = eventWithdrawCrypto === true? '' : 'hidden'; 

	const value = rewardEarned.length > 0 ? listEarnings: '';
	const headerSuccess = rewardEarned.length > 0 ? "Congratulation!": "Not yet..";
	const secondTitle = rewardEarned.length > 0 ? "Here what your earned:": "First convert your rewards!";

	const state = active === true ? '' : 'hidden';

	const playerName = () =>{

		if (dataNftPlayer.isRegistered){
			return dataNftPlayer.login;
		}else{
			return dataFongPlayer.login;
		}

	}

	return(
		<div>
			<div className="ui message">
			  <h2>
			    {`Welcome back ${playerName()}!`}
			  </h2>
			  <div className = "ui header"> Your data </div>
			  <ul className="list">
			    <li>{`You have ${dataNftPlayer.rewardLv1} reward Level 1 pending `}</li>
			    <li>{`You have ${dataNftPlayer.rewardLv2} reward level 2 pending `}</li>
			    <li>{`You have ${dataFongPlayer.XP} experience point`}</li>
			  </ul>
			</div>
			<div className={`ui positive message ${state}`} style = {{marginTop:'30px'}}>
			  	<i className="close icon" onClick = {onClickClose}></i>
			  		<div className="header green">
			   			{headerSuccess}
					</div>
			  	<p>{secondTitle}</p> 
			  	<ul>{value}</ul>
			  	{timerBubble()}			  	
			</div>
			<div className={`ui positive message ${withrawn}`} style = {{marginTop:'30px'}}>
			  	<i className="close icon" onClick = {onClickCloseERC20}></i>
			  		<div className="header green">
			   			"Money withrawn"
			   			{timerBubbleERC20()}
					</div>	  	
			</div>
			<div style = {{textAlign :"center"}}>
		       <button className = "ui button  " onClick = {onClick} style = {{textAlign : "center"}}> view item</button>
		    </div>			
		</div>
	)
}

export default Message;