import React,{useState} from 'react';
import BackButtonCleanningClose from "./backButtonCleaningClose";
import Link from "./link"

const TripleSearchBarMarketOrderWhitelisted = ({title1, title2, title3 ,holder1, holder2, holder3, functionToCall,textButton1, textButton2, textButton3, functionToCall2}) => {

	const [inputText1, setinputText1] = useState('');
	const [inputText2, setinputText2] = useState('');
	const [inputText3, setinputText3] = useState('');

	const onClick1 = (event) => {
			event.preventDefault();
			functionToCall(inputText1,inputText2, inputText3);
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
					<label className = "ui second header" style = {{textAlign:'left', margin:'10px' }} >{title2}</label>
					<input
						id="address"
						type = "text"
						value = {inputText2}
						onChange = {(e) => setinputText2(e.target.value)}
						placeholder = {holder2}
					/>
					<label className = "ui second header" style = {{textAlign:'left', margin:'10px' }} >{title3}</label>
					<input
						id="address"
						type = "text"
						value = {inputText3}
						onChange = {(e) => setinputText3(e.target.value)}
						placeholder = {holder3}
					/>
					<button className = "ui button blue" style = {{marginTop:'30px' }} onClick ={onClick1} >Sell </button>
					<BackButtonCleanningClose
					textBack = "Back"
					backPath = "/marketplace"
					cleanFunction = {cleanFunction}

					 />
					
				</div>
			</form>
		</div>
		);


}


export default TripleSearchBarMarketOrderWhitelisted;