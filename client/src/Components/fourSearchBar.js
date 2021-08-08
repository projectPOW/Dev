import React,{useState} from 'react';
import DoubleButton from './doubleButton';

const FourSearchBar = ({title1, title2, title3, title4, holder1, holder2,holder3,holder4, updateMultiversePlayerFONG, updateMultiversePlayerNFT, textButton1, textButton2}) => {

	const [inputText1, setinputText1] = useState('');
	const [inputText2, setinputText2] = useState('');
	const [inputText3, setinputText3] = useState('');
	const [inputText4, setinputText4] = useState('');

	const onClick1 = (event) => {
			event.preventDefault();
			updateMultiversePlayerNFT(inputText1,inputText2, inputText3);
		}

	const onClick2 = (event) => {
			event.preventDefault();
			updateMultiversePlayerFONG(inputText1,inputText4);
		}

	return (

		<div className = "search-bar ui">
			<form className = "ui form">
				<div className = "field">
					<label className = "ui second header" style = {{textAlign:'left', marginTop:'40px' }} >{title1}</label>
					<input
						id="address"
						type = "text"
						value = {inputText1}
						onChange = {(e) => setinputText1(e.target.value)}
						placeholder = {holder1}
					/>
					<label className = "ui second header" style = {{textAlign:'left', marginTop:'40px' }} >{title2}</label>
					<input
						id="address"
						type = "text"
						value = {inputText2}
						onChange = {(e) => setinputText2(e.target.value)}
						placeholder = {holder2}
					/>
					<label className = "ui second header" style = {{textAlign:'left', marginTop:'40px' }} >{title3}</label>
					<input
						id="address"
						type = "text"
						value = {inputText3}
						onChange = {(e) => setinputText3(e.target.value)}
						placeholder = {holder3}
					/>
					<label className = "ui second header" style = {{textAlign:'left', marginTop:'40px' }} >{title4}</label>
					<input
						id="address"
						type = "text"
						value = {inputText4}
						onChange = {(e) => setinputText4(e.target.value)}
						placeholder = {holder4}
					/>
					<DoubleButton
					function1= {onClick1}
					function2= {onClick2}
					textButton1 = {textButton1}
					textButton2 = {textButton2}
					/>
				</div>
			</form>
		</div>
		);


}


export default FourSearchBar;