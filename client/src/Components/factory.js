import React from "react";
import Dropdown from "./dropdown";
import SearchBar from "./searchBar";


const Factory = ({ objectToCreate, setObjectToCreate, createItem, continentWhereToFind,setContinentWhereToFind, type, continent}) => {

	

	const createNewItem = (nameItem) =>{
		createItem(objectToCreate.value,nameItem,continentWhereToFind.value);
	}


	return (
		<div>
			<div>
				<h1 className = "ui header" style = {{textAlign:'center', margin:'20px' }} > Factory </h1>
			</div> 
			<div>
				<Dropdown
				 label="Select a type of item you want to create"
		         options={type}
		         selected={objectToCreate}
		         onSelectedChange={setObjectToCreate}
				/>
			</div>
			<div>
				<Dropdown
				 label="Select a continent holding the item"
		         options={continent}
		         selected={continentWhereToFind}
		         onSelectedChange={setContinentWhereToFind}
				/>
			</div>
			<div>
				<SearchBar 
				textButton = "Create Item" 
				textToEnter = "Enter the name of the new Item" 
				holder = "Tour eiffel"
				functionToCall = {createNewItem}
				/>
			</div>
		</div>


	)  
		



}

export default Factory;