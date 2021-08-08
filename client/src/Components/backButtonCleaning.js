import React from "react";
import Link from "./link";


const BackButtonCleaning = ({textBack, backPath,cleanFunction }) => {

	const onClick = (event) => {
		event.preventDefault();
		cleanFunction();
	}


	return (

		<div>
			<div style = {{ marginTop:'20px'}}>
				<div onClick = {onClick}>
			 		<Link href={backPath} className = "red centered ui button" > 
			 			{textBack} 		  			
				  	</Link>
				 </div>
		  	</div>
		</div>

	); 
}

export default BackButtonCleaning;