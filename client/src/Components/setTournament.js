import React from "react"; 
import Link from "./link";
import FiveSearchBar from "./fiveSearchBar";



const SetTournament = ({accounts, setTournament}) => {
	
	return(
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment" >
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Set staking Tournament </h1>
				<div className="ui tabular menu" >
				  <Link href = "/admin/tournament" className="active item">
				    Set tournament
				  </Link>
				  <Link href = "/admin/closetournament" className=" item">
				    End tournament
				  </Link>
				  <Link href = "/admin/setwinnertournament" className=" item">
				    Set Winner
				  </Link>	
				</div>
				<div>
				  <FiveSearchBar
				  title1 = "Tournament theme"
				  title2 = "Tournament duration"
				  title3 = "Requested stake "
				  title4 = "Reward"
				  textButton = "Set Tournament"
				  textBack = "Back"
				  backPath = "/admin"
				  holder1 = "Enter the subject"
				  holder2 = "Duration in days"
				  holder3 = "Amount in POW"
				  holder4 = "Amount in POW"
				  functionToCall = {setTournament}

				  />
				</div>
			</div>
		</div>

	)


}

export default SetTournament;