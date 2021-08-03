import React from "react";
import Link from "./link";


const BackButtonCleaningNextTo = ({textBack, backPath,cleanFunction }) => {

	const onClick = (event) => {
		event.preventDefault();
		cleanFunction();
	}


	return (

		<div>
			<button  onClick = {onClick}>
		 		<Link href={backPath} className = "ui button red" > 
		 			{textBack} 		  			
			  	</Link>
			 </button>
		</div>

	); 
}

export default BackButtonCleaningNextTo;