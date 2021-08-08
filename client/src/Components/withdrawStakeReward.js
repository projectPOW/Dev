import React, {useEffect} from "react";
import Link from "./link";
import TabTournamentWithdraw from "./tabTournamentWithdraw";
import BackButton from "./backButton";
import SearchBar from "./searchBar";



const WithdrawStakeReward = ({accounts,setClosedTournament,closedTournament,updateTournamentFinished,withdrawStaking, withdrawReward}) => {


	useEffect(()=>{

		return () => {

			setClosedTournament([]);
		}

	},[])

	const onClick = (event) => {

		event.preventDefault();
		updateTournamentFinished();

	}

	const onClick2 = (event) => {

		event.preventDefault();
		withdrawReward();

	}

	
	return(
		<div style = {{textAlign:'center', paddingTop:'100px',paddingRight:'250px', paddingLeft: '250px' }}>
			<div className="ui raised very padded text  segment" >
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Withdraw </h1>
				<div className="ui tabular menu" >
				  <Link href = "/tournament" className=" item">
				    Set tournament
				  </Link>
				  <Link href = "/stakingtournament" className=" active item">
				    Withdraw
				  </Link>
				</div>
				<div className = "ui two column grid">
					<div className = "column">
						<div className="ui raised very padded text  segment" >
							<div style = {{paddingBottom:'30px' }}>
								<h3>Every player</h3>
							</div>
							<SearchBar
							textToEnter = "Id tournament you want to withdraw your stake from"
							textButton = "Withdraw stake"
							holder = "id Tournament"
							functionToCall = {withdrawStaking}
							/>
						</div>
					</div>
					<div className = "column">
						<div className="ui raised very padded text  segment" >
							<div style = {{paddingBottom:'30px' }}>
								<h3>Winner Only</h3>
							</div>
							<div style = {{paddingBottom:'30px' }} >		
								<button className = "ui green button" onClick = {onClick2}> Withdraw my Rewards </button>
							</div>
						</div>
					</div>
				</div>
				<div style = {{paddingBottom:'20px'}}>
					<BackButton
					textBack = "Back"
					backPath = "/"
					/>
				</div>
				<div style = {{paddingBottom:'30px' }} >		
					<button className = "ui green button" onClick = {onClick}> Update List </button>
				</div>
				<div>
					<TabTournamentWithdraw
					entryTab = {closedTournament}
					/>
				</div>
			</div>
		</div>
	)

}

export default WithdrawStakeReward;