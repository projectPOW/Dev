import React from "react";
import Link from "./link";


const BackButtonCleaningBuyOrder = ({textBack, backPath,cleanFunction }) => {


	return (

		<div>
			<div style = {{ marginTop:'20px'}}>
				<div>
			 		<Link href={backPath} className = "red centered ui button" > 
			 			{textBack} 		  			
				  	</Link>
				 </div>
		  	</div>
		</div>

	); 
}

export default BackButtonCleaningBuyOrder;