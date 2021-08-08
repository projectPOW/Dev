import React,{useState} from 'react';
import DoubleButtonActionBack from './doubleButtonActionBack';

const DoubleSearchBarTournamentOwner = ({title1, title2,holder1, holder2, functionToCall, textButton, textBack, backPath}) => {

	const [inputText1, setinputText1] = useState('');
	const [inputText2, setinputText2] = useState('');

	const onClick = () => {
			
			functionToCall(inputText1,inputText2);
		}

	return (

		<div className = "search-bar ui ">
			<form className = "ui form">
				<div className = "field">
					<label className = "ui second header" style = {{textAlign:'left', marginTop:'30px' }} >{title1}</label>
					<input
						id="address"
						type = "text"
						value = {inputText1}
						onChange = {(e) => setinputText1(e.target.value)}
						placeholder = {holder1}
					/>
					<label className = "ui second header" style = {{textAlign:'left', marginTop:'30px' }} >{title2}</label>
					<input
						id="address"
						type = "text"
						value = {inputText2}
						onChange = {(e) => setinputText2(e.target.value)}
						placeholder = {holder2}
					/>
					<DoubleButtonActionBack
						textButton = {textButton}
						textBack = {textBack}
						function1 = {onClick}
						backPath = {backPath}
					/>
				</div>
			</form>
		</div>
		);


}


export default DoubleSearchBarTournamentOwner;