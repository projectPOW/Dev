import React from "react";
import FourSearchBar from "./fourSearchBar";
import BackButton from "./backButton";
import Link from "./link";
  

const UpdatePLayer = ({updateMultiversePlayerNFT,updateMultiversePlayerFONG, accounts}) => {
	
return(
	<div style = {{textAlign:'center', paddingTop : "100px" }}>
		
		<div className="ui raised very padded text container segment" >
			<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
			  <p>Current address :{accounts}</p>
			</div>
			<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Update </h1>
			<div className="ui tabular menu" >
			  <Link href = "/admin/setupplayer" className="item">
			    Set Up Player
			  </Link>
			  <Link href = "/admin/updateplayer" className=" active item">
			    Update Player
			  </Link>
			</div>
			<FourSearchBar
			title1 = "Enter POW login"
			title2 = "Enter the number of case Level1"
			title3 = "Enter the number of case level2"
			title4 = "Enter the amount of experience points"
			holder1 = "Enter The POW login"
			holder2 = "Case level 1"
			holder3 = "Case level 2"
			holder4 = "Points xp.. "
			updateMultiversePlayerNFT = {updateMultiversePlayerNFT}
			updateMultiversePlayerFONG = {updateMultiversePlayerFONG}
			textButton1 = "Update data NFT"
			textButton2= "Update data FONG"
			/>
			<BackButton
			textBack = "Back"
			backPath = "/admin"
			/>
		</div>
	</div>


)


}

export default UpdatePLayer;

