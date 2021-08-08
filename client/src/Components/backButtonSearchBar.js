import React from "react";
import Link from "./link";


const BackButtonSearchBar = ({textBack, backPath}) => {


	return (

		<div>
	 		<Link href={backPath} className = "red centered ui button" > 
	 			{textBack} 		  			
		  	</Link>
		</div>

	); 
}

export default BackButtonSearchBar;