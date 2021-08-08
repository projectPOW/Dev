import React,{useState} from 'react';
import Dropdown from './dropdown';
import Tab2ColoneRank from './tab2ColonesRank';
import BackButton from "./backButton";



const ViewRank = ({list, getRankByContinent,tabRank, accounts}) => {
	
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
			<div style = {{textAlign:'center', paddingTop:'100px' }}>
				<div className="ui raised very padded text container segment" >
					<div>
						<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
						  <p>Current address :{accounts}</p>
						</div>
						<h1 className = "ui huge header" style = {{paddingBottom:'40px' }}> Rating Players</h1>
					</div> 
					<Dropdown
					label="Select a continent"
					options={list}
					selected={selectedContinent}
					onSelectedChange={setSelectedContinent}
					/>
					<div style = {{paddingTop:'30px' }}>
						<div style = {{paddingBottom:'10px' }}>
							<BackButton
							textBack = "Back"
							backPath = "/marketplace"
							/>
						</div>
						<button className="ui blue button" onClick={onClick} > View rating</button>
							<div style = {{paddingTop:'10px' }}>
								<Tab2ColoneRank
								entryTab = {tabRank}
								/>
							</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewRank;