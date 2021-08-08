import React,{useEffect} from "react";
import Link from "./link"
import TabTournamentWaitingWinner from "./tabTournamentWaitingWinner"
import DoubleSearchBarTournamentOwner from "./doubleSearchBarTournamentOwner"

const SetWinnerTournament = ({accounts, setWinner, tournamentWaitingForWinner, updateTournamentWaitingForWinner, setTournamentWaitingForWinner}) => {

	useEffect(()=> {

		return () => {

			setTournamentWaitingForWinner([]);
		}
	},[])


	const onClick = (idTournament, winner) => {

		updateTournamentWaitingForWinner();

	} 
	
	return(
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment" >
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Set winner </h1>
				<div className="ui tabular menu" >
				  <Link href = "/admin/tournament" className="item">
				    Set tournament
				  </Link>
				  <Link href = "/admin/closetournament" className=" item">
				    End tournament
				  </Link>
				  <Link href = "/admin/setwinnertournament" className=" active item">
				    Set Winner
				  </Link>	
				</div>
				<div>
					<div>
						<DoubleSearchBarTournamentOwner
						title1 = "Id tournament"
						title2 = "Address Winner"
						textButton = "Set Winner"
						textBack = "Back"
						backPath = "/admin"
						holder1 = "id.."
						holder2 = "0x453..."
						functionToCall = {setWinner}

						/>
					</div>
					<div style = {{paddingBottom:'30px', paddingTop:'50px' }} >
						<button className = "ui green button" onClick = {onClick}> Update List </button>
					</div>
					<div>
						<h2 style = {{textAlign:'left'}}>Tournaments waiting for Winner</h2>
						<TabTournamentWaitingWinner
						entryTab = {tournamentWaitingForWinner}
						/>
					</div>
				</div>
			</div>
		</div>
	)

}

export default SetWinnerTournament;