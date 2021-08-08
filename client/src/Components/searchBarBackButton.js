import React,{useState} from 'react';
import DoubleButtonActionBack from "./doubleButtonActionBack";

const SearchBarBackButton = ({textButton, textBack, textToEnter,holder, functionToCall,backPath}) => {

	const [inputText, setinputText] = useState('');

	const onSubmit = (event) => {
			event.preventDefault();
			functionToCall(inputText);
	}

	return (

		<div className = "search-bar">
			<form className = "ui form">
				<div className = "field">
					<label style = {{ textAlign:'left' }}>{textToEnter}</label>
					<input
						id="address"
						type = "text"
						value = {inputText}
						onChange = {(e) => setinputText(e.target.value)}
						placeholder = {holder}
					/>
					<div>
						<DoubleButtonActionBack
						textButton = {textButton}
						textBack = {textBack}
						function1 = {onSubmit}
						backPath = {backPath}
						/>
					</div>
				</div>
			</form>
		</div>
		);


}


export default SearchBarBackButton;