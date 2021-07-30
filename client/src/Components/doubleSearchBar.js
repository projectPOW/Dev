import React,{useState} from 'react';

const DoubleSearchBar = ({state1, state2,title1, title2,holder1, holder2, functionToCall, textButton}) => {

	const [inputText1, setinputText1] = useState('');
	const [inputText2, setinputText2] = useState('');

	const onSubmit = (event) => {
			event.preventDefault();
			functionToCall(inputText1,inputText2);
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
					<button className = "blue ui button" onClick = {onSubmit} style = {{ margin:'20px'}}> {textButton} </button>
				</div>
			</form>
		</div>
		);


}


export default DoubleSearchBar;