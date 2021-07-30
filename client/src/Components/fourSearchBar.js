import React,{useState} from 'react';

const FourSearchBar = ({title1, title2, title3, title4, holder1, holder2,holder3,holder4, functionToCall, textButton}) => {

	const [inputText1, setinputText1] = useState('');
	const [inputText2, setinputText2] = useState('');
	const [inputText3, setinputText3] = useState('');
	const [inputText4, setinputText4] = useState('');

	const onClick = (event) => {
			event.preventDefault();
			functionToCall(inputText1,inputText2, inputText3, inputText4);
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
					<h2 className = "ui second header" style = {{textAlign:'center', margin:'50px' }} >{title3}</h2>
					<input
						id="address"
						type = "text"
						value = {inputText3}
						onChange = {(e) => setinputText3(e.target.value)}
						placeholder = {holder3}
					/>
					<h2 className = "ui second header" style = {{textAlign:'center', margin:'50px' }} >{title4}</h2>
					<input
						id="address"
						type = "text"
						value = {inputText4}
						onChange = {(e) => setinputText4(e.target.value)}
						placeholder = {holder4}
					/>
					<button className = "blue ui button" onClick = {onClick} style = {{ margin:'20px'}}> {textButton} </button>
				</div>
			</form>
		</div>
		);


}


export default FourSearchBar;