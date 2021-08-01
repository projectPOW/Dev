import React from "react";


const DoubleButton = ({textButton1, textButton2, function1, function2}) => {

	const onClick1 = (event) => {
			event.preventDefault();
			function1(event);
		}

	const onClick2 = (event) => {
			event.preventDefault();
			function2(event);
		}

	return (

		<div className="ui grid">
		  <div className="two wide column"></div>
		  	<div className = "row centered " style = {{ marginBottom:'50px'}}>
		  		<button className = "blue ui button" onClick = {onClick1} style = {{ marginTop:'50px'}}> {textButton1} </button>
		  		<button className = "blue ui button" onClick = {onClick2} style = {{ marginTop:'50px'}}> {textButton2} </button>
		  	</div>
		</div>

	); 
}

export default DoubleButton;