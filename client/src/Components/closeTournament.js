import React, {useEffect} from "react";
import Link from "./link";
import TabTournamentOwner from "./tabTournamentOwner";
import SearchBarBackButton from "./searchBarBackButton";


const CloseTournament = ({endTournament,updateStakingTournamentTab, accounts, currentStakingTournament, setCurrentStakingTournament}) => {

	useEffect(()=> {

		return () => {

			setCurrentStakingTournament([])
		}

	},[])

	const onClick = () =>{

		updateStakingTournamentTab();
	}

	return(

		<div style = {{textAlign:'center', paddingTop:'100px',paddingRight:'250px', paddingLeft: '250px' }}>
			<div className="ui raised very padded text  segment" >
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Close staking Tournament </h1>
				<div className="ui tabular menu" >
				  <Link href = "/admin/tournament" className="item">
				    Set tournament
				  </Link>
				  <Link href = "/admin/closetournament" className="active item">
				    End tournament
				  </Link>
				  <Link href = "/admin/setwinnertournament" className="item">
				    Set Winner
				  </Link>
				</div>
				<div style = {{ paddingTop:'50px' }}>
					<SearchBarBackButton
					textButton = "End Tournament"
					functionToCall = {endTournament}
					textBack = "back"
					backPath = "/admin"
					textToEnter = "Enter the Id tournament to finish" 
					/>
				</div>

				<div style = {{paddingBottom:'30px', paddingTop:'50px' }} >
					<button className = "ui green button" onClick = {onClick}> Update List </button>
				</div>
				<div>
					<h2 style = {{textAlign:'left'}}>Active Tournament</h2>
					<TabTournamentOwner
					entryTab = {currentStakingTournament}
					/>
				</div>
			</div>
		</div>	
	)
}

export default CloseTournament;