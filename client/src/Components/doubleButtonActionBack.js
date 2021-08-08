import React from "react";
import Link from "./link";


const DoubleButtonActionBack = ({textButton, textBack, function1, backPath}) => {

	const onClick1 = (event) => {
			event.preventDefault();
			function1(event);
		}


	return (

		<div className="ui grid">
		  <div className="two wide column"></div>
		  	<div className = "row centered " style = {{ marginBottom:'10px'}}>
		  		<button className = "primary ui button" onClick = {onClick1} style = {{ marginTop:'10px'}}> {textButton} </button>
		  		<div style = {{ marginTop:'10px'}}>
			  		<Link href={backPath} className = "red ui button" > 
			 			{textBack} 		  			
			  		</Link>
		  		</div>
		  	</div>
		</div>

	); 
}

export default DoubleButtonActionBack;