import React, {useEffect} from 'react';
import Link from "./link"
import SearchBarBackButton from "./searchBarBackButton";
import TabTournamentPlayable from "./tabTournamentPlayable";

const Tournament = ({updateTournamentPlayable,setPlayableTournament,playableTournament, accounts, registerPlayer}) => {


	useEffect(()=>{

		return () => {
			setPlayableTournament([]);
		}

	},[])


	const onClick = (event) => {
		event.preventDefault();
		updateTournamentPlayable();
	}
      


	return (
		<div style = {{textAlign:'center', paddingTop:'100px',paddingRight:'250px', paddingLeft: '250px' }}>
			<div className="ui raised very padded text  segment" >
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Register For tournament </h1>
				<div className="ui tabular menu" >
				  <Link href = "/tournament" className="active item">
				    Set tournament
				  </Link>
				  <Link href = "/stakingtournament" className=" item">
				    Withdraw
				  </Link>
				</div>
				<div style = {{ paddingTop:'50px' }}>
					<SearchBarBackButton
					textButton = "Register"
					textBack = "back"
					backPath = "/"
					textToEnter = "Enter the Id tournament you want to play" 
					functionToCall = {registerPlayer}
					/>
				</div>

				<div style = {{paddingBottom:'30px', paddingTop:'50px' }} >
					<button className = "ui green button" onClick = {onClick}> Update List </button>
				</div>
				<div>
					<h2 style = {{textAlign:'left'}}>Active Tournament</h2>
					<TabTournamentPlayable
					entryTab = {playableTournament}
					/>
				</div>
			</div>
		</div>	
	) ;
}

export default Tournament; 