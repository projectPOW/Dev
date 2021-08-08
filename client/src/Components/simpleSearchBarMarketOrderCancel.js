import React,{useState} from 'react';
import BackButtonCleanningClose from "./backButtonCleaningClose";


const SimpleSearchBarMarketOrderCancel = ({title1 ,holder1,  functionToCall,textButton1, textButton2, functionToCall2}) => {

	const [inputText1, setinputText1] = useState('');
	

	const onClick1 = (event) => {
			event.preventDefault();
			functionToCall(inputText1);
		}

	const cleanFunction = () => {

		functionToCall2([]);
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
					<button className = "ui button blue" style = {{marginTop:'30px' }} onClick ={onClick1} >{textButton1}</button>
					<BackButtonCleanningClose
					textBack = {textButton2}
					backPath = "/marketplace"
					cleanFunction = {cleanFunction}

					 />
					
				</div>
			</form>
		</div>
		);


}


export default SimpleSearchBarMarketOrderCancel;