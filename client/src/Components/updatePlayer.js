import React from "react";
import FourSearchBar from "./fourSearchBar";


const UpdatePLayer = ({updateFunction}) => {
	
return(
	<div style = {{textAlign:'center', margin:'50px 0px 1000px 0px' , padding : "0px 0px 50px" }}>
		<div >
			<FourSearchBar
			title1 = "Enter POW login"
			title2 = "Enter the number of case Level1"
			title3 = "Enter the number of case level2"
			title4 = "Enter the amount of experience points"
			holder1 = "Albert 123"
			holder2 = "4"
			holder3 = "1"
			holder4 = "1300"
			functionToCall = {updateFunction}
			textButton = "Update data"
			/>
		</div>
	</div>


)


}

export default UpdatePLayer;

