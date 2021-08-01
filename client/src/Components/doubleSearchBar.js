import React,{useState} from 'react';
import DoubleButton from './doubleButton';

const DoubleSearchBar = ({state1, state2,title1, title2,holder1, holder2, functionToCall1, functionToCall2, textButton1, textButton2, account}) => {

	const [inputText1, setinputText1] = useState('');
	const [inputText2, setinputText2] = useState('');

	const onClick1 = (event) => {
			event.preventDefault();
			functionToCall1(inputText1,inputText2);
		}

	const onClick2 = (event) => {
			event.preventDefault();
			functionToCall2(inputText1,inputText2);
		}

	return (

		<div className = "search-bar ui segment">
			<form className = "ui form">
				<div className = "field">
					<h2 className = "ui second header" style = {{textAlign:'center', margin:'50px' }} >{title1}</h2>
					<input
						id="address"
						type = "text"
						value = {inputText1}
						onChange = {(e) => setinputText1(e.target.value)}
						placeholder = {holder1}
					/>
					<h2 className = "ui second header" style = {{textAlign:'center', margin:'50px' }} >{title2}</h2>
					<input
						id="address"
						type = "text"
						value = {inputText2}
						onChange = {(e) => setinputText2(e.target.value)}
						placeholder = {holder2}
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


export default DoubleSearchBar;