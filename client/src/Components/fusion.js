import React, {useState,useEffect} from 'react';
import DropdownFusion from './dropdownFusion';
import BackButtonCleaning from "./backButtonCleaning";

const Fusion = ({accounts, getMyItems,unlockedItemsTab, fusionItem, eventNewMergedItem, setEventNewMergedItem,getDataItemMerged,idMergedItem,setIdMergedItem}) => {

	const [firstItem,setFirstItem] = useState([]);
	const [secondeItem,setSecondeItem] = useState([]);


	useEffect (()=>{
		getMyItems();
	},[firstItem,secondeItem])

	const onClick = (event) => {

		event.preventDefault();
		setFirstItem([]);
		setSecondeItem([]);

	}

	const cleanFunction = () => {

		setEventNewMergedItem([]);
		setFirstItem([]);
		setSecondeItem([]);
		setIdMergedItem(0);

	}

	const requestFusion = (event) =>{

		event.preventDefault();
		fusionItem(firstItem.tokenId,secondeItem.tokenId);
	}

	const dataNewItem = (event) => {

		event.preventDefault();
		getDataItemMerged();
	}

	const finalItem = eventNewMergedItem.length != 0 ?  `Congratulation, you obtain a wonderful ${eventNewMergedItem.name}` : '';
	const visible = idMergedItem === 0 ?  "disabled" : "";
	const visible2 = idMergedItem === 0 ?  "disabled" : '';

	return (
		<div style = {{textAlign:'center',paddingTop:'100px', paddingBottom:'100px' }}> 
			<div className="ui raised very padded text container segment">
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black", position : "center"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui huge header" style = {{textAlign: " center", paddingBottom:'40px' }}> Fusion</h1>
				<div>
					<DropdownFusion
					label="Select a Monument"
					options={unlockedItemsTab}
					firstSelected={secondeItem}
					selected={firstItem}
					onSelectedChange={setFirstItem}
					/>
				</div>
				<div>
					<DropdownFusion
					label="Select a Materiel"
					options={unlockedItemsTab}
					firstSelected = {firstItem}
					selected={secondeItem}
					onSelectedChange={setSecondeItem}
				/>
				</div>
				<div style = {{paddingTop:'30px' }}>
					<div className="ui message" >
					  <div className="header">
					    Result of Merging: 
					  </div>
						  <p>
						  	{finalItem}
						  </p>  
					</div>
				</div>

				<div style = {{marginTop : "50px", textAlign: " center"}}>
					<button className = "ui button blue" onClick = {onClick}> Reset selection </button>
					<button className = "ui button green" onClick = {requestFusion}> Fusionner </button>
					<button className = {`ui ${visible} button`} onClick = {cleanFunction}> Merge Another</button>
					<button className = {`ui ${visible2} button`} onClick = {dataNewItem}> See Result</button>
					<BackButtonCleaning
					textBack = "Back"
					backPath = "/"
					cleanFunction = {cleanFunction}
					/>
				</div>
			</div>
		</div>
	) ;
}

export default Fusion; 