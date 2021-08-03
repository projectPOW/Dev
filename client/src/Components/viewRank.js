import React,{useState} from 'react';
import Dropdown from './dropdown';
import Tab2ColoneRank from './tab2ColonesRank';



const ViewRank = ({list, getRankByContinent,tabRank}) => {
	
	const [selectedContinent, setSelectedContinent] = useState(0);

	const onClick = (event) => {
		event.preventDefault();
		if (selectedContinent.value  === undefined){
		
		alert("Please set continent first");
		
		}else {

			getRankByContinent(selectedContinent.value);
		}
	}



	return (

		<div>
			<Dropdown
			label="Select a continent"
			options={list}
			selected={selectedContinent}
			onSelectedChange={setSelectedContinent}
			/>

			<button className="ui button" onClick={onClick}> View rating</button>
			<Tab2ColoneRank
			entryTab = {tabRank}
			/>


		</div>
	);
}

export default ViewRank;