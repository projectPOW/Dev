import React, {useState,useEffect} from 'react';
import DropdownFusion from './dropdownFusion';
import BackButtonCleaning from "./backButtonCleaning";

const Fusion = ({getMyItems,unlockedItemsTab, fusionItem, eventNewMergedItem, setEventNewMergedItem,getDataItemMerged,idMergedItem,setIdMergedItem}) => {

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
		<div style = {{paddingTop:'100px' }}>
			<div>
				<DropdownFusion
				label="Select your first Item"
				options={unlockedItemsTab}
				firstSelected={secondeItem}
				selected={firstItem}
				onSelectedChange={setFirstItem}
				/>
			</div>
			<div>
				<DropdownFusion
				label="Select your secondeItem"
				options={unlockedItemsTab}
				firstSelected = {firstItem}
				selected={secondeItem}
				onSelectedChange={setSecondeItem}
			/>
			</div>
			<div>
				<div className="ui message">
				  <div className="header">
				    Result of Merging: 
				  </div>
					  <p>
					  	{finalItem}
					  </p>  
				</div>
			</div>

			<div style = {{marginTop : "50px"}}>
				<button className = "ui button" onClick = {onClick}> Change selection </button>
				<button className = "ui button" onClick = {requestFusion}> Fusionner </button>
				<button className = {`ui ${visible} button`} onClick = {cleanFunction}> Re-Merge</button>
				<button className = {`ui ${visible2} button`} onClick = {dataNewItem}> View New item</button>
				<BackButtonCleaning
				textBack = "Back"
				backPath = "/"
				cleanFunction = {cleanFunction}
				/>

			</div>
		</div>
	) ;
}

export default Fusion; 