import React,{useState} from 'react';
import BackButtonCleanning from "./backButtonCleaning";

const SimpleSearchBarMarketBuyOrder = ({title1 ,holder1,  functionToCall,textButton1, textButton2, textButton3, functionToCall2, functionToCall3}) => {

	const [inputText1, setinputText1] = useState('');
	

	const onClick1 = (event) => {
			event.preventDefault();
			functionToCall(inputText1);
		}

	const cleanFunction = () => {

		functionToCall2([]);
	}

	const onClick3 = (event) => {

		event.preventDefault();
		functionToCall3();
	}


	return (

		<div className = "search-bar ui">
			<form className = "ui form">
				<div className = "field">
					<label className = "ui second header" style = {{textAlign:'left', margin:'10px' }} >{title1}</label>
					<input
						id="address"
						type = "text"
						value = {inputText1}
						onChange = {(e) => setinputText1(e.target.value)}
						placeholder = {holder1}
					/>
					<button className = "ui button green" style = {{marginTop:'30px' }} onClick ={onClick1} >{textButton1}</button>
					<button className = "ui button blue" style = {{marginTop:'30px' }} onClick ={onClick3} >{textButton3}</button>
					<BackButtonCleanning
					textBack = {textButton2}
					backPath = "/marketplace"
					cleanFunction = {cleanFunction}

					 />
					
				</div>
			</form>
		</div>
		);


}


export default SimpleSearchBarMarketBuyOrder;