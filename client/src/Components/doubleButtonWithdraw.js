import React from "react";


const DoubleButtonWithdraw = ({textButton1, textButton2, function1, function2}) => {

	const onClick1 = (event) => {
			event.preventDefault();
			function1();
		}

	const onClick2 = (event) => {
			event.preventDefault();
			function2(event);
		}

	return (

		<div className="ui grid">
		  <div className="two wide column" style = {{ marginTop:'10px'}} ></div>
		  	<div className = "row centered ">
		  		<button className = "green ui button" onClick = {onClick1} > {textButton1} </button>
		  		<button className = "blue ui button" onClick = {onClick2} > {textButton2} </button>
		  	</div>
		</div>

	); 
}

export default DoubleButtonWithdraw;