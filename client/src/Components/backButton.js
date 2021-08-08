import React from "react";
import Link from "./link";


const BackButton = ({textBack, backPath}) => {


	return (

		<div>
			<div style = {{ marginTop:'20px'}}>
		 		<Link href={backPath} className = "red centered ui button" > 
		 			{textBack} 		  			
			  	</Link>
		  	</div>
		</div>

	); 
}

export default BackButton;