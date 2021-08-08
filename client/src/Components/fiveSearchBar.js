import React,{useState} from 'react';
import DoubleButtonActionBack from './doubleButtonActionBack';

const FiveSearchBar = ({title1, title2, title3, title4, title5,holder1, holder2,holder3,holder4, holder5,functionToCall, textButton, textBack, backPath}) => {

	const [inputText1, setinputText1] = useState('');
	const [inputText2, setinputText2] = useState('');
	const [inputText3, setinputText3] = useState('');
	const [inputText4, setinputText4] = useState('');
	const [inputText5, setinputText5] = useState('');

	const onClick1 = () => {
			functionToCall(inputText1,inputText3,inputText2,inputText4);
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
					<DoubleButtonActionBack
					function1= {onClick1}
					textButton = {textButton}
					textBack = {textBack}
					backPath = {backPath}
					/>
				</div>
			</form>
		</div>
		);


}


export default FiveSearchBar;