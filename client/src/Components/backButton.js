import React from "react";
import Link from "./link";


const BackButton = ({textBack, backPath}) => {


	return (

		<div>
			<div style = {{ marginTop:'50px'}}>
		 		<Link href={backPath} className = "red centered ui button" > 
		 			{textBack} 		  			
			  	</Link>
		  	</div>
		</div>

	); 
}

export default BackButton;