import React from "react";
import Dropdown from "./dropdown";
import SearchBar from "./searchBar";
import BackButtonCleaning from "./backButtonCleaning";


const Factory = ({accounts, objectToCreate, setObjectToCreate, createItem, continentWhereToFind,setContinentWhereToFind, type, continent}) => {


	const createNewItem = (nameItem) =>{
		createItem(objectToCreate.value,nameItem,continentWhereToFind.value);
	}

	const cleanFunction = () =>{

		setObjectToCreate(0);
		setContinentWhereToFind(0);
	}


	return (
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment" >
				<div>
					<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
					  <p>Current address :{accounts}</p>
					</div>
					<h1 className = "ui header" style = {{paddingBottom:'40px' }}> Factory </h1>
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
				<div style = {{paddingTop:'20px' }}>
					<SearchBar 
					textButton = "Create Item" 
					textToEnter = "Enter the name of the new monument" 
					holder = "Name of your monument"
					functionToCall = {createNewItem}
					/>
				</div>
				<BackButtonCleaning
				textBack = "back"
				backPath = "/admin"
				cleanFunction={cleanFunction}
				/>
			</div>
		</div>


	)  
		



}

export default Factory;